
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { WorkflowTemplate } from '@/types/Tarefas';
import { toast } from '@/hooks/use-toast';

export const useWorkflowTemplates = () => {
  return useQuery({
    queryKey: ['workflow-templates'],
    queryFn: async (): Promise<WorkflowTemplate[]> => {
      const { data, error } = await supabase
        .from('workflow_templates')
        .select('*')
        .order('name');

      if (error) throw error;
      return data || [];
    },
  });
};

export const useCreateTasksFromTemplate = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ templateId, projectId }: { templateId: string; projectId?: string }) => {
      const { data: template, error: templateError } = await supabase
        .from('workflow_templates')
        .select('*')
        .eq('id', templateId)
        .single();

      if (templateError) throw templateError;

      const steps = template.steps as any[];
      const tasksToCreate = steps.map((step, index) => ({
        title: step.title,
        description: step.description,
        estimated_hours: step.estimated_hours,
        project_id: projectId,
        order_index: index,
        status: 'backlog' as const
      }));

      const { data, error } = await supabase
        .from('tasks')
        .insert(tasksToCreate)
        .select();

      if (error) throw error;
      return data;
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
