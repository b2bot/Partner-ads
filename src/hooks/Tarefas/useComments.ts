
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { TaskComment, TaskCommentInsert } from '@/types/Tarefas';
import { toast } from '@/hooks/use-toast';

export const useTaskComments = (taskId: string) => {
  return useQuery({
    queryKey: ['task-comments', taskId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('task_comments')
        .select(`
          *,
          user:profiles!task_comments_user_id_fkey(*)
        `)
        .eq('task_id', taskId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching comments:', error);
        throw error;
      }
      
      return (data || []).map(comment => ({
        ...comment,
        user: Array.isArray(comment.user) ? comment.user[0] || null : comment.user
      }));
    },
    enabled: !!taskId,
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (comment: TaskCommentInsert) => {
      const { data, error } = await supabase
        .from('task_comments')
        .insert(comment)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['task-comments', data.task_id] });
    },
    onError: (error) => {
      toast({
        title: "Erro ao criar comentário",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
