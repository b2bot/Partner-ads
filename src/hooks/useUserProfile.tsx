import { useQuery } from '@tanstack/react-query';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/types/auth';

export function useUserProfile(user: User | null) {
  return useQuery({
    queryKey: ['user-profile', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      console.log('🔄 Loading profile for user:', user.id);

      // Extrai os metadados do Supabase Auth
      const userMeta = user?.user_metadata || {};
      const isSuperAdmin = userMeta?.is_super_admin === true;

      // Tenta buscar o perfil normalmente
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('❌ Error loading profile:', error);
        return null;
      }

      console.log('✅ Profile loaded from DB:', data);

      // ⚠️ IMPORTANTE: não faz update automático aqui para evitar recursão
      // Apenas retorna o perfil já adaptado com is_root_admin se for super admin via metadata

      return {
        ...data,
        is_root_admin: isSuperAdmin || data.is_root_admin === true,
        role: isSuperAdmin ? 'admin' : data.role,
      } as UserProfile;
    },
    enabled: !!user?.id,
  });
}
