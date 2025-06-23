
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Task, CreateTaskData, UpdateTaskData } from '@/types/task';
import { toast } from 'sonner';

export function useTasks(filters?: any) {
  const queryClient = useQueryClient();

  // Buscar tarefas
  const { data: tasks = [], isLoading, error } = useQuery({
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

      // Aplicar filtros se fornecidos
      if (filters?.project_id) {
        query = query.eq('project_id', filters.project_id);
      }
      if (filters?.status) {
        query = query.eq('status', filters.status);
      }
      if (filters?.priority) {
        query = query.eq('priority', filters.priority);
      }
      if (filters?.owner_id) {
        query = query.eq('owner_id', filters.owner_id);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Erro ao buscar tarefas:', error);
        throw error;
      }

      return data || [];
    },
  });

  // Criar tarefa
  const createTaskMutation = useMutation({
    mutationFn: async (data: CreateTaskData) => {
      const { data: result, error } = await supabase
        .from('tasks')
        .insert([{
          ...data,
          status: 'backlog'
        }])
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Tarefa criada com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao criar tarefa:', error);
      toast.error('Erro ao criar tarefa');
    },
  });

  // Atualizar tarefa
  const updateTaskMutation = useMutation({
    mutationFn: async (data: UpdateTaskData) => {
      const { id, ...updateData } = data;
      const { data: result, error } = await supabase
        .from('tasks')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Tarefa atualizada com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao atualizar tarefa:', error);
      toast.error('Erro ao atualizar tarefa');
    },
  });

  // Deletar tarefa
  const deleteTaskMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Tarefa excluída com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao excluir tarefa:', error);
      toast.error('Erro ao excluir tarefa');
    },
  });

  return {
    tasks,
    isLoading,
    error,
    createTask: createTaskMutation.mutate,
    isCreating: createTaskMutation.isPending,
    updateTask: updateTaskMutation.mutate,
    isUpdating: updateTaskMutation.isPending,
    deleteTask: deleteTaskMutation.mutate,
    isDeleting: deleteTaskMutation.isPending,
  };
}

// Alias para manter compatibilidade com componentes que usam os hooks separadamente
export const useUpdateTask = () => {
  const { updateTask, isUpdating } = useTasks();
  return {
    mutate: updateTask,
    isPending: isUpdating,
  };
};

export const useCreateTask = () => {
  const { createTask, isCreating } = useTasks();
  return {
    mutate: createTask,
    isPending: isCreating,
  };
};

export const useDeleteTask = () => {
  const { deleteTask, isDeleting } = useTasks();
  return {
    mutate: deleteTask,
    isPending: isDeleting,
  };
};