import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/integrations/apiClient';
import { Project, ProjectInsert, ProjectUpdate, ProjectWithDetails } from '@/types/task';
import { toast } from '@/hooks/use-toast';

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async (): Promise<ProjectWithDetails[]> => {
      const { data, error } = await apiClient
        .from('projects')
			.select(`
			  id,
			  name,
			  description,
			  status,
			  start_date,
			  end_date,
			  client:client_id (id, nome),
			  responsible:colaboradores!projects_responsible_id_fkey (id, nome)
			  tasks (
				id,
				status
			  )
			`)

      if (error) {
        console.error('Erro ao buscar projetos:', error.message);
        throw new Error('Erro ao buscar projetos.');
      }

      return data || [];
    },
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (project: ProjectInsert) => {
      const { data, error } = await apiClient
        .from('projects')
        .insert(project)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({
        title: 'Projeto criado',
        description: 'O projeto foi criado com sucesso.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro ao criar projeto',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};

export const useUpdateProject = () => {
  return useMutation({
    mutationFn: async (project: ProjectUpdate) => {
      const { id, ...rest } = project;

      const { error } = await apiClient
        .from('projects')
        .update(rest)
        .eq('id', id);

      if (error) {
        throw new Error(error.message);
      }
    },
  });
};
