import type { EntryType } from './entry'
import type { Database } from './supabase'

export type Category = Database['public']['Tables']['category']['Row']
