
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export type PermissionType = 
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
  | 'view_system_logs';

export interface UserPermission {
  id: string;
  user_id: string;
  permission: PermissionType;
  granted_by: string;
  created_at: string;
}

export interface PermissionTemplate {
  id: string;
  name: string;
  description?: string;
  permissions: PermissionType[];
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface PermissionLog {
  id: string;
  target_user_id: string;
  changed_by: string;
  action: string;
  permission?: PermissionType;
  details: any;
  created_at: string;
}

export function usePermissions() {
  const { user, profile } = useAuth();
  const queryClient = useQueryClient();

  // Verificar se usuário tem uma permissão específica
  const hasPermission = (permission: PermissionType): boolean => {
    if (profile?.is_root_admin) return true;
    return userPermissions?.includes(permission) || false;
  };

  // Obter permissões do usuário atual
  const { data: userPermissions } = useQuery({
    queryKey: ['user-permissions', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase.rpc('get_user_permissions', {
        user_id: user.id
      });
      
      if (error) throw error;
      return data as PermissionType[];
    },
    enabled: !!user?.id,
  });

  // Listar todas as permissões de um usuário específico
  const { data: userPermissionsList } = useQuery({
    queryKey: ['all-user-permissions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_permissions')
        .select('*');
      
      if (error) throw error;
      return data as UserPermission[];
    },
    enabled: hasPermission('manage_collaborators'),
  });

  // Listar templates de permissões
  const { data: permissionTemplates } = useQuery({
    queryKey: ['permission-templates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('permission_templates')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as PermissionTemplate[];
    },
    enabled: hasPermission('manage_collaborators'),
  });

  // Mutation para conceder permissão
  const grantPermissionMutation = useMutation({
    mutationFn: async ({ userId, permission }: { userId: string; permission: PermissionType }) => {
      const { error } = await supabase
        .from('user_permissions')
        .insert({
          user_id: userId,
          permission,
          granted_by: user?.id
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-user-permissions'] });
      toast.success('Permissão concedida com sucesso');
    },
    onError: (error) => {
      console.error('Erro ao conceder permissão:', error);
      toast.error('Erro ao conceder permissão');
    },
  });

  // Mutation para revogar permissão
  const revokePermissionMutation = useMutation({
    mutationFn: async ({ userId, permission }: { userId: string; permission: PermissionType }) => {
      const { error } = await supabase
        .from('user_permissions')
        .delete()
        .eq('user_id', userId)
        .eq('permission', permission);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-user-permissions'] });
      toast.success('Permissão revogada com sucesso');
    },
    onError: (error) => {
      console.error('Erro ao revogar permissão:', error);
      toast.error('Erro ao revogar permissão');
    },
  });

  // Mutation para criar template de permissões
  const createTemplateMutation = useMutation({
    mutationFn: async (template: Omit<PermissionTemplate, 'id' | 'created_at' | 'updated_at' | 'created_by'>) => {
      const { error } = await supabase
        .from('permission_templates')
        .insert({
          ...template,
          created_by: user?.id
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['permission-templates'] });
      toast.success('Template criado com sucesso');
    },
    onError: (error) => {
      console.error('Erro ao criar template:', error);
      toast.error('Erro ao criar template');
    },
  });

  return {
    hasPermission,
    userPermissions,
    userPermissionsList,
    permissionTemplates,
    grantPermission: grantPermissionMutation.mutate,
    revokePermission: revokePermissionMutation.mutate,
    createTemplate: createTemplateMutation.mutate,
    isGranting: grantPermissionMutation.isPending,
    isRevoking: revokePermissionMutation.isPending,
    isCreatingTemplate: createTemplateMutation.isPending,
  };
}
