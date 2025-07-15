import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface TaskComment {
  id: string;
  task_id: string;
  author_id: string;
  content: string;
  created_at: string;
  author?: {
    id: string;
    nome: string;
    email: string;
  };
}

export const useTaskComments = (taskId: string) => {
  return useQuery({
    queryKey: ['task-comments', taskId],
    queryFn: async () => {
      if (!taskId) return [];
      
      const { data, error } = await supabase
        .from('task_comments')
        .select(`
          *,
          author:profiles(id, nome, email)
        `)
        .eq('task_id', taskId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Erro ao buscar comentários:', error);
        throw new Error(error.message);
      }

      return data || [];
    },
    enabled: !!taskId,
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ task_id, author_id, content }: { task_id: string; author_id: string; content: string }) => {
      const { data, error } = await supabase
        .from('task_comments')
        .insert({
          task_id,
          author_id,
          content,
        })
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['task-comments', variables.task_id] });
    },
  });
};