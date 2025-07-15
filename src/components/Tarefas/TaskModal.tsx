// TaskModal.tsx

import { useState } from 'react';
import { useCreateTask, useUpdateTask } from '@/hooks/Tarefas/useTasks';
import { useProjects } from '@/hooks/Tarefas/useProjects';
import { useAuth } from '@/hooks/useAuth';
import { useCollaborators } from '@/hooks/useCollaborators';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { TaskWithDetails, TaskStatus, TaskPriority } from '@/types/task';
import { X, Plus } from 'lucide-react';

interface TaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: TaskWithDetails;
  mode: 'create' | 'edit';
}

export const TaskModal = ({ open, onOpenChange, task, mode }: TaskModalProps) => {
  const { profile } = useAuth();
  const { data: projects } = useProjects();
  const { collaborators } = useCollaborators();
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();

  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    project_id: task?.project_id || '',
    status: task?.status || 'backlog' as TaskStatus,
    priority: task?.priority || 'media' as TaskPriority,
    assigned_to: task?.assigned_to || '',
    due_date: task?.due_date || '',
    estimated_hours: task?.estimated_hours || 0,
    tags: task?.tags || [],
  });

  const [newTag, setNewTag] = useState('');

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const taskData = {
    ...formData,
    created_by: profile?.id,
    assigned_to: formData.assigned_to || profile?.id,
  };

  console.log('CHAMANDO MUTATE =>', {
    id: task?.id,
    updates: taskData
  });

  try {
    if (mode === 'create') {
      await createTask.mutateAsync(taskData);
    } else if (task) {
      await updateTask.mutateAsync({
        id: task.id,
        updates: taskData
      });
    }
    onOpenChange(false);
    setFormData({
      title: '',
      description: '',
      project_id: '',
      status: 'backlog',
      priority: 'media',
      assigned_to: '',
      due_date: '',
      estimated_hours: 0,
      tags: [],
    });
  } catch (error) {
    console.error('Erro ao salvar tarefa:', error);
  }
};


  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const statusOptions = [
    { value: 'backlog', label: 'Backlog' },
    { value: 'em_execucao', label: 'Em Execução' },
    { value: 'em_revisao', label: 'Em Revisão' },
    { value: 'aguardando', label: 'Aguardando' },
    { value: 'finalizada', label: 'Finalizada' },
    { value: 'cancelada', label: 'Cancelada' },
  ];

  const priorityOptions = [
    { value: 'baixa', label: 'Baixa' },
    { value: 'media', label: 'Média' },
    { value: 'alta', label: 'Alta' },
    { value: 'urgente', label: 'Urgente' },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Nova Tarefa' : 'Editar Tarefa'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Título *</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Digite o título da tarefa"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Descrição</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Descreva a tarefa em detalhes"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Projeto</label>
            <Select
              value={formData.project_id}
              onValueChange={(value) => setFormData(prev => ({ ...prev, project_id: value }))}
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

          <div className="space-y-2">
            <label className="text-sm font-medium">Responsável</label>
            <Select
              value={formData.assigned_to}
              onValueChange={(value) => setFormData(prev => ({ ...prev, assigned_to: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um responsável" />
              </SelectTrigger>
              <SelectContent>
                {collaborators?.map((collaborator) => (
                  <SelectItem key={collaborator.user_id} value={collaborator.user_id}>
                    {collaborator.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select
                value={formData.status}
                onValueChange={(value: TaskStatus) => setFormData(prev => ({ ...prev, status: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Prioridade</label>
              <Select
                value={formData.priority}
                onValueChange={(value: TaskPriority) => setFormData(prev => ({ ...prev, priority: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priorityOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Data de Entrega</label>
              <Input
                type="date"
                value={formData.due_date}
                onChange={(e) => setFormData(prev => ({ ...prev, due_date: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Horas Estimadas</label>
              <Input
                type="number"
                min="0"
                value={formData.estimated_hours}
                onChange={(e) => setFormData(prev => ({ ...prev, estimated_hours: parseInt(e.target.value) || 0 }))}
                placeholder="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Tags</label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Adicionar tag"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <Button type="button" variant="outline" onClick={addTag}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 hover:bg-transparent"
                    onClick={() => removeTag(tag)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1" disabled={createTask.isPending || updateTask.isPending}>
              {createTask.isPending || updateTask.isPending
                ? 'Salvando...'
                : mode === 'create'
                ? 'Criar Tarefa'
                : 'Salvar Alterações'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
