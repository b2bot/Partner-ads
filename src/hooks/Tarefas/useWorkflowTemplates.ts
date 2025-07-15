import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/integrations/apiClient';
import { WorkflowTemplate } from '@/types/Tarefas';
import { toast } from '@/hooks/use-toast';

export const useWorkflowTemplates = () => {
  return useQuery({
    queryKey: ['workflow-templates'],
    queryFn: async (): Promise<WorkflowTemplate[]> => {
      const { data, error } = await apiClient.from('workflow_templates').select('*');
      if (error) throw new Error(error.message);
      return data || [];
    },
  });
};

export const useCreateTasksFromTemplate = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ templateId, projectId }: { templateId: string; projectId?: string }) => {
      const { data: template, error } = await apiClient
        .from('workflow_templates')
        .select('steps')
        .eq('id', templateId)
        .single();

      if (error) throw new Error(error.message);
      if (!template?.steps || !Array.isArray(template.steps)) throw new Error('Template inválido.');

      const steps = template.steps;
      const tasksToCreate = steps.map((step: any, index: number) => ({
        title: step.title,
        description: step.description,
        project_id: projectId,
        actual_hours: step.estimated_hours || null,
        status: 'backlog',
        priority: null,
        due_date: null,
        tags: [],
        owner_id: null,
        created_by: null,
        linked_ticket_id: null,
        type: null,
        assigned_to: null,
      }));

      const { data: createdTasks, error: insertError } = await apiClient
        .from('tasks')
        .insert(tasksToCreate)
        .select();

      if (insertError) throw new Error(insertError.message);
      return createdTasks;
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
