import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Task, TaskInsert, TaskUpdate, TaskWithDetails, TaskStatus, TaskPriority } from '@/types/task';
import { toast } from '@/hooks/use-toast';

export const useTasks = (projectId?: string) => {
  return useQuery({
    queryKey: ['tasks', projectId],
    queryFn: async (): Promise<TaskWithDetails[]> => {
      console.log('Fetching tasks, projectId:', projectId);
      
      try {
        let query = supabase
          .from('tasks')
          .select(`
            *,
            assigned_user:assigned_to (
              id,
              nome,
              foto_url
            )
          `);

        if (projectId) {
          query = query.eq('project_id', projectId);
        }

        const { data: tasksData, error: tasksError } = await query;
        
        if (tasksError) {
          console.error('Error fetching basic tasks:', tasksError);
          throw new Error(tasksError.message);
        }

        console.log('Basic tasks loaded:', tasksData);

        if (!tasksData || tasksData.length === 0) {
          return [];
        }

        // Mapear as tarefas para o formato TaskWithDetails
        const tasksWithDetails: TaskWithDetails[] = tasksData.map((task) => ({
          id: task.id,
          title: task.title,
          description: task.description,
          status: task.status as TaskStatus,
          priority: task.priority as TaskPriority,
          due_date: task.due_date,
          start_date: task.start_date,
          assigned_to: task.assigned_to,
          created_by: task.created_by,
          project_id: task.project_id,
          section_id: task.section_id,
          tags: task.tags,
          estimated_hours: task.estimated_hours,
          actual_hours: task.actual_hours,
          order_index: task.order_index,
          type: task.type,
          linked_ticket_id: task.linked_ticket_id,
          owner_id: task.owner_id,
          created_at: task.created_at,
          updated_at: task.updated_at,
          assigned_user: null,
          creator: null,
          project: null,
          subtasks: [],
          comments: [],
          attachments: []
        }));

        console.log('Tasks with details loaded:', tasksWithDetails);
        return tasksWithDetails;
        
      } catch (error) {
        console.error('Error in useTasks:', error);
        throw error;
      }
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
      // Limpar campos null/undefined que podem causar problemas de FK
      const cleanTask = {
        ...task,
        assigned_to: task.assigned_to || null,
        created_by: task.created_by || null,
        owner_id: task.owner_id || null,
        project_id: task.project_id || null
      };

      const { data, error } = await supabase.from('tasks').insert(cleanTask).select().single();
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
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<TaskWithDetails> }) => {
      console.log('UPDATES PAYLOAD =>', updates);

      // Limpar campos null/undefined que podem causar problemas de FK
      const cleanUpdates = {
        ...updates,
        assigned_to: updates.assigned_to || null,
        created_by: updates.created_by || null,
        owner_id: updates.owner_id || null,
        project_id: updates.project_id || null
      };

      const { data, error } = await supabase.from('tasks').update(cleanUpdates).eq('id', id).select().single();
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
