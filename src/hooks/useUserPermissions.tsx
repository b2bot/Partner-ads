
import { useQuery } from '@tanstack/react-query';
import { User } from '@apiClient/apiClient-js';
import { apiClient } from '@/integrations/apiClient';
import { Permission, ALL_PERMISSIONS } from '@/types/auth';

export function useUserPermissions(user: User | null, isRootAdmin: boolean) {
  return useQuery({
    queryKey: ['user-permissions', user?.id, isRootAdmin],
    queryFn: async () => {
      if (!user?.id) return [];
      
      // Se é root admin, retorna todas as permissões
      if (isRootAdmin) {
        console.log('✅ Root admin - returning all permissions');
        return ALL_PERMISSIONS;
      }

      console.log('🔄 Loading permissions for user:', user.id);

      const data = await apiClient.get<{ permission: Permission }[]>(
        `/api/user_permissions.php?user_id=${user.id}`
      );

      const permissions = data.map(p => p.permission as Permission);
      console.log('✅ User permissions loaded:', permissions);
      return permissions;
    },
    enabled: !!user?.id,
  });
}
