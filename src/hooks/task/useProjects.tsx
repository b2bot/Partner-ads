import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/integrations/apiClient';
import { Project, CreateProjectData, ProjectInsert, ProjectWithDetails } from '@/types/task';
import { toast } from '@/hooks/use-toast';

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async (): Promise<ProjectWithDetails[]> => {
      const { data, error } = await apiClient
        .from('projects')
        .select(`
          *,
          client:clientes(id, nome),
          responsible:profiles!fk_projects_responsible(*),
          creator:profiles!projects_created_by_fkey(id, nome),
          tasks(*)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao buscar projetos:', error);
        throw error;
      }

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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: string; name?: string; description?: string; status?: string }) => {
      const { id, ...updateData } = data;
      const { data: result, error } = await apiClient
        .from('projects')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({ title: 'Projeto atualizado com sucesso.' });
    },
    onError: (error) => {
      toast({
        title: 'Erro ao atualizar projeto',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await apiClient
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({ title: 'Projeto excluído com sucesso.' });
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

export const useCreateProjectCompat = () => {
  const createMutation = useCreateProject();
  return {
    mutate: createMutation.mutate,
    isPending: createMutation.isPending,
    mutateAsync: async (...args: Parameters<typeof createMutation.mutate>) => {
      return new Promise((resolve, reject) => {
        try {
          createMutation.mutate(...args);
          resolve(true);
        } catch (err) {
          reject(err);
        }
      });
    },
  };
};