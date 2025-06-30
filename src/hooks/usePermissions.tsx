
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/integrations/apiClient';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Permission } from '@/types/auth';

// Exportar o tipo Permission para compatibilidad
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

  // Verificar se usuário tem uma permissão específica
  const hasPermission = (permission: Permission): boolean => {
    return authHasPermission(permission);
  };

  // Obter permissões do usuário atual
  const { data: userPermissions } = useQuery({
    queryKey: ['user-permissions-list', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const data = await apiClient.get<{ permission: Permission }[]>(
        `/api/user_permissions.php?user_id=${user.id}`
      );
      return data.map(p => p.permission as Permission);
    },
    enabled: !!user?.id,
  });

  // Listar todas as permissões de todos os usuários
  const { data: userPermissionsList } = useQuery({
    queryKey: ['all-user-permissions'],
    queryFn: async () => {
      const data = await apiClient.get<UserPermission[]>(
        '/api/user_permissions.php'
      );
      return data as UserPermission[];
    },
    enabled: hasPermission('manage_collaborators'),
  });

  // Listar templates de permissões
  const { data: permissionTemplates } = useQuery({
    queryKey: ['permission-templates'],
    queryFn: async () => {
      const data = await apiClient.get<PermissionTemplate[]>(
        '/api/permission_templates.php'
      );
      return data as PermissionTemplate[];
    },
    enabled: hasPermission('manage_collaborators'),
  });

  // Mutation para conceder permissão
  const grantPermissionMutation = useMutation({
    mutationFn: async ({ userId, permission }: { userId: string; permission: Permission }) => {
      await apiClient.post('/api/user_permissions.php', {
        user_id: userId,
        permission,
        granted_by: user?.id
      });
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
    mutationFn: async ({ userId, permission }: { userId: string; permission: Permission }) => {
      await apiClient.delete(
        `/api/user_permissions.php?user_id=${userId}&permission=${permission}`
      );
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
      await apiClient.post('/api/permission_templates.php', {
        ...template,
        created_by: user?.id
      });
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
