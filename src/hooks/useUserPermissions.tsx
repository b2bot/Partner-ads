
import { useQuery } from '@tanstack/react-query';
import { User } from '@supabase/supabase-js';
import { apiClient } from '@/integrations/apiClient';
import { Permission, ALL_PERMISSIONS } from '@/types/auth';

export function useUserPermissions(user: User | null, isRootAdmin: boolean) {
  return useQuery({
    queryKey: ['user-permissions', user?.id, isRootAdmin],
    queryFn: async () => {
      if (!user?.id) return [];

      if (isRootAdmin) {
        return ALL_PERMISSIONS;
      }

      const { data, error } = await apiClient
        .from('user_permissions')
        .select('permission')
        .eq('user_id', user.id);

      if (error) {
        console.error('❌ Failed to load permissions:', error);
        throw new Error(error.message);
      }

      const permissions = (data || []).map((p) => p.permission as Permission);
      return permissions;
    },
    enabled: !!user?.id,
  });
}
