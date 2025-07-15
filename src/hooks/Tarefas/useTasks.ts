import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Task, TaskInsert, TaskUpdate, TaskWithDetails } from '@/types/task';
import { toast } from '@/hooks/use-toast';

export const useTasks = (projectId?: string) => {
  return useQuery({
    queryKey: ['tasks', projectId],
    queryFn: async (): Promise<TaskWithDetails[]> => {
      let query = supabase
        .from('tasks')
        .select(`
          *,
          assigned_user:profiles!fk_tasks_assigned_to (id, nome, email, foto_url),
          creator:profiles!tasks_created_by_fkey (id, nome, email),
          project:projects!tasks_project_id_fkey (id, name, description)
        `);

      if (projectId) {
        query = query.eq('project_id', projectId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching tasks:', error);
        throw new Error(error.message);
      }

      console.log('Tasks loaded:', data);
      return data || [];
    },
    enabled: true,
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 10, // 10 minutos
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (task: TaskInsert) => {
      const { data, error } = await supabase.from('tasks').insert(task).select().single();
      if (error) throw new Error(error.message);
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
      const { data, error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw new Error(error.message);
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
      const { error } = await supabase.from('tasks').delete().eq('id', id);
      if (error) throw new Error(error.message);
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
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
