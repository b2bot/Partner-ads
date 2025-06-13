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
      activity_logs: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          entity_id: string
          entity_name: string
          entity_type: string
          id: string
          user_id: string | null
          user_name: string
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          entity_id: string
          entity_name: string
          entity_type: string
          id?: string
          user_id?: string | null
          user_name: string
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          entity_id?: string
          entity_name?: string
          entity_type?: string
          id?: string
          user_id?: string | null
          user_name?: string
        }
        Relationships: []
      }
      chamados: {
        Row: {
          aberto_por: string | null
          arquivo_url: string | null
          cliente_id: string
          created_at: string
          id: string
          mensagem: string
          respondido_por: string | null
          resposta: string | null
          status: Database["public"]["Enums"]["ticket_status"]
          status_detalhado: string | null
          titulo: string
          updated_at: string
        }
        Insert: {
          aberto_por?: string | null
          arquivo_url?: string | null
          cliente_id: string
          created_at?: string
          id?: string
          mensagem: string
          respondido_por?: string | null
          resposta?: string | null
          status?: Database["public"]["Enums"]["ticket_status"]
          status_detalhado?: string | null
          titulo: string
          updated_at?: string
        }
        Update: {
          aberto_por?: string | null
          arquivo_url?: string | null
          cliente_id?: string
          created_at?: string
          id?: string
          mensagem?: string
          respondido_por?: string | null
          resposta?: string | null
          status?: Database["public"]["Enums"]["ticket_status"]
          status_detalhado?: string | null
          titulo?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "chamados_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chamados_respondido_por_fkey"
            columns: ["respondido_por"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      chamados_historico: {
        Row: {
          acao: string
          chamado_id: string
          data_acao: string
          detalhes: string | null
          id: string
          usuario_id: string | null
          usuario_nome: string
        }
        Insert: {
          acao: string
          chamado_id: string
          data_acao?: string
          detalhes?: string | null
          id?: string
          usuario_id?: string | null
          usuario_nome: string
        }
        Update: {
          acao?: string
          chamado_id?: string
          data_acao?: string
          detalhes?: string | null
          id?: string
          usuario_id?: string | null
          usuario_nome?: string
        }
        Relationships: [
          {
            foreignKeyName: "chamados_historico_chamado_id_fkey"
            columns: ["chamado_id"]
            isOneToOne: false
            referencedRelation: "chamados"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chamados_historico_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      clientes: {
        Row: {
          ativo: boolean
          contas_meta: string[] | null
          created_at: string
          email: string | null
          empresa: string | null
          id: string
          nome: string
          observacoes_internas: string | null
          responsavel_conta: string | null
          telefone: string | null
          tipo_acesso: Database["public"]["Enums"]["access_type"]
          updated_at: string
          user_id: string
        }
        Insert: {
          ativo?: boolean
          contas_meta?: string[] | null
          created_at?: string
          email?: string | null
          empresa?: string | null
          id?: string
          nome: string
          observacoes_internas?: string | null
          responsavel_conta?: string | null
          telefone?: string | null
          tipo_acesso?: Database["public"]["Enums"]["access_type"]
          updated_at?: string
          user_id: string
        }
        Update: {
          ativo?: boolean
          contas_meta?: string[] | null
          created_at?: string
          email?: string | null
          empresa?: string | null
          id?: string
          nome?: string
          observacoes_internas?: string | null
          responsavel_conta?: string | null
          telefone?: string | null
          tipo_acesso?: Database["public"]["Enums"]["access_type"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "clientes_responsavel_conta_fkey"
            columns: ["responsavel_conta"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clientes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      contas: {
        Row: {
          ativo: boolean
          cliente_id: string
          created_at: string
          id: string
          identificador: string
          nome: string
          tipo: Database["public"]["Enums"]["account_type"]
        }
        Insert: {
          ativo?: boolean
          cliente_id: string
          created_at?: string
          id?: string
          identificador: string
          nome: string
          tipo: Database["public"]["Enums"]["account_type"]
        }
        Update: {
          ativo?: boolean
          cliente_id?: string
          created_at?: string
          id?: string
          identificador?: string
          nome?: string
          tipo?: Database["public"]["Enums"]["account_type"]
        }
        Relationships: [
          {
            foreignKeyName: "contas_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      criativos: {
        Row: {
          arquivo_url: string
          campanha: string | null
          cliente_id: string
          comentario_cliente: string | null
          created_at: string
          descricao: string | null
          descricao_anuncio: string | null
          id: string
          nome_criativo: string | null
          resposta: string | null
          status: Database["public"]["Enums"]["creative_status"]
          tipo_arquivo: string
          titulo: string
          titulo_anuncio: string | null
          updated_at: string
        }
        Insert: {
          arquivo_url: string
          campanha?: string | null
          cliente_id: string
          comentario_cliente?: string | null
          created_at?: string
          descricao?: string | null
          descricao_anuncio?: string | null
          id?: string
          nome_criativo?: string | null
          resposta?: string | null
          status?: Database["public"]["Enums"]["creative_status"]
          tipo_arquivo: string
          titulo: string
          titulo_anuncio?: string | null
          updated_at?: string
        }
        Update: {
          arquivo_url?: string
          campanha?: string | null
          cliente_id?: string
          comentario_cliente?: string | null
          created_at?: string
          descricao?: string | null
          descricao_anuncio?: string | null
          id?: string
          nome_criativo?: string | null
          resposta?: string | null
          status?: Database["public"]["Enums"]["creative_status"]
          tipo_arquivo?: string
          titulo?: string
          titulo_anuncio?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "criativos_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      meta_api_credentials: {
        Row: {
          access_token: string
          app_id: string
          app_secret: string
          created_at: string | null
          id: string
        }
        Insert: {
          access_token: string
          app_id: string
          app_secret: string
          created_at?: string | null
          id?: string
        }
        Update: {
          access_token?: string
          app_id?: string
          app_secret?: string
          created_at?: string | null
          id?: string
        }
        Relationships: []
      }
      metrics_config: {
        Row: {
          config: Json
          created_at: string
          id: string
          updated_at: string
        }
        Insert: {
          config?: Json
          created_at?: string
          id?: string
          updated_at?: string
        }
        Update: {
          config?: Json
          created_at?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          ativo: boolean
          created_at: string
          email: string
          id: string
          nome: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          email: string
          id: string
          nome: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          created_at?: string
          email?: string
          id?: string
          nome?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: []
      }
      system_activity_logs: {
        Row: {
          acao: string
          created_at: string
          detalhes: Json | null
          id: string
          ip_address: unknown | null
          modulo: string
          user_agent: string | null
          usuario_id: string | null
          usuario_nome: string
        }
        Insert: {
          acao: string
          created_at?: string
          detalhes?: Json | null
          id?: string
          ip_address?: unknown | null
          modulo: string
          user_agent?: string | null
          usuario_id?: string | null
          usuario_nome: string
        }
        Update: {
          acao?: string
          created_at?: string
          detalhes?: Json | null
          id?: string
          ip_address?: unknown | null
          modulo?: string
          user_agent?: string | null
          usuario_id?: string | null
          usuario_nome?: string
        }
        Relationships: [
          {
            foreignKeyName: "system_activity_logs_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      usuarios: {
        Row: {
          criado_em: string | null
          id: string
          nome: string | null
          tipo: string
        }
        Insert: {
          criado_em?: string | null
          id: string
          nome?: string | null
          tipo?: string
        }
        Update: {
          criado_em?: string | null
          id?: string
          nome?: string | null
          tipo?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_cliente_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      log_system_activity: {
        Args: {
          p_acao: string
          p_modulo: string
          p_detalhes?: Json
          p_ip_address?: unknown
          p_user_agent?: string
        }
        Returns: string
      }
    }
    Enums: {
      access_type: "api" | "sheet"
      account_type: "meta" | "google"
      creative_status:
        | "pendente"
        | "aprovado"
        | "reprovado"
        | "ajuste_solicitado"
      ticket_status: "aberto" | "em_andamento" | "resolvido"
      user_role: "admin" | "cliente"
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
      access_type: ["api", "sheet"],
      account_type: ["meta", "google"],
      creative_status: [
        "pendente",
        "aprovado",
        "reprovado",
        "ajuste_solicitado",
      ],
      ticket_status: ["aberto", "em_andamento", "resolvido"],
      user_role: ["admin", "cliente"],
    },
  },
} as const
