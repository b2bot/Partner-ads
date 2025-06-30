
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/integrations/apiClient';
import { Task, TaskInsert, TaskUpdate, TaskWithDetails, CreateTaskData, UpdateTaskData } from '@/types/task';
import { toast } from '@/hooks/use-toast';

export const useTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async (): Promise<TaskWithDetails[]> => {
      const data = await apiClient.get<TaskWithDetails[]>(
        '/api/tasks.php'
      );

      return (data || []).map(task => ({
        ...task,
        assigned_user: Array.isArray(task.assigned_user)
          ? task.assigned_user[0] || null
          : task.assigned_user,
        creator: Array.isArray(task.creator)
          ? task.creator[0] || null
          : task.creator,
        project: Array.isArray(task.project)
          ? task.project[0] || null
          : task.project,
        section: Array.isArray(task.section)
          ? task.section[0] || null
          : task.section,
        subtasks: task.subtasks ?? [],
        comments: task.comments ?? [],
        attachments: task.attachments ?? [],
      }));
    },
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (task: TaskInsert) => {
      const data = await apiClient.post<Task>('/api/tasks.php', task);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast({
        title: 'Tarefa criada',
        description: 'A tarefa foi criada com sucesso.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro ao criar tarefa',
        description: error.message,
        variant: 'destructive',
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast({
        title: 'Tarefa atualizada',
        description: 'A tarefa foi atualizada com sucesso.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro ao atualizar tarefa',
        description: error.message,
        variant: 'destructive',
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast({
        title: 'Tarefa excluída',
        description: 'A tarefa foi excluída com sucesso.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro ao excluir tarefa',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
};