import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/integrations/apiClient';

export function useProjectById(projectId: string | undefined) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      if (!projectId) return null;

      const { data, error } = await apiClient
        .from('projects')
        .select(`
          id,
          name,
          description,
          status,
          start_date,
          end_date,
          client:client_id (
            id,
            nome
          ),
          colaboradores:responsible_id (
            id,
            nome
          ),
          tasks (
            id,
            title,
            status,
            due_date
          )
        `)
        .eq('id', projectId)
        .single();

      if (error) {
        console.error('Erro ao buscar projeto:', error.message);
        throw new Error(error.message);
      }

      return data;
    },
    enabled: !!projectId,
  });

  return {
    project: data,
    isLoading,
    error,
  };
}
