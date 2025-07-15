import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/integrations/apiClient';
import { toast } from 'sonner';

type Collaborator = {
  id: string;
  nome: string;
  email: string;
  foto_url?: string;
  cargo?: string;
  setor?: string;
  ativo: 'ativo' | 'inativo';
  created_at: string;
  nivel_acesso: 'admin';
};

export function useCollaborators() {
  const queryClient = useQueryClient();

  const { data: collaborators = [], isLoading } = useQuery<Collaborator[]>({
    queryKey: ['colaboradores'],
    queryFn: async () => {
      const { data, error } = await apiClient
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
          nivel_acesso
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
      const { error } = await apiClient
        .from('colaboradores')
        .update({ status: 'inativo' })
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
