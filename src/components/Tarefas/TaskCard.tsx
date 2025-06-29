import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { TaskWithDetails } from '@/types/task';
import { TaskStatusBadge } from './TaskStatusBadge';
import { TaskPriorityBadge } from './TaskPriorityBadge';
import { CalendarDays, MessageCircle, Paperclip, Trash } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useDeleteTask } from '@/hooks/Tarefas/useTasks';

interface TaskCardProps {
  task: TaskWithDetails;
  onClick?: () => void;
  compact?: boolean;
}

export const TaskCard = ({ task, onClick, compact = false }: TaskCardProps) => {
  const assigneeName = task.assigned_user?.name ?? '??';
  const deleteTask = useDeleteTask();

  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <h3 className="font-medium text-sm line-clamp-2">{task.title}</h3>
            <div className="flex items-center gap-2">
              <TaskPriorityBadge priority={task.priority} />
              <Trash
                className="h-4 w-4 text-red-500 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm('Deseja excluir esta tarefa?')) {
                    deleteTask.mutate(task.id);
                  }
                }}
              />
            </div>
          </div>

          {/* Status */}
          <TaskStatusBadge status={task.status} />

          {/* Assignee */}
          {task.assigned_user && (
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={task.assigned_user.avatar_url || ''} />
                <AvatarFallback className="text-xs">
                  {assigneeName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground">
                {assigneeName}
              </span>
            </div>
          )}

          {/* Project */}
          {task.project && (
            <Badge variant="outline" className="text-xs">
              {task.project.name}
            </Badge>
          )}

          {/* Tags */}
          {task.tags && task.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {task.tags.slice(0, 2).map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {task.tags.length > 2 && (
                <Badge variant="secondary" className="text-xs">
                  +{task.tags.length - 2}
                </Badge>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            {task.due_date && (
              <div className="flex items-center gap-1">
                <CalendarDays className="h-3 w-3" />
                {format(new Date(task.due_date), 'dd/MM', { locale: ptBR })}
              </div>
            )}
            <div className="flex items-center gap-2">
              {task.comments?.length > 0 && (
                <div className="flex items-center gap-1">
                  <MessageCircle className="h-3 w-3" />
                  {task.comments.length}
                </div>
              )}
              {task.attachments?.length > 0 && (
                <div className="flex items-center gap-1">
                  <Paperclip className="h-3 w-3" />
                  {task.attachments.length}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
