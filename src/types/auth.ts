export interface User {
  id: string;
  email: string;
  nome: string;
  avatar_url?: string;
  funcao?: string;
  cliente_id?: string;
  permissions: Permission[];
  modules: Module[];
}

export interface Session {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  user: User;
}

export type Module =
  | 'dashboard'
  | 'crm'
  | 'financeiro'
  | 'projetos'
  | 'tarefas'
  | 'usuarios'
  | 'whatsapp'
  | 'relatorios'
  | 'chamados'
  | 'estoque'
  | 'marketing'
  | 'website'
  | 'creatives';

export type Permission = 
  | 'access_dashboard'
  | 'access_paid_media'
  | 'create_campaigns'
  | 'edit_campaigns'
  | 'delete_campaigns'
  | 'create_adsets'
  | 'edit_adsets'
  | 'delete_adsets'
  | 'create_ads'
  | 'edit_ads'
  | 'delete_ads'
  | 'view_metrics'
  | 'export_data'
  | 'manage_creatives'
  | 'upload_creatives'
  | 'edit_creatives'
  | 'delete_creatives'
  | 'access_creatives'
  | 'view_tickets'
  | 'create_tickets'
  | 'edit_tickets'
  | 'resolve_tickets'
  | 'manage_collaborators'
  | 'create_collaborators'
  | 'edit_collaborators'
  | 'delete_collaborators'
  | 'view_system_logs'
  | 'access_whatsapp'
  | 'create_campaigns_whatsapp'
  | 'send_messages'
  | 'view_templates'
  | 'manage_contacts'
  | 'access_tasks'
  | 'create_tasks'
  | 'edit_tasks'
  | 'delete_tasks'
  | 'manage_tasks'
  | 'access_client_reports'
  | 'manage_clients';

export interface ClientModulePermission {
  module: Module;
  enabled: boolean;
}
