
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Task, CreateTaskData } from '@/types/task';
import { toast } from 'sonner';

export function useTasks(filters?: {
  project_id?: string;
  owner_id?: string;
  status?: string;
  client_id?: string;
}) {
  const queryClient = useQueryClient();

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ['tasks', filters],
    queryFn: async () => {
      let query = supabase
        .from('tasks')
        .select(`
          *,
          project:projects(id, name, client:clientes(id, nome)),
          owner:profiles!tasks_owner_id_fkey(id, nome),
          created_by_profile:profiles!tasks_created_by_fkey(id, nome),
          linked_ticket:chamados(id, titulo)
        `)
        .order('created_at', { ascending: false });

      if (filters?.project_id) {
        query = query.eq('project_id', filters.project_id);
      }
      if (filters?.owner_id) {
        query = query.eq('owner_id', filters.owner_id);
      }
      if (filters?.status) {
        query = query.eq('status', filters.status);
      }
      if (filters?.client_id) {
        query = query.eq('project.client_id', filters.client_id);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error loading tasks:', error);
        throw error;
      }

      return data as Task[];
    },
  });

  const createTaskMutation = useMutation({
    mutationFn: async (taskData: CreateTaskData) => {
      const { data, error } = await supabase
        .from('tasks')
        .insert(taskData)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Tarefa criada com sucesso!');
    },
    onError: (error) => {
      console.error('Error creating task:', error);
      toast.error('Erro ao criar tarefa');
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Task> & { id: string }) => {
      const { data, error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Tarefa atualizada com sucesso!');
    },
    onError: (error) => {
      console.error('Error updating task:', error);
      toast.error('Erro ao atualizar tarefa');
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: async (taskId: string) => {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Tarefa excluída com sucesso!');
    },
    onError: (error) => {
      console.error('Error deleting task:', error);
      toast.error('Erro ao excluir tarefa');
    },
  });

  return {
    tasks,
    isLoading,
    createTask: createTaskMutation.mutate,
    updateTask: updateTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
    isCreating: createTaskMutation.isPending,
    isUpdating: updateTaskMutation.isPending,
    isDeleting: deleteTaskMutation.isPending,
  };
}
