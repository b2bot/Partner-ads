export type Role = 'admin' | 'cliente';

export type Permission =
  | 'access_dashboard'
  | 'access_paid_media'
  | 'access_whatsapp'
  | 'access_calls'
  | 'access_creatives'
  | 'access_tasks'
  | 'access_client_reports'
  | 'view_metrics'
  | 'view_system_logs'
  | 'manage_api_settings'
  | 'manage_user_settings'
  | 'manage_collaborators'
  | 'manage_clients'
  | 'create_campaigns'
  | 'edit_campaigns'
  | 'delete_campaigns'
  | 'create_adsets'
  | 'edit_adsets'
  | 'delete_adsets'
  | 'create_ads'
  | 'edit_ads'
  | 'delete_ads'
  | 'export_data'
  | 'manage_creatives_approval'
  | 'manage_tickets_advanced';

export const ALL_PERMISSIONS: Permission[] = [
  'access_dashboard',
  'access_paid_media',
  'access_whatsapp',
  'access_calls',
  'access_creatives',
  'access_tasks',
  'access_client_reports', // Nova permissão adicionada
  'view_metrics',
  'view_system_logs',
  'manage_api_settings',
  'manage_user_settings',
  'manage_collaborators',
  'manage_clients',
  'create_campaigns',
  'edit_campaigns',
  'delete_campaigns',
  'create_adsets',
  'edit_adsets',
  'delete_adsets',
  'create_ads',
  'edit_ads',
  'delete_ads',
  'export_data',
  'manage_creatives_approval',
  'manage_tickets_advanced',
];

export const permissionDescriptions: { [key in Permission]: string } = {
    'access_dashboard': 'Acessar o painel principal',
    'access_paid_media': 'Acessar campanhas de mídia paga',
    'access_whatsapp': 'Acessar relatórios do WhatsApp',
    'access_calls': 'Acessar chamados',
    'access_creatives': 'Acessar criativos',
    'access_tasks': 'Acessar tarefas',
    'access_client_reports': 'Acessar relatórios do cliente',
    'view_metrics': 'Visualizar métricas',
    'view_system_logs': 'Visualizar logs do sistema',
    'manage_api_settings': 'Gerenciar configurações da API',
    'manage_user_settings': 'Gerenciar configurações de usuário',
    'manage_collaborators': 'Gerenciar colaboradores',
    'manage_clients': 'Gerenciar clientes',
    'create_campaigns': 'Criar campanhas',
    'edit_campaigns': 'Editar campanhas',
    'delete_campaigns': 'Deletar campanhas',
    'create_adsets': 'Criar conjuntos de anúncios',
    'edit_adsets': 'Editar conjuntos de anúncios',
    'delete_adsets': 'Deletar conjuntos de anúncios',
    'create_ads': 'Criar anúncios',
    'edit_ads': 'Editar anúncios',
    'delete_ads': 'Deletar anúncios',
    'export_data': 'Exportar dados',
    'manage_creatives_approval': 'Aprovar criativos',
    'manage_tickets_advanced': 'Gerenciar chamados avançado',
};

export const hasPermission = (userPermissions: Permission[], requiredPermission: Permission, isRootAdmin: boolean): boolean => {
  if (isRootAdmin) {
    return true;
  }
  return userPermissions.includes(requiredPermission);
};
