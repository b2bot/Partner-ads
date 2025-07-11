
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/integrations/apiClient';
import { toast } from 'sonner';

interface Collaborator {
  id: string;
  nome: string;
  email: string;
  foto_url?: string;
  status: string;
  role: string;
  created_at: string;
  is_root_admin: boolean;
}

export function useCollaborators() {
  const queryClient = useQueryClient();

  // Buscar colaboradores (excluindo root admin)
  const { data: collaborators, isLoading } = useQuery({
    queryKey: ['collaborators'],
    queryFn: async () => {
      const data = await apiClient.get<Collaborator[]>(
        '/api/collaborators.php'
      );
      return data as Collaborator[];
    },
  });

  // Mutation para desativar colaborador
  const deactivateCollaboratorMutation = useMutation({
    mutationFn: async (collaboratorId: string) => {
      await apiClient.put(`/api/collaborators.php?id=${collaboratorId}`, {
        status: 'inativo',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collaborators'] });
      toast.success('Colaborador desativado com sucesso');
    },
    onError: (error) => {
      console.error('Erro ao desativar colaborador:', error);
      toast.error('Erro ao desativar colaborador');
    },
  });

  return {
    collaborators: collaborators || [],
    isLoading,
    deactivateCollaborator: deactivateCollaboratorMutation.mutate,
    isDeactivating: deactivateCollaboratorMutation.isPending,
  };
}
