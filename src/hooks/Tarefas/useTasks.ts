import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/integrations/apiClient';
import { Task, TaskInsert, TaskUpdate, TaskWithDetails } from '@/types/task';
import { toast } from '@/hooks/use-toast';

export const useTasks = (projectId?: string) => {
  return useQuery({
    queryKey: ['tasks', projectId],
    queryFn: async (): Promise<TaskWithDetails[]> => {
      const data = await apiClient.get<TaskWithDetails[]>(
        `/api/tasks.php${projectId ? `?project_id=${projectId}` : ''}`
      );

      return (data || []).map(task => ({
        ...task,
        assigned_user: Array.isArray(task.assigned_user) ? task.assigned_user[0] || null : task.assigned_user,
        creator: Array.isArray(task.creator) ? task.creator[0] || null : task.creator,
        project: Array.isArray(task.project) ? task.project[0] || null : task.project,
        section: null,
        subtasks: [],
        comments: [],
        attachments: []
      }));
    },
    enabled: true, // Se quiser evitar execução sem projectId, use: !!projectId
    staleTime: 0,  // 👈 força atualização sempre que necessário
    gcTime: 0,     // 👈 ajuda a garantir que a tarefa deletada "some"
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (task: TaskInsert) => {
      const data = await apiClient.post<Task>('/api/tasks.php', task);
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      if (variables.project_id) {
        queryClient.invalidateQueries({ queryKey: ['tasks', variables.project_id] });
      }
      toast({
        title: "Tarefa criada",
        description: "A tarefa foi criada com sucesso.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao criar tarefa",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: TaskUpdate }) => {
      const data = await apiClient.put<Task>(`/api/tasks.php?id=${id}`, updates);
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      if (variables?.updates?.project_id) {
        queryClient.invalidateQueries({ queryKey: ['tasks', variables.updates.project_id] });
      }
      toast({
        title: "Tarefa atualizada",
        description: "A tarefa foi atualizada com sucesso.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao atualizar tarefa",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/api/tasks.php?id=${id}`);
    },
    onSuccess: (_, id) => {
      // Remove tarefas em geral
      queryClient.invalidateQueries({ queryKey: ['tasks'] });

      // Se possível, remove tarefa específica do cache local
      queryClient.removeQueries({ queryKey: ['tasks'] });

      toast({
        title: "Tarefa excluída",
        description: "A tarefa foi excluída com sucesso.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao excluir tarefa",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};