import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/integrations/apiClient';
import { Project, ProjectInsert, ProjectWithDetails } from '@/types/task';
import { toast } from '@/hooks/use-toast';

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async (): Promise<ProjectWithDetails[]> => {
      const data = await apiClient.get<ProjectWithDetails[]>(
        '/api/projects.php'
      );

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
  return useMutation({
    mutationFn: async (project: ProjectUpdate) => {
      const { id, ...rest } = project;
      await apiClient.put(`/api/projects.php?id=${id}`, rest);
    },
  });
};