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

      // Pega o metadata do Supabase
      const userMeta = user?.user_metadata || {};
      const isSuperAdmin = userMeta?.is_super_admin === true;

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

      // Retorna com is_root_admin true se vier do metadata
      return {
        ...data,
        is_root_admin: isSuperAdmin || data.is_root_admin === true,
      } as UserProfile;
    },
    enabled: !!user?.id,
  });
}
