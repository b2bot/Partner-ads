import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/integrations/apiClient';
import { Project, ProjectInsert, ProjectWithDetails } from '@/types/task';
import { toast } from '@/hooks/use-toast';

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async (): Promise<ProjectWithDetails[]> => {
      const { data, error } = await apiClient
        .from('projects')
        .select(`
          *,
          client:clientes!projects_client_id_fkey(*),
          responsible:profiles!fk_projects_responsible(*),
          creator:profiles!projects_created_by_fkey(*),
          tasks(*)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao buscar projetos:', error);
        throw error;
      }

      console.log('Projetos carregados:', data);

      return (data || []).map(project => ({
        ...project,
        responsible: Array.isArray(project.responsible) ? project.responsible[0] || null : project.responsible,
        creator: Array.isArray(project.creator) ? project.creator[0] || null : project.creator,
        client: Array.isArray(project.client) ? project.client[0] || null : project.client,
        tasks: project.tasks || []
      }));
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

      if (error) throw error;
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

      if (error) throw error;
    },
  });
};