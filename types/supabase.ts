export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      category: {
        Row: {
          created_at: string
          icon: string
          id: number
          label: string
          type: Database['public']['Enums']['entry_type'] | null
        }
        Insert: {
          created_at?: string
          icon?: string
          id?: number
          label?: string
          type?: Database['public']['Enums']['entry_type'] | null
        }
        Update: {
          created_at?: string
          icon?: string
          id?: number
          label?: string
          type?: Database['public']['Enums']['entry_type'] | null
        }
        Relationships: []
      }
      entry: {
        Row: {
          amount: number
          category: number | null
          created_at: string
          id: number
          property: number
          remark: string | null
          type: Database['public']['Enums']['entry_type']
        }
        Insert: {
          amount: number
          category?: number | null
          created_at?: string
          id?: number
          property: number
          remark?: string | null
          type: Database['public']['Enums']['entry_type']
        }
        Update: {
          amount?: number
          category?: number | null
          created_at?: string
          id?: number
          property?: number
          remark?: string | null
          type?: Database['public']['Enums']['entry_type']
        }
        Relationships: [
          {
            foreignKeyName: 'entry_category_fkey'
            columns: ['category']
            isOneToOne: false
            referencedRelation: 'category'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'entry_property_fkey'
            columns: ['property']
            isOneToOne: false
            referencedRelation: 'property'
            referencedColumns: ['id']
          }
        ]
      }
      property: {
        Row: {
          amount: number
          created_at: string
          id: number
          label: string
          type: Database['public']['Enums']['property_type']
        }
        Insert: {
          amount?: number
          created_at?: string
          id?: number
          label: string
          type?: Database['public']['Enums']['property_type']
        }
        Update: {
          amount?: number
          created_at?: string
          id?: number
          label?: string
          type?: Database['public']['Enums']['property_type']
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      entry_type: 'input' | 'output' | 'transfer'
      property_type: 'debit' | 'credit' | 'other' | 'investment'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
        Database['public']['Views'])
    ? (Database['public']['Tables'] &
        Database['public']['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends keyof Database['public']['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
    ? Database['public']['Enums'][PublicEnumNameOrOptions]
    : never
