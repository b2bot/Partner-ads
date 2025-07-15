// src/hooks/useUserProfile.ts
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/integrations/apiClient'
import { UserProfile } from '@/types/auth'

export function useUserProfile(user: { id: string; email: string } | null) {
  return useQuery<UserProfile | null>({
    queryKey: ['user-profile', user?.id],
    enabled: !!user?.id,
    retry: 1,
    staleTime: 5 * 60_000,
    queryFn: async () => {
      if (!user?.id) return null

      const { data, error } = await apiClient
        .from<UserProfile>('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) {
        // se não existir, cria
        const { data: created, error: insertError } = await apiClient
          .from<UserProfile>('profiles')
          .insert({
            id: user.id,
            nome: user.email.split('@')[0] || 'Usuário',
            email: user.email,
            role: 'colaborador',
            is_root_admin: false,
            ativo: true,
          })
          .single()

        if (insertError) throw insertError
        return created
      }

      return data
    },
  })
}
