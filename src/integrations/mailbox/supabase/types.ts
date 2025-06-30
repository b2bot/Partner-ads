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
      mailbox_attachments: {
        Row: {
          content_id: string | null
          content_type: string
          created_at: string
          filename: string
          id: string
          is_inline: boolean | null
          message_id: string
          original_filename: string
          size_bytes: number
          storage_path: string
        }
        Insert: {
          content_id?: string | null
          content_type: string
          created_at?: string
          filename: string
          id?: string
          is_inline?: boolean | null
          message_id: string
          original_filename: string
          size_bytes: number
          storage_path: string
        }
        Update: {
          content_id?: string | null
          content_type?: string
          created_at?: string
          filename?: string
          id?: string
          is_inline?: boolean | null
          message_id?: string
          original_filename?: string
          size_bytes?: number
          storage_path?: string
        }
        Relationships: [
          {
            foreignKeyName: "mailbox_attachments_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "mailbox_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      mailbox_automation_logs: {
        Row: {
          automation_id: string
          details: Json | null
          emails_failed: number | null
          emails_sent: number | null
          id: string
          run_at: string
          status: string
        }
        Insert: {
          automation_id: string
          details?: Json | null
          emails_failed?: number | null
          emails_sent?: number | null
          id?: string
          run_at?: string
          status: string
        }
        Update: {
          automation_id?: string
          details?: Json | null
          emails_failed?: number | null
          emails_sent?: number | null
          id?: string
          run_at?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "mailbox_automation_logs_automation_id_fkey"
            columns: ["automation_id"]
            isOneToOne: false
            referencedRelation: "mailbox_automations"
            referencedColumns: ["id"]
          },
        ]
      }
      mailbox_automations: {
        Row: {
          active: boolean | null
          attachments: Json | null
          body: string | null
          created_at: string
          id: string
          name: string
          next_run: string | null
          recipients_filter: Json | null
          schedule_cron: string | null
          schedule_once: string | null
          subject: string
          updated_at: string
          user_id: string
        }
        Insert: {
          active?: boolean | null
          attachments?: Json | null
          body?: string | null
          created_at?: string
          id?: string
          name: string
          next_run?: string | null
          recipients_filter?: Json | null
          schedule_cron?: string | null
          schedule_once?: string | null
          subject: string
          updated_at?: string
          user_id: string
        }
        Update: {
          active?: boolean | null
          attachments?: Json | null
          body?: string | null
          created_at?: string
          id?: string
          name?: string
          next_run?: string | null
          recipients_filter?: Json | null
          schedule_cron?: string | null
          schedule_once?: string | null
          subject?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      mailbox_messages: {
        Row: {
          bcc_emails: string[] | null
          body: string | null
          cc_emails: string[] | null
          created_at: string
          folder: Database["public"]["Enums"]["mailbox_folder_type"] | null
          from_email: string
          from_name: string | null
          has_attachments: boolean | null
          headers: Json | null
          id: string
          in_reply_to: string | null
          is_html: boolean | null
          message_id: string | null
          priority: number | null
          raw_content: string | null
          read_at: string | null
          reply_to: string | null
          sent_at: string | null
          size_bytes: number | null
          status: Database["public"]["Enums"]["mailbox_message_status"] | null
          subject: string
          thread_id: string | null
          to_email: string
          to_name: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          bcc_emails?: string[] | null
          body?: string | null
          cc_emails?: string[] | null
          created_at?: string
          folder?: Database["public"]["Enums"]["mailbox_folder_type"] | null
          from_email: string
          from_name?: string | null
          has_attachments?: boolean | null
          headers?: Json | null
          id?: string
          in_reply_to?: string | null
          is_html?: boolean | null
          message_id?: string | null
          priority?: number | null
          raw_content?: string | null
          read_at?: string | null
          reply_to?: string | null
          sent_at?: string | null
          size_bytes?: number | null
          status?: Database["public"]["Enums"]["mailbox_message_status"] | null
          subject: string
          thread_id?: string | null
          to_email: string
          to_name?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          bcc_emails?: string[] | null
          body?: string | null
          cc_emails?: string[] | null
          created_at?: string
          folder?: Database["public"]["Enums"]["mailbox_folder_type"] | null
          from_email?: string
          from_name?: string | null
          has_attachments?: boolean | null
          headers?: Json | null
          id?: string
          in_reply_to?: string | null
          is_html?: boolean | null
          message_id?: string | null
          priority?: number | null
          raw_content?: string | null
          read_at?: string | null
          reply_to?: string | null
          sent_at?: string | null
          size_bytes?: number | null
          status?: Database["public"]["Enums"]["mailbox_message_status"] | null
          subject?: string
          thread_id?: string | null
          to_email?: string
          to_name?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_mailbox_messages_thread_id"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "mailbox_threads"
            referencedColumns: ["id"]
          },
        ]
      }
      mailbox_settings: {
        Row: {
          auto_reply_enabled: boolean | null
          auto_reply_message: string | null
          created_at: string
          id: string
          imap_encryption: string | null
          imap_host: string | null
          imap_port: number | null
          imap_username: string | null
          signature_html: string | null
          smtp_encryption: string | null
          smtp_host: string | null
          smtp_port: number | null
          smtp_username: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          auto_reply_enabled?: boolean | null
          auto_reply_message?: string | null
          created_at?: string
          id?: string
          imap_encryption?: string | null
          imap_host?: string | null
          imap_port?: number | null
          imap_username?: string | null
          signature_html?: string | null
          smtp_encryption?: string | null
          smtp_host?: string | null
          smtp_port?: number | null
          smtp_username?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          auto_reply_enabled?: boolean | null
          auto_reply_message?: string | null
          created_at?: string
          id?: string
          imap_encryption?: string | null
          imap_host?: string | null
          imap_port?: number | null
          imap_username?: string | null
          signature_html?: string | null
          smtp_encryption?: string | null
          smtp_host?: string | null
          smtp_port?: number | null
          smtp_username?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      mailbox_threads: {
        Row: {
          created_at: string
          id: string
          last_message_at: string
          message_count: number | null
          participants: string[]
          subject: string
          unread_count: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_message_at?: string
          message_count?: number | null
          participants: string[]
          subject: string
          unread_count?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          last_message_at?: string
          message_count?: number | null
          participants?: string[]
          subject?: string
          unread_count?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_mailbox_folder_counts: {
        Args: { p_user_id: string }
        Returns: {
          folder: string
          total_count: number
          unread_count: number
        }[]
      }
      get_mailbox_messages: {
        Args: {
          p_user_id: string
          p_folder?: string
          p_page?: number
          p_page_size?: number
          p_search?: string
        }
        Returns: {
          id: string
          subject: string
          from_email: string
          from_name: string
          to_email: string
          to_name: string
          status: string
          has_attachments: boolean
          created_at: string
          read_at: string
          thread_id: string
          priority: number
        }[]
      }
      process_pending_automations: {
        Args: Record<PropertyKey, never>
        Returns: {
          automation_id: string
          automation_name: string
          user_id: string
          processed: boolean
          error_message: string
        }[]
      }
    }
    Enums: {
      mailbox_folder_type: "inbox" | "sent" | "starred" | "trash" | "draft"
      mailbox_message_status:
        | "unread"
        | "read"
        | "sent"
        | "draft"
        | "starred"
        | "trash"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      mailbox_folder_type: ["inbox", "sent", "starred", "trash", "draft"],
      mailbox_message_status: [
        "unread",
        "read",
        "sent",
        "draft",
        "starred",
        "trash",
      ],
    },
  },
} as const
