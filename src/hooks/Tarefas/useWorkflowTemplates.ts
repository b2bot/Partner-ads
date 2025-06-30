
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/integrations/apiClient';
import { WorkflowTemplate } from '@/types/Tarefas';
import { toast } from '@/hooks/use-toast';

export const useWorkflowTemplates = () => {
  return useQuery({
    queryKey: ['workflow-templates'],
    queryFn: async (): Promise<WorkflowTemplate[]> => {
      const data = await apiClient.get<WorkflowTemplate[]>(
        '/api/workflow_templates.php'
      );
      return data || [];
    },
  });
};

export const useCreateTasksFromTemplate = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ templateId, projectId }: { templateId: string; projectId?: string }) => {
      const template = await apiClient.get<WorkflowTemplate>(
        `/api/workflow_templates.php?id=${templateId}`
      );

      const steps = template.steps as any[];
      const tasksToCreate = steps.map((step, index) => ({
        title: step.title,
        description: step.description,
        estimated_hours: step.estimated_hours,
        project_id: projectId,
        order_index: index,
        status: 'backlog' as const
      }));

      const data = await apiClient.post('/api/tasks.php', tasksToCreate);
      return data as any;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast({
        title: "Tarefas criadas",
        description: `${data.length} tarefas foram criadas a partir do template.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao criar tarefas",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
