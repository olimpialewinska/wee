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
      conv_members: {
        Row: {
          conversation_id: number | null
          id: number
          user_id: string | null
          user_lastName: string | null
          user_name: string | null
        }
        Insert: {
          conversation_id?: number | null
          id?: number
          user_id?: string | null
          user_lastName?: string | null
          user_name?: string | null
        }
        Update: {
          conversation_id?: number | null
          id?: number
          user_id?: string | null
          user_lastName?: string | null
          user_name?: string | null
        }
      }
      conversation: {
        Row: {
          bg_color: string | null
          color: string | null
          created_at: string | null
          id: number
          isGroup: boolean
          name: string | null
        }
        Insert: {
          bg_color?: string | null
          color?: string | null
          created_at?: string | null
          id?: number
          isGroup?: boolean
          name?: string | null
        }
        Update: {
          bg_color?: string | null
          color?: string | null
          created_at?: string | null
          id?: number
          isGroup?: boolean
          name?: string | null
        }
      }
      messages: {
        Row: {
          conversation_id: number | null
          created_at: string | null
          id: number
          receiver: string | null
          sender: string | null
          status: boolean | null
          value: string | null
        }
        Insert: {
          conversation_id?: number | null
          created_at?: string | null
          id?: number
          receiver?: string | null
          sender?: string | null
          status?: boolean | null
          value?: string | null
        }
        Update: {
          conversation_id?: number | null
          created_at?: string | null
          id?: number
          receiver?: string | null
          sender?: string | null
          status?: boolean | null
          value?: string | null
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          lastName: string | null
          name: string | null
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          lastName?: string | null
          name?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          lastName?: string | null
          name?: string | null
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
