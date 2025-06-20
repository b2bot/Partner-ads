
export interface UserProfile {
  id: string;
  nome: string;
  email: string;
  role: 'admin' | 'cliente';
  ativo: boolean;
  is_root_admin?: boolean;
  foto_url?: string;
  avatar_url?: string;
  status?: string;
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
  | 'access_whatsapp'
  | 'create_campaigns'
  | 'edit_campaigns'
  | 'view_templates'
  | 'send_messages'
  | 'view_metrics'
  | 'access_tasks'
  | 'create_tasks'
  | 'assign_tasks'
  | 'finalize_tasks'
  | 'edit_execution_time'
  | 'access_calls'
  | 'create_calls'
  | 'finalize_calls'
  | 'link_calls_to_tasks'
  | 'access_creatives'
  | 'create_edit_creatives'
  | 'approve_creatives'
  | 'view_change_history'
  | 'access_paid_media'
  | 'create_campaigns_media'
  | 'view_metrics_media'
  | 'access_reports'
  | 'create_automatic_reports'
  | 'manage_user_settings'
  | 'manage_collaborators'
  | 'manage_whatsapp_templates'
  | 'manage_api_settings'
  | 'manage_appearance_and_visual_identity'
  | 'manage_external_integrations'
  | 'manage_variables_and_pre_configurations'
  | 'view_billing_settings'
  | 'view_system_logs'
  | 'access_client_reports'
  | 'manage_clients'
  | 'delete_campaigns'
  | 'create_adsets'
  | 'edit_adsets'
  | 'delete_adsets'
  | 'create_ads'
  | 'edit_ads'
  | 'delete_ads'
  | 'export_data'
  | 'manage_creatives'
  | 'upload_creatives'
  | 'edit_creatives' 
  | 'delete_creatives'
  | 'view_tickets'
  | 'create_tickets'
  | 'edit_tickets'
  | 'resolve_tickets'
  | 'create_collaborators'
  | 'edit_collaborators'
  | 'delete_collaborators'
  | 'create_campaigns_whatsapp'
  | 'manage_contacts'
  | 'edit_tasks'
  | 'delete_tasks'
  | 'manage_tasks';
  
export interface ClientModulePermission {
  module: Module;
  enabled: boolean;
}

export const ALL_PERMISSIONS: Permission[] = [
  'access_dashboard',
  'access_whatsapp',
  'create_campaigns',
  'edit_campaigns',
  'view_templates',
  'send_messages',
  'view_metrics',
  'access_tasks',
  'create_tasks',
  'assign_tasks',
  'finalize_tasks',
  'edit_execution_time',
  'access_calls',
  'create_calls',  
  'finalize_calls',
  'link_calls_to_tasks',
  'access_creatives',
  'create_edit_creatives',
  'approve_creatives',
  'view_change_history',
  'access_paid_media',
  'create_campaigns_media',
  'view_metrics_media',
  'access_reports',
  'create_automatic_reports',
  'manage_user_settings',
  'manage_collaborators',
  'manage_whatsapp_templates',
  'manage_api_settings',
  'manage_appearance_and_visual_identity',
  'manage_external_integrations',
  'manage_variables_and_pre_configurations',
  'view_billing_settings',
  'view_system_logs',
  'access_client_reports',
  'manage_clients',
  'delete_campaigns',
  'create_adsets',
  'edit_adsets',
  'delete_adsets',
  'create_ads',
  'edit_ads',
  'delete_ads',
  'export_data',
  'manage_creatives',
  'upload_creatives',
  'edit_creatives',
  'delete_creatives',
  'view_tickets',
  'create_tickets',
  'edit_tickets',
  'resolve_tickets',
  'create_collaborators',
  'edit_collaborators',
  'delete_collaborators',
  'create_campaigns_whatsapp',
  'manage_contacts',
  'edit_tasks',
  'delete_tasks',
  'manage_tasks'
];
