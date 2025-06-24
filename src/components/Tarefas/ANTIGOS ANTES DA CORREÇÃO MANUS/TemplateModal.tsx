
import { useState } from 'react';
import { useCreateTasksFromTemplate } from '@/hooks/Tarefas/useWorkflowTemplates';
import { useProjects } from '@/hooks/task/useProjects';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { WorkflowTemplate } from '@/types/Tarefas';
import { CheckCircle, Circle, Workflow } from 'lucide-react';

interface TemplateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template: WorkflowTemplate | null;
}

export const TemplateModal = ({ open, onOpenChange, template }: TemplateModalProps) => {
  const { data: projects } = useProjects();
  const createTasksFromTemplate = useCreateTasksFromTemplate();
  const [selectedProjectId, setSelectedProjectId] = useState('');

  if (!template) return null;

  const steps = (template.steps as any[]) || [];

  const handleCreateTasks = async () => {
    if (!selectedProjectId) return;

    try {
      await createTasksFromTemplate.mutateAsync({
        templateId: template.id,
        projectId: selectedProjectId
      });
      onOpenChange(false);
      setSelectedProjectId('');
    } catch (error) {
      console.error('Erro ao criar tarefas do template:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Workflow className="h-5 w-5" />
            {template.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Descrição do template */}
          {template.description && (
            <div className="space-y-2">
              <h3 className="font-medium">Descrição</h3>
              <p className="text-gray-600">{template.description}</p>
            </div>
          )}

          {/* Categoria */}
          {template.category && (
            <div className="space-y-2">
              <h3 className="font-medium">Categoria</h3>
              <Badge variant="outline">{template.category}</Badge>
            </div>
          )}

          {/* Lista de etapas */}
          <div className="space-y-3">
            <h3 className="font-medium">Etapas do Fluxo ({steps.length} tarefas)</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                  <Circle className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium">{step.title}</h4>
                    {step.description && (
                      <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                    )}
                    {step.estimated_hours && (
                      <p className="text-xs text-gray-500 mt-1">
                        Estimativa: {step.estimated_hours}h
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Seleção do projeto */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Projeto de Destino *</label>
            <Select
              value={selectedProjectId}
              onValueChange={setSelectedProjectId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um projeto" />
              </SelectTrigger>
              <SelectContent>
                {projects?.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Ações */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleCreateTasks}
              className="flex-1"
              disabled={!selectedProjectId || createTasksFromTemplate.isPending}
            >
              {createTasksFromTemplate.isPending ? 'Criando...' : 'Criar Tarefas'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
