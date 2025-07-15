import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TaskWithDetails } from '@/types/task';
import { Trash, CalendarDays, MessageCircle } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useDeleteTask } from '@/hooks/Tarefas/useTasks';

interface TaskCardProps {
  task: TaskWithDetails;
  onClick?: () => void;
  compact?: boolean;
}

export const TaskCard = ({ task, onClick, compact = false }: TaskCardProps) => {
  const deleteTask = useDeleteTask();
  const assigneeName = task.assigned_user?.nome ?? '??';

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Backlog':
        return 'bg-gray-200 text-gray-800';
      case 'Em Execução':
        return 'bg-blue-200 text-blue-800';
      case 'Em Revisão':
        return 'bg-yellow-200 text-yellow-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'Alta':
        return 'bg-red-200 text-red-800';
      case 'Média':
        return 'bg-blue-100 text-blue-800';
      case 'Baixa':
        return 'bg-green-200 text-green-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const hasComments = Array.isArray(task.comments) && task.comments.length > 0;

  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow border border-gray-200" onClick={onClick}>
      <CardContent className="p-3 space-y-2">
        {/* Título */}
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-xs leading-snug line-clamp-2">{task.title}</h3>
        </div>

        {/* Badges */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <span className={`px-2 py-[2px] rounded-full text-xs font-medium leading-none ${getStatusStyle(task.status)}`}>
              {task.status}
            </span>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-muted-foreground pt-1 mt-0">
            <span className={`px-2 py-[2px] rounded-full text-xs font-medium leading-none ${getPriorityStyle(task.priority)}`}>
              {task.priority}
            </span>
          </div>
        </div>

        {/* Rodapé: Data + Avatar + Comentário */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground pt-1 mt-0">
            {task.due_date && (
              <>
                <CalendarDays className="h-3 w-3" />
                {format(new Date(task.due_date), 'dd/MM', { locale: ptBR })}
              </>
            )}
          </div>

          <div className="flex items-center gap-2 pt-1">
            <MessageCircle
              className={`h-3 w-3 ${hasComments ? 'text-blue-500' : 'text-gray-300'}`}
            />
            {task.assigned_user && (
              <Avatar className="h-5 w-5">
                <AvatarImage src={task.assigned_user.foto_url || ''} />
                <AvatarFallback className="text-[10px]">
                  {assigneeName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
