import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Collaborator } from '@/types/collaborator';

export function useCollaborators() {
  const queryClient = useQueryClient();

  const { data: collaborators = [], isLoading } = useQuery<Collaborator[]>({
    queryKey: ['colaboradores'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('colaboradores')
        .select(`
          id,
          nome,
          email,
          foto_url,
          cargo,
          setor,
          ativo,
          created_at,
          nivel_acesso,
          user_id
        `);

      if (error) {
        console.error('Erro ao buscar colaboradores:', error);
        throw new Error('Erro ao carregar colaboradores');
      }

      return data || [];
    },
  });

  const deactivateCollaboratorMutation = useMutation({
    mutationFn: async (collaboratorId: string) => {
      const { error } = await supabase
        .from('colaboradores')
        .update({ ativo: false })
        .eq('id', collaboratorId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['colaboradores'] });
      toast.success('Colaborador desativado com sucesso');
    },
    onError: (error) => {
      console.error('Erro ao desativar colaborador:', error);
      toast.error('Erro ao desativar colaborador');
    },
  });

  return {
    collaborators,
    isLoading,
    deactivateCollaborator: deactivateCollaboratorMutation.mutate,
    isDeactivating: deactivateCollaboratorMutation.isPending,
  };
}
