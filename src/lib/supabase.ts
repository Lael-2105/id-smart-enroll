
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface SmartIdApplication {
  id: string
  user_id: string
  reference_number: string
  status: 'pending' | 'processing' | 'approved' | 'rejected'
  personal_info: {
    firstName: string
    lastName: string
    dateOfBirth: string
    nationality: string
    idNumber: string
    email: string
    phone: string
    address: string
    city: string
    postalCode: string
  }
  document_urls: {
    photoId?: string
    proofOfAddress?: string
    photograph?: string
    birthCertificate?: string
  }
  created_at: string
  updated_at: string
}
