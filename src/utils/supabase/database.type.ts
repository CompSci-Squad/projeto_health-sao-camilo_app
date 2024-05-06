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
          reminder_type: Database["public"]["Enums"]["reminderType"] | null
          reminder_value: number | null
          specialty: string | null
          userId: string | null
        }
        Insert: {
          address?: Json | null
          created_at?: string
          id?: string
          reminder_type?: Database["public"]["Enums"]["reminderType"] | null
          reminder_value?: number | null
          specialty?: string | null
          userId?: string | null
        }
        Update: {
          address?: Json | null
          created_at?: string
          id?: string
          reminder_type?: Database["public"]["Enums"]["reminderType"] | null
          reminder_value?: number | null
          specialty?: string | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_appointment_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "user_info"
            referencedColumns: ["id"]
          },
        ]
      }
      exam: {
        Row: {
          category: string | null
          created_at: string
          exam_url: string | null
          id: string
          type: string | null
          user_id: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          exam_url?: string | null
          id?: string
          type?: string | null
          user_id?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          exam_url?: string | null
          id?: string
          type?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_exams_userId_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_info"
            referencedColumns: ["id"]
          },
        ]
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
      height: {
        Row: {
          created_at: string
          id: string
          user_id: string | null
          value: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          user_id?: string | null
          value?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          user_id?: string | null
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "height_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_info"
            referencedColumns: ["id"]
          },
        ]
      }
      medicine: {
        Row: {
          created_at: string
          dosage: string
          final_date: string
          id: string
          interval_in_minutes: number | null
          is_continuous: boolean
          is_finished: boolean
          medicine_name_id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          dosage: string
          final_date: string
          id?: string
          interval_in_minutes?: number | null
          is_continuous: boolean
          is_finished: boolean
          medicine_name_id?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          dosage?: string
          final_date?: string
          id?: string
          interval_in_minutes?: number | null
          is_continuous?: boolean
          is_finished?: boolean
          medicine_name_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "medicine_medicine_name_id_fkey"
            columns: ["medicine_name_id"]
            isOneToOne: false
            referencedRelation: "medicine_name"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "medicine_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_info"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_medicine_userId_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_info"
            referencedColumns: ["id"]
          },
        ]
      }
      medicine_name: {
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
      user_info: {
        Row: {
          auth_user_id: string | null
          birth_date: string
          created_at: string
          gender: Database["public"]["Enums"]["gender"] | null
          id: string
          name: string
        }
        Insert: {
          auth_user_id?: string | null
          birth_date: string
          created_at?: string
          gender?: Database["public"]["Enums"]["gender"] | null
          id?: string
          name: string
        }
        Update: {
          auth_user_id?: string | null
          birth_date?: string
          created_at?: string
          gender?: Database["public"]["Enums"]["gender"] | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_info_auth_user_id_fkey"
            columns: ["auth_user_id"]
            isOneToOne: false
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
      gender: "MALE" | "FEMALE" | "OTHER"
      reminderType: "DAYS" | "HOURS"
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
