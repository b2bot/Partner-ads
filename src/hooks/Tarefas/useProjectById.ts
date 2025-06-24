import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useProjectById(projectId: string | undefined) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      if (!projectId) return null;

      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          client:clientes!projects_client_id_fkey(*),
          responsible:profiles!fk_projects_responsible(*),
          created_by_profile:profiles!fk_created_by(*),
          tasks(*)
        `)
        .eq('id', projectId)
        .single();

      if (error) {
        console.error('Erro ao buscar projeto por ID:', error);
        throw error;
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
