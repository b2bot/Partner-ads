import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/integrations/apiClient';
import { Project, CreateProjectData, ProjectInsert, ProjectWithDetails } from '@/types/task';
import { toast } from '@/hooks/use-toast';

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async (): Promise<ProjectWithDetails[]> => {
      const data = await apiClient.get<ProjectWithDetails[]>(
        '/api/projects.php'
      );

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
      const data = await apiClient.post<Project>('/api/projects.php', project);
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
      const result = await apiClient.put<Project>(
        `/api/projects.php?id=${id}`,
        updateData
      );
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
      await apiClient.delete(`/api/projects.php?id=${id}`);
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