
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/integrations/apiClient';
import { TaskStep, CreateTaskStepData } from '@/types/task';
import { toast } from 'sonner';

export function useTaskSteps(taskId: string) {
  const queryClient = useQueryClient();

  const { data: steps = [], isLoading } = useQuery({
    queryKey: ['task-steps', taskId],
    queryFn: async () => {
      const data = await apiClient.get<TaskStep[]>(
        `/api/task_steps.php?task_id=${taskId}`
      );
      return data as TaskStep[];
    },
    enabled: !!taskId,
  });

  const createStepMutation = useMutation({
    mutationFn: async (stepData: CreateTaskStepData) => {
      const data = await apiClient.post<TaskStep>(
        '/api/task_steps.php',
        stepData
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['task-steps', taskId] });
      toast.success('Etapa criada com sucesso!');
    },
    onError: (error) => {
      console.error('Error creating step:', error);
      toast.error('Erro ao criar etapa');
    },
  });

  const updateStepMutation = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<TaskStep> & { id: string }) => {
      const data = await apiClient.put<TaskStep>(
        `/api/task_steps.php?id=${id}`,
        updates
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['task-steps', taskId] });
      toast.success('Etapa atualizada com sucesso!');
    },
    onError: (error) => {
      console.error('Error updating step:', error);
      toast.error('Erro ao atualizar etapa');
    },
  });

  const deleteStepMutation = useMutation({
    mutationFn: async (stepId: string) => {
      await apiClient.delete(`/api/task_steps.php?id=${stepId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['task-steps', taskId] });
      toast.success('Etapa excluída com sucesso!');
    },
    onError: (error) => {
      console.error('Error deleting step:', error);
      toast.error('Erro ao excluir etapa');
    },
  });

  return {
    steps,
    isLoading,
    createStep: createStepMutation.mutate,
    updateStep: updateStepMutation.mutate,
    deleteStep: deleteStepMutation.mutate,
    isCreating: createStepMutation.isPending,
    isUpdating: updateStepMutation.isPending,
    isDeleting: deleteStepMutation.isPending,
  };
}
