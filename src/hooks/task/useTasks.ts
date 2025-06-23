
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Task, TaskInsert, TaskUpdate, TaskWithDetails, CreateTaskData, UpdateTaskData } from '@/types/task';
import { toast } from '@/hooks/use-toast';

export const useTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async (): Promise<TaskWithDetails[]> => {
      const { data, error } = await supabase
        .from('tasks')
        .select(`
          *,
          project:projects(*),
          section:sections(*),
          assigned_user:profiles!inner(id, name, email),
          creator:profiles!inner(id, name, email),
          subtasks(*),
          comments:task_comments(*),
          attachments:task_attachments(*)
        `)
        .order('order_index', { ascending: true });

      if (error) {
        console.error('Error fetching tasks:', error);
        throw error;
      }

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
      const { data, error } = await supabase
        .from('tasks')
        .insert(task)
        .select('*')
        .single();

      if (error) throw error;
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
      const { data, error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', id)
        .select('*')
        .single();

      if (error) throw error;
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
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);

      if (error) throw error;
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