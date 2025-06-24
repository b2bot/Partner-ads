
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUpdateTask } from '@/hooks/Tarefas/useTasks';
import { TaskWithDetails } from '@/types/task';
import { useForm } from 'react-hook-form';

interface EditTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: TaskWithDetails | null;
}

export const EditTaskModal = ({ open, onOpenChange, task }: EditTaskModalProps) => {
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      title: task?.title || '',
      status: task?.status || 'PENDING',
      priority: task?.priority || 'MEDIUM',
    },
  });

  const updateTask = useUpdateTask();

  React.useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        status: task.status,
        priority: task.priority,
      });
    }
  }, [task, reset]);

  const onSubmit = (data: any) => {
    if (!task) return;
    updateTask.mutate({ id: task.id, ...data });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Tarefa</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Título</label>
            <Input {...register('title')} />
          </div>

          <div>
            <label className="text-sm font-medium">Status</label>
            <Select onValueChange={(value) => setValue('status', value)} defaultValue={task?.status}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDING">Pendente</SelectItem>
                <SelectItem value="IN_PROGRESS">Em Progresso</SelectItem>
                <SelectItem value="DONE">Concluída</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Prioridade</label>
            <Select onValueChange={(value) => setValue('priority', value)} defaultValue={task?.priority}>
              <SelectTrigger>
                <SelectValue placeholder="Prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LOW">Baixa</SelectItem>
                <SelectItem value="MEDIUM">Média</SelectItem>
                <SelectItem value="HIGH">Alta</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
