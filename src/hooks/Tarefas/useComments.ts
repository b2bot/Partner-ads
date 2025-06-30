
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/integrations/apiClient';
import { TaskComment, TaskCommentInsert } from '@/types/task';
import { toast } from '@/hooks/use-toast';

export const useTaskComments = (taskId: string) => {
  return useQuery({
    queryKey: ['task-comments', taskId],
    queryFn: async () => {
      const data = await apiClient.get<TaskComment[]>(
        `/api/task_comments.php?task_id=${taskId}`
      );

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
      const data = await apiClient.post<TaskComment>(
        '/api/task_comments.php',
        comment
      );
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
