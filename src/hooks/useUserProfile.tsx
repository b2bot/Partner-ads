
import { useQuery } from '@tanstack/react-query';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/types/auth';

export function useUserProfile(user: User | null) {
  return useQuery({
    queryKey: ['user-profile', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      console.log('Loading profile for user:', user.id);

      // Verificar se é super admin do metadata com proteção para null
      const userMeta = user?.user_metadata || {};
      const isSuperAdmin = userMeta?.is_super_admin === true;

      console.log('User metadata:', userMeta);
      console.log('Is super admin from metadata:', isSuperAdmin);

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error loading profile:', error);
        return null;
      }

      // Se é super admin mas não tem is_root_admin = true, atualizar
      if (isSuperAdmin && !data.is_root_admin) {
        console.log('Updating profile to set is_root_admin = true');
        const { data: updatedData, error: updateError } = await supabase
          .from('profiles')
          .update({
            is_root_admin: true,
            role: 'admin',
          })
          .eq('id', user.id)
          .select()
          .single();

        if (updateError) {
          console.error('Error updating profile:', updateError);
        } else {
          console.log('Profile updated successfully:', updatedData);
          return updatedData as UserProfile;
        }
      }

      return data as UserProfile;
    },
    enabled: !!user?.id,
  });
}
