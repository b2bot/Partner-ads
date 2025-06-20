import { useState } from 'react';
import { Task } from '@/types/task';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Calendar, 
  User, 
  FolderOpen, 
  Tag, 
  Clock,
  MoreHorizontal,
  Edit,
  Trash2
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TaskDetailModal } from './TaskDetailModal';
import { EditTaskModal } from './EditTaskModal';
import { useTasks } from '@/hooks/task/useTasks';
import { useAuth } from '@/hooks/useAuth';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const [showDetail, setShowDetail] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const { deleteTask } = useTasks();
  const { hasPermission } = useAuth();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'media': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'baixa': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'urgente': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'backlog': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'execucao': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'revisao': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'finalizada': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'cancelada': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const handleDelete = () => {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
      deleteTask(task.id);
    }
  };

  return (
    <>
      <Card 
        className="premium-card hover:shadow-lg transition-all duration-200 cursor-pointer"
        onClick={() => setShowDetail(true)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg text-slate-800 dark:text-slate-100">
              {task.title}
            </CardTitle>
            
            <div className="flex items-center gap-2">
              <Badge className={getPriorityColor(task.priority)}>
                {task.priority}
              </Badge>
              <Badge className={getStatusColor(task.status)}>
                {task.status}
              </Badge>
              
              {hasPermission('manage_tasks') && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={(e) => {
                      e.stopPropagation();
                      setShowEdit(true);
                    }}>
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete();
                      }}
                      className="text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
          
          {task.description && (
            <p className="text-body-small text-slate-600 dark:text-slate-400 line-clamp-2">
              {task.description}
            </p>
          )}
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
            {task.project && (
              <div className="flex items-center gap-1">
                <FolderOpen className="h-4 w-4" />
                <span>{task.project.name}</span>
              </div>
            )}
            
            {task.due_date && (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(task.due_date)}</span>
              </div>
            )}
            
            {task.data_inicio && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Iniciada</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {task.owner && (
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs bg-blue-100 text-blue-600">
                      {getInitials(task.owner.nome)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {task.owner.nome}
                  </span>
                </div>
              )}
            </div>
            
            {task.tags.length > 0 && (
              <div className="flex items-center gap-1">
                <Tag className="h-4 w-4 text-slate-400" />
                <div className="flex gap-1">
                  {task.tags.slice(0, 2).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {task.tags.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{task.tags.length - 2}
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {showDetail && (
        <TaskDetailModal
          task={task}
          open={showDetail}
          onClose={() => setShowDetail(false)}
        />
      )}

      {showEdit && (
        <EditTaskModal
          task={task}
          open={showEdit}
          onClose={() => setShowEdit(false)}
        />
      )}
    </>
  );
}
