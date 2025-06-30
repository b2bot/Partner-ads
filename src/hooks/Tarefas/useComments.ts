
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/integrations/apiClient';
import { TaskComment, TaskCommentInsert } from '@/types/task';
import { toast } from '@/hooks/use-toast';

export const useTaskComments = (taskId: string) => {
  return useQuery({
    queryKey: ['task-comments', taskId],
    queryFn: async () => {
      const { data, error } = await apiClient
        .from('task_comments')
        .select(`
          *,
          author:profiles!fk_task_comments_author(*)
        `)
        .eq('task_id', taskId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching comments:', error);
        throw error;
      }

      return (data || []).map(comment => ({
        ...comment,
        author: Array.isArray(comment.author) ? comment.author[0] || null : comment.author
      }));
    },
    enabled: !!taskId,
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (comment: TaskCommentInsert) => {
      const { data, error } = await apiClient
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
