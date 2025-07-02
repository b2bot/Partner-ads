
import { useQuery } from '@tanstack/react-query';
import { User } from '@apiClient/apiClient-js';
import { apiClient } from '@/integrations/apiClient';
import { UserProfile } from '@/types/auth';

export function useUserProfile(user: User | null) {
  return useQuery({
    queryKey: ['user-profile', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      console.log('🔄 Loading profile for user:', user.id, user.email);

      try {
        const data = await apiClient.get<UserProfile>(
          `/api/profiles.php?user_id=${user.id}`
        );
        console.log('✅ Profile loaded from DB:', data);
        return data as UserProfile;
      } catch (err) {
        console.error('❌ Error loading profile:', err);
        // Perfil não encontrado: criar
        const newProfile = await apiClient.post<UserProfile>(
          '/api/profiles.php',
          {
            id: user.id,
            nome: user.email?.split('@')[0] || 'Usuário',
            email: user.email || '',
            role: 'colaborador',
            is_root_admin: false,
            ativo: true
          }
        );
        console.log('✅ Created new profile:', newProfile);
        return newProfile as UserProfile;
      }
    },
    enabled: !!user?.id,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
}
