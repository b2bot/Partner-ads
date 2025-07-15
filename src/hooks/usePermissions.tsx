import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/integrations/apiClient';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Permission } from '@/types/auth';

export type PermissionType = Permission;

export interface UserPermission {
  id: string;
  user_id: string;
  permission: Permission;
  granted_by: string;
  created_at: string;
}

export interface PermissionTemplate {
  id: string;
  name: string;
  description?: string;
  permissions: Permission[];
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface PermissionLog {
  id: string;
  target_user_id: string;
  changed_by: string;
  action: string;
  permission?: Permission;
  details: any;
  created_at: string;
}

export function usePermissions() {
  const { user, profile, hasPermission: authHasPermission } = useAuth();
  const queryClient = useQueryClient();

  const hasPermission = (permission: Permission): boolean => {
    return authHasPermission(permission);
  };

  const { data: userPermissions } = useQuery({
    queryKey: ['user-permissions-list', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      const { data, error } = await apiClient
        .from('user_permissions')
        .select('permission')
        .eq('user_id', user.id);

      if (error) throw new Error(error.message);

      return (data || []).map(p => p.permission as Permission);
    },
    enabled: !!user?.id,
  });

  const { data: userPermissionsList } = useQuery({
    queryKey: ['all-user-permissions'],
    queryFn: async () => {
      const { data, error } = await apiClient
        .from('user_permissions')
        .select('*');

      if (error) throw new Error(error.message);

      return data as UserPermission[];
    },
    enabled: hasPermission('manage_collaborators'),
  });

  const { data: permissionTemplates } = useQuery({
    queryKey: ['permission-templates'],
    queryFn: async () => {
      const { data, error } = await apiClient
        .from('permission_templates')
        .select('*');

      if (error) throw new Error(error.message);

      return data as PermissionTemplate[];
    },
    enabled: hasPermission('manage_collaborators'),
  });

  const grantPermissionMutation = useMutation({
    mutationFn: async ({ userId, permission }: { userId: string; permission: Permission }) => {
      const { error } = await apiClient
        .from('user_permissions')
        .insert({
          user_id: userId,
          permission,
          granted_by: user?.id,
        });

      if (error) throw new Error(error.message);
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

  const revokePermissionMutation = useMutation({
    mutationFn: async ({ userId, permission }: { userId: string; permission: Permission }) => {
      const { error } = await apiClient
        .from('user_permissions')
        .delete()
        .match({ user_id: userId, permission });

      if (error) throw new Error(error.message);
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

  const createTemplateMutation = useMutation({
    mutationFn: async (
      template: Omit<PermissionTemplate, 'id' | 'created_at' | 'updated_at' | 'created_by'>
    ) => {
      const { error } = await apiClient
        .from('permission_templates')
        .insert({
          ...template,
          created_by: user?.id,
        });

      if (error) throw new Error(error.message);
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
