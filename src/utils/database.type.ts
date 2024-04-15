export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      appointment: {
        Row: {
          address: Json | null
          created_at: string
          id: string
          reminderType: Database["public"]["Enums"]["reminderType"] | null
          reminderValue: number | null
          specialtyId: string | null
          userId: string | null
        }
        Insert: {
          address?: Json | null
          created_at?: string
          id?: string
          reminderType?: Database["public"]["Enums"]["reminderType"] | null
          reminderValue?: number | null
          specialtyId?: string | null
          userId?: string | null
        }
        Update: {
          address?: Json | null
          created_at?: string
          id?: string
          reminderType?: Database["public"]["Enums"]["reminderType"] | null
          reminderValue?: number | null
          specialtyId?: string | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_appointment_specialtyId_fkey"
            columns: ["specialtyId"]
            isOneToOne: false
            referencedRelation: "specialty"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_appointment_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "user_info"
            referencedColumns: ["id"]
          },
        ]
      }
      exams: {
        Row: {
          created_at: string
          examTypeId: string | null
          id: string
          userId: string | null
        }
        Insert: {
          created_at?: string
          examTypeId?: string | null
          id?: string
          userId?: string | null
        }
        Update: {
          created_at?: string
          examTypeId?: string | null
          id?: string
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_exams_examTypeId_fkey"
            columns: ["examTypeId"]
            isOneToOne: false
            referencedRelation: "examType"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_exams_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "user_info"
            referencedColumns: ["id"]
          },
        ]
      }
      examType: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      glucose: {
        Row: {
          created_at: string
          id: number
          userId: string | null
          value: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          userId?: string | null
          value?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          userId?: string | null
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_glucose_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "user_info"
            referencedColumns: ["id"]
          },
        ]
      }
      medicine: {
        Row: {
          created_at: string
          finalDate: string
          id: string
          intervalInMinutes: number | null
          isContinuous: boolean
          isFinished: boolean
          name: string
          userId: string | null
        }
        Insert: {
          created_at?: string
          finalDate: string
          id?: string
          intervalInMinutes?: number | null
          isContinuous: boolean
          isFinished: boolean
          name: string
          userId?: string | null
        }
        Update: {
          created_at?: string
          finalDate?: string
          id?: string
          intervalInMinutes?: number | null
          isContinuous?: boolean
          isFinished?: boolean
          name?: string
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_medicine_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "user_info"
            referencedColumns: ["id"]
          },
        ]
      }
      pressure: {
        Row: {
          created_at: string
          denominator: number | null
          id: number
          numerator: number | null
          userId: string | null
        }
        Insert: {
          created_at?: string
          denominator?: number | null
          id?: number
          numerator?: number | null
          userId?: string | null
        }
        Update: {
          created_at?: string
          denominator?: number | null
          id?: number
          numerator?: number | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_pressure_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "user_info"
            referencedColumns: ["id"]
          },
        ]
      }
      specialty: {
        Row: {
          created_at: string
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      user_info: {
        Row: {
          birth_date: string
          created_at: string
          height: number | null
          id: string
          name: string
          sex: Database["public"]["Enums"]["sex"] | null
        }
        Insert: {
          birth_date: string
          created_at?: string
          height?: number | null
          id: string
          name: string
          sex?: Database["public"]["Enums"]["sex"] | null
        }
        Update: {
          birth_date?: string
          created_at?: string
          height?: number | null
          id?: string
          name?: string
          sex?: Database["public"]["Enums"]["sex"] | null
        }
        Relationships: [
          {
            foreignKeyName: "public_user_info_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      weight: {
        Row: {
          created_at: string
          id: number
          userId: string | null
          value: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          userId?: string | null
          value?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          userId?: string | null
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_weight_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "user_info"
            referencedColumns: ["id"]
          },
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
      reminderType: "DAYS" | "HOURS"
      sex: "MALE" | "FEMALE"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
