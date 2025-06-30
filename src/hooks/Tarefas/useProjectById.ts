import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/integrations/apiClient';

export function useProjectById(projectId: string | undefined) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      if (!projectId) return null;

      const data = await apiClient.get(
        `/api/projects.php?id=${projectId}`
      );

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
