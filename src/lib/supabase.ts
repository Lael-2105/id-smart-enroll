
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create a dummy client when environment variables are not available
const createDummyClient = () => ({
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithPassword: () => Promise.resolve({ error: { message: 'Supabase not connected' } }),
    signUp: () => Promise.resolve({ error: { message: 'Supabase not connected' } }),
    signOut: () => Promise.resolve({ error: null }),
    getUser: () => Promise.resolve({ data: { user: null }, error: null })
  },
  from: () => ({
    insert: () => ({ select: () => ({ single: () => Promise.resolve({ data: null, error: { message: 'Supabase not connected' } }) }) }),
    select: () => ({ eq: () => ({ order: () => Promise.resolve({ data: [], error: { message: 'Supabase not connected' } }) }) })
  }),
  storage: {
    from: () => ({
      upload: () => Promise.resolve({ data: null, error: { message: 'Supabase not connected' } })
    })
  }
})

export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createDummyClient() as any

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
