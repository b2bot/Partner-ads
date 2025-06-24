import { useState } from 'react';
import { useTaskComments, useCreateComment } from '@/hooks/Tarefas/useComments';
import { useUpdateTask, useDeleteTask } from '@/hooks/Tarefas/useTasks';
import { useAuth } from '@/hooks/Tarefas/useAuth';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { TaskStatusBadge } from './TaskStatusBadge';
import { TaskPriorityBadge } from './TaskPriorityBadge';
import { TaskWithDetails } from '@/types/task';
import {
  MessageCircle,
  Paperclip,
  Calendar,
  User,
  Clock,
  Send,
  History
} from 'lucide-react';

interface TaskDetailsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: TaskWithDetails | null;
}

export const TaskDetailsDrawer = ({ open, onOpenChange, task }: TaskDetailsDrawerProps) => {
  const { profile } = useAuth();
  const { data: comments } = useTaskComments(task?.id || '');
  const createComment = useCreateComment();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const [newComment, setNewComment] = useState('');

  if (!task) return null;

  const handleSendComment = async () => {
    if (!newComment.trim() || !profile) return;

    try {
      await createComment.mutateAsync({
        task_id: task.id,
        author_id: profile.id,
        content: newComment.trim(),
      });
      setNewComment('');
    } catch (error) {
      console.error('Erro ao enviar comentário:', error);
    }
  };

  const formatDate = (date: string | null) => {
    if (!date) return 'Não definida';
    return new Date(date).toLocaleDateString('pt-BR');
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[600px] sm:max-w-[600px] overflow-y-auto">
        <SheetHeader className="space-y-4 pb-6 border-b">
          <SheetTitle className="text-left text-xl">{task.title}</SheetTitle>

          <div className="flex items-center gap-3">
            <TaskStatusBadge status={task.status} />
            <TaskPriorityBadge priority={task.priority} />
            {task.project && (
              <Badge variant="outline">
                {task.project.name}
              </Badge>
            )}
          </div>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Descrição */}
          {task.description && (
            <div className="space-y-2">
              <h3 className="font-medium">Descrição</h3>
              <p className="text-gray-600 whitespace-pre-wrap">{task.description}</p>
            </div>
          )}

          {/* Informações da Tarefa */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">Responsável:</span>
                <span>{task.assigned_user?.name || 'Não atribuído'}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">Data de entrega:</span>
                <span>{formatDate(task.due_date)}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">Horas estimadas:</span>
                <span>{task.estimated_hours || 0}h</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <History className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">Criada em:</span>
                <span>{formatDate(task.created_at)}</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          {task.tags && task.tags.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {task.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Subtarefas */}
          {task.subtasks && task.subtasks.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium">Subtarefas</h3>
              <div className="space-y-2">
                {task.subtasks.map((subtask) => (
                  <div key={subtask.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={subtask.completed}
                      className="rounded"
                      readOnly
                    />
                    <span className={subtask.completed ? 'line-through text-gray-500' : ''}>
                      {subtask.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Anexos */}
          {task.attachments && task.attachments.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium flex items-center gap-2">
                <Paperclip className="h-4 w-4" />
                Anexos
              </h3>
              <div className="space-y-2">
                {task.attachments.map((attachment) => (
                  <div key={attachment.id} className="flex items-center gap-2 p-2 border rounded">
                    <Paperclip className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{attachment.filename}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comentários */}
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Comentários ({comments?.length || 0})
            </h3>

            {/* Lista de comentários */}
            <div className="space-y-4 max-h-60 overflow-y-auto">
              {comments?.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {getInitials(comment.author?.nome || 'Usuario')}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">
                        {comment.author?.nome || 'Usuário'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(comment.created_at || '').toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{comment.content}</p>
                  </div>
                </div>
              ))}

              {(!comments || comments.length === 0) && (
                <p className="text-sm text-gray-500 text-center py-4">
                  Nenhum comentário ainda
                </p>
              )}
            </div>

            {/* Novo comentário */}
            <div className="space-y-2">
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Adicione um comentário..."
                rows={3}
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleSendComment}
                  disabled={!newComment.trim() || createComment.isPending}
                  size="sm"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {createComment.isPending ? 'Enviando...' : 'Enviar'}
                </Button>
              </div>
            </div>
          </div>

          {/* Excluir tarefa */}
          <div className="border-t pt-6 mt-6">
            <Button
              variant="destructive"
              onClick={() => {
                if (task && confirm('Deseja realmente excluir esta tarefa?')) {
                  deleteTask.mutate(task.id, {
                    onSuccess: () => onOpenChange(false),
                  });
                }
              }}
            >
              Excluir Tarefa
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};