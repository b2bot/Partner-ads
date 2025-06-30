import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/integrations/apiClient';
import { toast } from '@/hooks/use-toast';

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (projectId: string) => {
      await apiClient.delete(`/api/projects.php?id=${projectId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({
        title: 'Projeto excluído',
        description: 'O projeto foi excluído com sucesso.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro ao excluir projeto',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};
