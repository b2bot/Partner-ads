export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
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
          categoria: string | null
          cliente_id: string
          created_at: string
          id: string
          mensagem: string
          nota_interna: string | null
          prioridade: string | null
          respondido_por: string | null
          resposta: string | null
          status: Database["public"]["Enums"]["ticket_status"]
          status_detalhado: string | null
          tempo_resposta_horas: number | null
          titulo: string
          updated_at: string
        }
        Insert: {
          aberto_por?: string | null
          arquivo_url?: string | null
          categoria?: string | null
          cliente_id: string
          created_at?: string
          id?: string
          mensagem: string
          nota_interna?: string | null
          prioridade?: string | null
          respondido_por?: string | null
          resposta?: string | null
          status?: Database["public"]["Enums"]["ticket_status"]
          status_detalhado?: string | null
          tempo_resposta_horas?: number | null
          titulo: string
          updated_at?: string
        }
        Update: {
          aberto_por?: string | null
          arquivo_url?: string | null
          categoria?: string | null
          cliente_id?: string
          created_at?: string
          id?: string
          mensagem?: string
          nota_interna?: string | null
          prioridade?: string | null
          respondido_por?: string | null
          resposta?: string | null
          status?: Database["public"]["Enums"]["ticket_status"]
          status_detalhado?: string | null
          tempo_resposta_horas?: number | null
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
      chamados_anexos: {
        Row: {
          chamado_id: string | null
          created_at: string | null
          id: string
          nome_arquivo: string
          tamanho_arquivo: number | null
          tipo_arquivo: string
          uploaded_by: string | null
          url_arquivo: string
        }
        Insert: {
          chamado_id?: string | null
          created_at?: string | null
          id?: string
          nome_arquivo: string
          tamanho_arquivo?: number | null
          tipo_arquivo: string
          uploaded_by?: string | null
          url_arquivo: string
        }
        Update: {
          chamado_id?: string | null
          created_at?: string | null
          id?: string
          nome_arquivo?: string
          tamanho_arquivo?: number | null
          tipo_arquivo?: string
          uploaded_by?: string | null
          url_arquivo?: string
        }
        Relationships: [
          {
            foreignKeyName: "chamados_anexos_chamado_id_fkey"
            columns: ["chamado_id"]
            isOneToOne: false
            referencedRelation: "chamados"
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
      chamados_mensagens: {
        Row: {
          arquivo_url: string | null
          autor_id: string | null
          autor_nome: string
          autor_tipo: string
          chamado_id: string
          conteudo: string
          created_at: string
          id: string
          metadata: Json | null
        }
        Insert: {
          arquivo_url?: string | null
          autor_id?: string | null
          autor_nome: string
          autor_tipo?: string
          chamado_id: string
          conteudo: string
          created_at?: string
          id?: string
          metadata?: Json | null
        }
        Update: {
          arquivo_url?: string | null
          autor_id?: string | null
          autor_nome?: string
          autor_tipo?: string
          chamado_id?: string
          conteudo?: string
          created_at?: string
          id?: string
          metadata?: Json | null
        }
        Relationships: []
      }
      chamados_timeline: {
        Row: {
          autor_id: string | null
          autor_nome: string
          autor_tipo: string
          chamado_id: string | null
          conteudo: string | null
          created_at: string | null
          id: string
          metadata: Json | null
          tipo: string
        }
        Insert: {
          autor_id?: string | null
          autor_nome: string
          autor_tipo?: string
          chamado_id?: string | null
          conteudo?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          tipo?: string
        }
        Update: {
          autor_id?: string | null
          autor_nome?: string
          autor_tipo?: string
          chamado_id?: string | null
          conteudo?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          tipo?: string
        }
        Relationships: [
          {
            foreignKeyName: "chamados_timeline_chamado_id_fkey"
            columns: ["chamado_id"]
            isOneToOne: false
            referencedRelation: "chamados"
            referencedColumns: ["id"]
          },
        ]
      }
      client_permissions: {
        Row: {
          client_id: string
          created_at: string | null
          enabled: boolean
          id: string
          module: Database["public"]["Enums"]["client_module"]
          updated_at: string | null
        }
        Insert: {
          client_id: string
          created_at?: string | null
          enabled?: boolean
          id?: string
          module: Database["public"]["Enums"]["client_module"]
          updated_at?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string | null
          enabled?: boolean
          id?: string
          module?: Database["public"]["Enums"]["client_module"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_permissions_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      client_report_permissions: {
        Row: {
          account_ids: string[] | null
          client_id: string
          created_at: string | null
          enabled: boolean
          id: string
          report_type: Database["public"]["Enums"]["report_type"]
          updated_at: string | null
        }
        Insert: {
          account_ids?: string[] | null
          client_id: string
          created_at?: string | null
          enabled?: boolean
          id?: string
          report_type: Database["public"]["Enums"]["report_type"]
          updated_at?: string | null
        }
        Update: {
          account_ids?: string[] | null
          client_id?: string
          created_at?: string | null
          enabled?: boolean
          id?: string
          report_type?: Database["public"]["Enums"]["report_type"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_report_permissions_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clientes"
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
      colaboradores: {
        Row: {
          arquivos: Json | null
          ativo: boolean | null
          cargo: string | null
          cpf: string | null
          created_at: string | null
          data_admissao: string | null
          data_nascimento: string | null
          email: string
          endereco: string | null
          foto_url: string | null
          id: string
          nivel_acesso: string | null
          nome: string
          observacoes: string | null
          setor: string | null
          telefone: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          arquivos?: Json | null
          ativo?: boolean | null
          cargo?: string | null
          cpf?: string | null
          created_at?: string | null
          data_admissao?: string | null
          data_nascimento?: string | null
          email: string
          endereco?: string | null
          foto_url?: string | null
          id?: string
          nivel_acesso?: string | null
          nome: string
          observacoes?: string | null
          setor?: string | null
          telefone?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          arquivos?: Json | null
          ativo?: boolean | null
          cargo?: string | null
          cpf?: string | null
          created_at?: string | null
          data_admissao?: string | null
          data_nascimento?: string | null
          email?: string
          endereco?: string | null
          foto_url?: string | null
          id?: string
          nivel_acesso?: string | null
          nome?: string
          observacoes?: string | null
          setor?: string | null
          telefone?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "colaboradores_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      colaboradores_projetos: {
        Row: {
          colaborador_id: string
          created_at: string | null
          fim: string | null
          funcao: string | null
          id: string
          inicio: string | null
          projeto_id: string
        }
        Insert: {
          colaborador_id: string
          created_at?: string | null
          fim?: string | null
          funcao?: string | null
          id?: string
          inicio?: string | null
          projeto_id: string
        }
        Update: {
          colaborador_id?: string
          created_at?: string | null
          fim?: string | null
          funcao?: string | null
          id?: string
          inicio?: string | null
          projeto_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "colaboradores_projetos_colaborador_id_fkey"
            columns: ["colaborador_id"]
            isOneToOne: false
            referencedRelation: "colaboradores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "colaboradores_projetos_projeto_id_fkey"
            columns: ["projeto_id"]
            isOneToOne: false
            referencedRelation: "projects"
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
      permission_logs: {
        Row: {
          action: string
          changed_by: string | null
          created_at: string | null
          details: Json | null
          id: string
          permission: Database["public"]["Enums"]["permission_type"] | null
          target_user_id: string | null
        }
        Insert: {
          action: string
          changed_by?: string | null
          created_at?: string | null
          details?: Json | null
          id?: string
          permission?: Database["public"]["Enums"]["permission_type"] | null
          target_user_id?: string | null
        }
        Update: {
          action?: string
          changed_by?: string | null
          created_at?: string | null
          details?: Json | null
          id?: string
          permission?: Database["public"]["Enums"]["permission_type"] | null
          target_user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "permission_logs_changed_by_fkey"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "permission_logs_target_user_id_fkey"
            columns: ["target_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      permission_templates: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          name: string
          permissions: Database["public"]["Enums"]["permission_type"][]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          name: string
          permissions?: Database["public"]["Enums"]["permission_type"][]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string
          permissions?: Database["public"]["Enums"]["permission_type"][]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "permission_templates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          ativo: boolean
          created_at: string
          email: string
          foto_url: string | null
          id: string
          is_root_admin: boolean | null
          nome: string
          role: Database["public"]["Enums"]["user_role"]
          status: string | null
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          email: string
          foto_url?: string | null
          id: string
          is_root_admin?: boolean | null
          nome: string
          role?: Database["public"]["Enums"]["user_role"]
          status?: string | null
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          created_at?: string
          email?: string
          foto_url?: string | null
          id?: string
          is_root_admin?: boolean | null
          nome?: string
          role?: Database["public"]["Enums"]["user_role"]
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          client_id: string | null
          created_at: string | null
          created_by: string
          description: string | null
          end_date: string | null
          id: string
          name: string
          responsible_id: string | null
          start_date: string | null
          status: string | null
        }
        Insert: {
          client_id?: string | null
          created_at?: string | null
          created_by: string
          description?: string | null
          end_date?: string | null
          id?: string
          name: string
          responsible_id?: string | null
          start_date?: string | null
          status?: string | null
        }
        Update: {
          client_id?: string | null
          created_at?: string | null
          created_by?: string
          description?: string | null
          end_date?: string | null
          id?: string
          name?: string
          responsible_id?: string | null
          start_date?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_responsible_id_fkey"
            columns: ["responsible_id"]
            isOneToOne: false
            referencedRelation: "colaboradores"
            referencedColumns: ["id"]
          },
        ]
      }
      sections: {
        Row: {
          created_at: string | null
          id: string
          name: string
          order_index: number | null
          project_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          order_index?: number | null
          project_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          order_index?: number | null
          project_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sections_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      settings: {
        Row: {
          client_id: string | null
          created_at: string | null
          data: Json | null
          id: number
        }
        Insert: {
          client_id?: string | null
          created_at?: string | null
          data?: Json | null
          id?: never
        }
        Update: {
          client_id?: string | null
          created_at?: string | null
          data?: Json | null
          id?: never
        }
        Relationships: [
          {
            foreignKeyName: "settings_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
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
      task_comments: {
        Row: {
          author_id: string
          content: string
          created_at: string | null
          id: string
          task_id: string
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string | null
          id?: string
          task_id: string
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string | null
          id?: string
          task_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_task_comments_author"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_task_comments_task"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      task_steps: {
        Row: {
          checked: boolean | null
          content: string | null
          created_at: string | null
          id: string
          task_id: string | null
        }
        Insert: {
          checked?: boolean | null
          content?: string | null
          created_at?: string | null
          id?: string
          task_id?: string | null
        }
        Update: {
          checked?: boolean | null
          content?: string | null
          created_at?: string | null
          id?: string
          task_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "task_steps_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          actual_hours: number | null
          assigned_to: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          due_date: string | null
          estimated_hours: number | null
          id: string
          linked_ticket_id: string | null
          order_index: number | null
          owner_id: string | null
          priority: string | null
          project_id: string | null
          section_id: string | null
          start_date: string | null
          status: string | null
          tags: string[] | null
          title: string
          type: string | null
          updated_at: string | null
        }
        Insert: {
          actual_hours?: number | null
          assigned_to?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          estimated_hours?: number | null
          id?: string
          linked_ticket_id?: string | null
          order_index?: number | null
          owner_id?: string | null
          priority?: string | null
          project_id?: string | null
          section_id?: string | null
          start_date?: string | null
          status?: string | null
          tags?: string[] | null
          title: string
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          actual_hours?: number | null
          assigned_to?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          estimated_hours?: number | null
          id?: string
          linked_ticket_id?: string | null
          order_index?: number | null
          owner_id?: string | null
          priority?: string | null
          project_id?: string | null
          section_id?: string | null
          start_date?: string | null
          status?: string | null
          tags?: string[] | null
          title?: string
          type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_linked_ticket"
            columns: ["linked_ticket_id"]
            isOneToOne: false
            referencedRelation: "chamados"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_tasks_assigned_to"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "colaboradores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_tasks_section"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      user_permissions: {
        Row: {
          created_at: string | null
          granted_by: string | null
          id: string
          permission: Database["public"]["Enums"]["permission_type"]
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          granted_by?: string | null
          id?: string
          permission: Database["public"]["Enums"]["permission_type"]
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          granted_by?: string | null
          id?: string
          permission?: Database["public"]["Enums"]["permission_type"]
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_permissions_granted_by_fkey"
            columns: ["granted_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_permissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_campaign_executions: {
        Row: {
          campaign_id: string | null
          completed_at: string | null
          created_at: string | null
          error_message: string | null
          execution_date: string
          execution_details: Json | null
          id: string
          messages_delivered: number | null
          messages_failed: number | null
          messages_sent: number | null
          status: string
        }
        Insert: {
          campaign_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          execution_date: string
          execution_details?: Json | null
          id?: string
          messages_delivered?: number | null
          messages_failed?: number | null
          messages_sent?: number | null
          status?: string
        }
        Update: {
          campaign_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          execution_date?: string
          execution_details?: Json | null
          id?: string
          messages_delivered?: number | null
          messages_failed?: number | null
          messages_sent?: number | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_campaign_executions_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_campaigns: {
        Row: {
          contacts: string[] | null
          created_at: string | null
          data_period_days: number | null
          day_of_week: number | null
          frequency: string
          id: string
          is_active: boolean | null
          last_execution: string | null
          meta_account_id: string | null
          name: string
          next_execution: string | null
          send_time: string
          template_id: string | null
          timezone: string | null
          type: string
          updated_at: string | null
          variables_mapping: Json | null
        }
        Insert: {
          contacts?: string[] | null
          created_at?: string | null
          data_period_days?: number | null
          day_of_week?: number | null
          frequency: string
          id?: string
          is_active?: boolean | null
          last_execution?: string | null
          meta_account_id?: string | null
          name: string
          next_execution?: string | null
          send_time: string
          template_id?: string | null
          timezone?: string | null
          type: string
          updated_at?: string | null
          variables_mapping?: Json | null
        }
        Update: {
          contacts?: string[] | null
          created_at?: string | null
          data_period_days?: number | null
          day_of_week?: number | null
          frequency?: string
          id?: string
          is_active?: boolean | null
          last_execution?: string | null
          meta_account_id?: string | null
          name?: string
          next_execution?: string | null
          send_time?: string
          template_id?: string | null
          timezone?: string | null
          type?: string
          updated_at?: string | null
          variables_mapping?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_campaigns_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_config: {
        Row: {
          access_token: string
          business_account_id: string | null
          created_at: string | null
          id: string
          last_verified_at: string | null
          phone_number_id: string
          status: string | null
          updated_at: string | null
          webhook_verify_token: string | null
        }
        Insert: {
          access_token: string
          business_account_id?: string | null
          created_at?: string | null
          id?: string
          last_verified_at?: string | null
          phone_number_id: string
          status?: string | null
          updated_at?: string | null
          webhook_verify_token?: string | null
        }
        Update: {
          access_token?: string
          business_account_id?: string | null
          created_at?: string | null
          id?: string
          last_verified_at?: string | null
          phone_number_id?: string
          status?: string | null
          updated_at?: string | null
          webhook_verify_token?: string | null
        }
        Relationships: []
      }
      whatsapp_contacts: {
        Row: {
          client_id: string | null
          created_at: string | null
          grupo: string | null
          id: string
          is_active: boolean | null
          meta_account_id: string | null
          name: string
          observacoes: string | null
          phone_number: string
          tags: string[] | null
          updated_at: string | null
        }
        Insert: {
          client_id?: string | null
          created_at?: string | null
          grupo?: string | null
          id?: string
          is_active?: boolean | null
          meta_account_id?: string | null
          name: string
          observacoes?: string | null
          phone_number: string
          tags?: string[] | null
          updated_at?: string | null
        }
        Update: {
          client_id?: string | null
          created_at?: string | null
          grupo?: string | null
          id?: string
          is_active?: boolean | null
          meta_account_id?: string | null
          name?: string
          observacoes?: string | null
          phone_number?: string
          tags?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_contacts_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_message_logs: {
        Row: {
          created_at: string | null
          error_details: Json | null
          id: string
          message_id: string | null
          status: string
          timestamp: string | null
          webhook_data: Json | null
          whatsapp_message_id: string | null
        }
        Insert: {
          created_at?: string | null
          error_details?: Json | null
          id?: string
          message_id?: string | null
          status?: string
          timestamp?: string | null
          webhook_data?: Json | null
          whatsapp_message_id?: string | null
        }
        Update: {
          created_at?: string | null
          error_details?: Json | null
          id?: string
          message_id?: string | null
          status?: string
          timestamp?: string | null
          webhook_data?: Json | null
          whatsapp_message_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_message_logs_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_messages: {
        Row: {
          campaign_id: string | null
          contact_id: string | null
          created_at: string | null
          delivered_at: string | null
          error_message: string | null
          id: string
          message_content: string | null
          message_type: string
          phone_number: string
          read_at: string | null
          sent_at: string | null
          status: string
          template_id: string | null
          template_name: string | null
          template_variables: Json | null
          whatsapp_message_id: string | null
        }
        Insert: {
          campaign_id?: string | null
          contact_id?: string | null
          created_at?: string | null
          delivered_at?: string | null
          error_message?: string | null
          id?: string
          message_content?: string | null
          message_type: string
          phone_number: string
          read_at?: string | null
          sent_at?: string | null
          status?: string
          template_id?: string | null
          template_name?: string | null
          template_variables?: Json | null
          whatsapp_message_id?: string | null
        }
        Update: {
          campaign_id?: string | null
          contact_id?: string | null
          created_at?: string | null
          delivered_at?: string | null
          error_message?: string | null
          id?: string
          message_content?: string | null
          message_type?: string
          phone_number?: string
          read_at?: string | null
          sent_at?: string | null
          status?: string
          template_id?: string | null
          template_name?: string | null
          template_variables?: Json | null
          whatsapp_message_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_messages_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "whatsapp_messages_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "whatsapp_messages_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_templates: {
        Row: {
          body_text: string
          category: string
          components: Json
          created_at: string | null
          footer_text: string | null
          header_text: string | null
          header_type: string | null
          id: string
          language: string
          name: string
          status: string
          updated_at: string | null
          variables: Json | null
        }
        Insert: {
          body_text: string
          category: string
          components: Json
          created_at?: string | null
          footer_text?: string | null
          header_text?: string | null
          header_type?: string | null
          id?: string
          language?: string
          name: string
          status: string
          updated_at?: string | null
          variables?: Json | null
        }
        Update: {
          body_text?: string
          category?: string
          components?: Json
          created_at?: string | null
          footer_text?: string | null
          header_text?: string | null
          header_type?: string | null
          id?: string
          language?: string
          name?: string
          status?: string
          updated_at?: string | null
          variables?: Json | null
        }
        Relationships: []
      }
      workflow_templates: {
        Row: {
          category: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          icon: string | null
          id: string
          is_public: boolean | null
          name: string
          steps: Json
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_public?: boolean | null
          name: string
          steps: Json
        }
        Update: {
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_public?: boolean | null
          name?: string
          steps?: Json
        }
        Relationships: [
          {
            foreignKeyName: "workflow_templates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_is_root_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
      client_has_module_permission: {
        Args: {
          client_user_id: string
          module_name: Database["public"]["Enums"]["client_module"]
        }
        Returns: boolean
      }
      client_has_report_permission: {
        Args: {
          client_user_id: string
          report_name: Database["public"]["Enums"]["report_type"]
        }
        Returns: boolean
      }
      get_user_cliente_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_user_permissions: {
        Args: { user_id: string }
        Returns: Database["public"]["Enums"]["permission_type"][]
      }
      has_permission: {
        Args: {
          user_id: string
          required_permission: Database["public"]["Enums"]["permission_type"]
        }
        Returns: boolean
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
      client_module: "dashboard" | "chamados" | "relatorios" | "criativos"
      creative_status:
        | "pendente"
        | "aprovado"
        | "reprovado"
        | "ajuste_solicitado"
      permission_type:
        | "access_dashboard"
        | "access_whatsapp"
        | "create_campaigns"
        | "edit_campaigns"
        | "view_templates"
        | "send_messages"
        | "view_metrics"
        | "access_tasks"
        | "create_tasks"
        | "assign_tasks"
        | "finalize_tasks"
        | "edit_execution_time"
        | "access_calls"
        | "create_calls"
        | "finalize_calls"
        | "link_calls_to_tasks"
        | "access_creatives"
        | "create_edit_creatives"
        | "approve_creatives"
        | "view_change_history"
        | "access_paid_media"
        | "create_campaigns_media"
        | "view_metrics_media"
        | "access_reports"
        | "create_automatic_reports"
        | "manage_user_settings"
        | "manage_collaborators"
        | "manage_whatsapp_templates"
        | "manage_api_settings"
        | "manage_appearance_and_visual_identity"
        | "manage_external_integrations"
        | "manage_variables_and_pre_configurations"
        | "view_billing_settings"
        | "view_system_logs"
        | "access_client_reports"
        | "manage_clients"
        | "delete_campaigns"
        | "create_adsets"
        | "edit_adsets"
        | "delete_adsets"
        | "create_ads"
        | "edit_ads"
        | "delete_ads"
        | "export_data"
        | "manage_creatives"
        | "upload_creatives"
        | "edit_creatives"
        | "delete_creatives"
        | "view_tickets"
        | "create_tickets"
        | "edit_tickets"
        | "resolve_tickets"
        | "create_collaborators"
        | "edit_collaborators"
        | "delete_collaborators"
        | "create_campaigns_whatsapp"
        | "manage_contacts"
        | "edit_tasks"
        | "delete_tasks"
        | "manage_tasks"
      report_type:
        | "campanhas"
        | "conjuntos_anuncios"
        | "anuncios"
        | "criativos_performance"
        | "whatsapp"
      task_priority: "baixa" | "media" | "alta" | "urgente"
      task_status:
        | "backlog"
        | "execucao"
        | "revisao"
        | "aguardando"
        | "finalizada"
        | "cancelada"
      task_type:
        | "desenvolvimento"
        | "design"
        | "marketing"
        | "suporte"
        | "revisao"
        | "outros"
      ticket_status:
        | "novo"
        | "aguardando_equipe"
        | "aguardando_cliente"
        | "em_analise"
        | "em_andamento"
        | "resolvido"
      user_role: "admin" | "cliente"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      access_type: ["api", "sheet"],
      account_type: ["meta", "google"],
      client_module: ["dashboard", "chamados", "relatorios", "criativos"],
      creative_status: [
        "pendente",
        "aprovado",
        "reprovado",
        "ajuste_solicitado",
      ],
      permission_type: [
        "access_dashboard",
        "access_whatsapp",
        "create_campaigns",
        "edit_campaigns",
        "view_templates",
        "send_messages",
        "view_metrics",
        "access_tasks",
        "create_tasks",
        "assign_tasks",
        "finalize_tasks",
        "edit_execution_time",
        "access_calls",
        "create_calls",
        "finalize_calls",
        "link_calls_to_tasks",
        "access_creatives",
        "create_edit_creatives",
        "approve_creatives",
        "view_change_history",
        "access_paid_media",
        "create_campaigns_media",
        "view_metrics_media",
        "access_reports",
        "create_automatic_reports",
        "manage_user_settings",
        "manage_collaborators",
        "manage_whatsapp_templates",
        "manage_api_settings",
        "manage_appearance_and_visual_identity",
        "manage_external_integrations",
        "manage_variables_and_pre_configurations",
        "view_billing_settings",
        "view_system_logs",
        "access_client_reports",
        "manage_clients",
        "delete_campaigns",
        "create_adsets",
        "edit_adsets",
        "delete_adsets",
        "create_ads",
        "edit_ads",
        "delete_ads",
        "export_data",
        "manage_creatives",
        "upload_creatives",
        "edit_creatives",
        "delete_creatives",
        "view_tickets",
        "create_tickets",
        "edit_tickets",
        "resolve_tickets",
        "create_collaborators",
        "edit_collaborators",
        "delete_collaborators",
        "create_campaigns_whatsapp",
        "manage_contacts",
        "edit_tasks",
        "delete_tasks",
        "manage_tasks",
      ],
      report_type: [
        "campanhas",
        "conjuntos_anuncios",
        "anuncios",
        "criativos_performance",
        "whatsapp",
      ],
      task_priority: ["baixa", "media", "alta", "urgente"],
      task_status: [
        "backlog",
        "execucao",
        "revisao",
        "aguardando",
        "finalizada",
        "cancelada",
      ],
      task_type: [
        "desenvolvimento",
        "design",
        "marketing",
        "suporte",
        "revisao",
        "outros",
      ],
      ticket_status: [
        "novo",
        "aguardando_equipe",
        "aguardando_cliente",
        "em_analise",
        "em_andamento",
        "resolvido",
      ],
      user_role: ["admin", "cliente"],
    },
  },
} as const
