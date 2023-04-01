export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      characters: {
        Row: {
          age: number | null
          description: string
          id: number
          name: string
          user_id: string
        }
        Insert: {
          age?: number | null
          description: string
          id?: number
          name: string
          user_id: string
        }
        Update: {
          age?: number | null
          description?: string
          id?: number
          name?: string
          user_id?: string
        }
      }
      dialogs: {
        Row: {
          characters: string[]
          content: string
          created_at: string
          id: string
        }
        Insert: {
          characters: string[]
          content: string
          created_at?: string
          id?: string
        }
        Update: {
          characters?: string[]
          content?: string
          created_at?: string
          id?: string
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
