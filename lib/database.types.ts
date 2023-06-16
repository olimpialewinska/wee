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
      convMembers: {
        Row: {
          convId: number | null
          id: number
          nick: string | null
          userId: string | null
        }
        Insert: {
          convId?: number | null
          id?: number
          nick?: string | null
          userId?: string | null
        }
        Update: {
          convId?: number | null
          id?: number
          nick?: string | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "convMembers_convId_fkey"
            columns: ["convId"]
            referencedRelation: "convs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "convMembers_userId_fkey"
            columns: ["userId"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      convs: {
        Row: {
          bgColor: string | null
          created_at: string | null
          id: number
          isGroup: boolean | null
          messageColor: string | null
        }
        Insert: {
          bgColor?: string | null
          created_at?: string | null
          id?: number
          isGroup?: boolean | null
          messageColor?: string | null
        }
        Update: {
          bgColor?: string | null
          created_at?: string | null
          id?: number
          isGroup?: boolean | null
          messageColor?: string | null
        }
        Relationships: []
      }
      groupDetails: {
        Row: {
          convId: number | null
          created_at: string | null
          id: number
          imageName: string | null
          name: string | null
        }
        Insert: {
          convId?: number | null
          created_at?: string | null
          id?: number
          imageName?: string | null
          name?: string | null
        }
        Update: {
          convId?: number | null
          created_at?: string | null
          id?: number
          imageName?: string | null
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "groupDetails_convId_fkey"
            columns: ["convId"]
            referencedRelation: "convs"
            referencedColumns: ["id"]
          }
        ]
      }
      images: {
        Row: {
          id: number
          name: string | null
          path: string | null
          userId: string | null
        }
        Insert: {
          id?: number
          name?: string | null
          path?: string | null
          userId?: string | null
        }
        Update: {
          id?: number
          name?: string | null
          path?: string | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "images_userId_fkey"
            columns: ["userId"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      messages: {
        Row: {
          convId: number | null
          created_at: string | null
          id: number
          senderId: string | null
          value: string | null
        }
        Insert: {
          convId?: number | null
          created_at?: string | null
          id?: number
          senderId?: string | null
          value?: string | null
        }
        Update: {
          convId?: number | null
          created_at?: string | null
          id?: number
          senderId?: string | null
          value?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_convId_fkey"
            columns: ["convId"]
            referencedRelation: "convs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_senderId_fkey"
            columns: ["senderId"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      userName: {
        Row: {
          id: number
          lastName: string | null
          name: string | null
          userId: string | null
        }
        Insert: {
          id?: number
          lastName?: string | null
          name?: string | null
          userId?: string | null
        }
        Update: {
          id?: number
          lastName?: string | null
          name?: string | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "userName_userId_fkey"
            columns: ["userId"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
