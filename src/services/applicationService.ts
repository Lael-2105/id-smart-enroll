
import { supabase } from '@/lib/supabase'
import { SmartIdApplication } from '@/lib/supabase'
import { FormData } from '@/components/RegistrationForm'

// Generate cryptographically secure reference number
const generateReferenceNumber = (): string => {
  const array = new Uint32Array(2)
  crypto.getRandomValues(array)
  return `SID-${array[0].toString(36).toUpperCase()}-${array[1].toString(36).toUpperCase()}`
}

// Sanitize input to prevent XSS
const sanitizeInput = (input: string): string => {
  return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim()
}

// Validate and sanitize form data
const validateAndSanitizeFormData = (data: FormData) => {
  const sanitizedData = {
    firstName: sanitizeInput(data.personalInfo.firstName),
    lastName: sanitizeInput(data.personalInfo.lastName),
    dateOfBirth: data.personalInfo.dateOfBirth,
    nationality: sanitizeInput(data.personalInfo.nationality),
    idNumber: sanitizeInput(data.personalInfo.idNumber),
    email: sanitizeInput(data.personalInfo.email),
    phone: sanitizeInput(data.personalInfo.phone),
    address: sanitizeInput(data.personalInfo.address),
    city: sanitizeInput(data.personalInfo.city),
    postalCode: sanitizeInput(data.personalInfo.postalCode)
  }

  // Validate required fields
  const requiredFields = ['firstName', 'lastName', 'dateOfBirth', 'nationality', 'idNumber', 'email', 'phone', 'address', 'city', 'postalCode']
  for (const field of requiredFields) {
    if (!sanitizedData[field as keyof typeof sanitizedData]) {
      throw new Error(`${field} is required`)
    }
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(sanitizedData.email)) {
    throw new Error('Invalid email format')
  }

  return sanitizedData
}

// Upload files securely to Supabase Storage
const uploadDocuments = async (documents: FormData['documents'], userId: string) => {
  const documentUrls: { [key: string]: string } = {}
  
  for (const [key, file] of Object.entries(documents)) {
    if (file) {
      // Validate file type and size
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf']
      const maxSize = 5 * 1024 * 1024 // 5MB
      
      if (!allowedTypes.includes(file.type)) {
        throw new Error(`Invalid file type for ${key}`)
      }
      
      if (file.size > maxSize) {
        throw new Error(`File ${key} is too large`)
      }

      // Upload with secure path
      const fileName = `${userId}/${key}-${Date.now()}-${crypto.getRandomValues(new Uint32Array(1))[0]}`
      const { data, error } = await supabase.storage
        .from('application-documents')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) {
        throw new Error(`Failed to upload ${key}: ${error.message}`)
      }

      documentUrls[key] = data.path
    }
  }

  return documentUrls
}

export const submitApplication = async (formData: FormData): Promise<string> => {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('User must be authenticated to submit application')
  }

  try {
    // Validate and sanitize form data
    const sanitizedPersonalInfo = validateAndSanitizeFormData(formData)
    
    // Upload documents securely
    const documentUrls = await uploadDocuments(formData.documents, user.id)
    
    // Generate secure reference number
    const referenceNumber = generateReferenceNumber()
    
    // Insert application into database
    const { data, error } = await supabase
      .from('smart_id_applications')
      .insert({
        user_id: user.id,
        reference_number: referenceNumber,
        status: 'pending',
        personal_info: sanitizedPersonalInfo,
        document_urls: documentUrls
      })
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to submit application: ${error.message}`)
    }

    return referenceNumber
  } catch (error) {
    console.error('Application submission error:', error)
    throw error
  }
}

export const getUserApplications = async (): Promise<SmartIdApplication[]> => {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('User must be authenticated')
  }

  const { data, error } = await supabase
    .from('smart_id_applications')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch applications: ${error.message}`)
  }

  return data || []
}
