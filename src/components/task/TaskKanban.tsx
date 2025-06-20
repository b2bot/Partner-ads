
import { useState } from 'react';
import { useTasks } from '@/hooks/task/useTasks';
import { Task, TaskStatus } from '@/types/task';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Clock, User, Calendar } from 'lucide-react';
import { format } from 'date-fns';

const statusColumns: { status: TaskStatus; label: string; color: string }[] = [
  { status: 'backlog', label: 'Backlog', color: 'bg-slate-100 dark:bg-slate-800' },
  { status: 'execucao', label: 'Em Execução', color: 'bg-blue-100 dark:bg-blue-900' },
  { status: 'revisao', label: 'Em Revisão', color: 'bg-yellow-100 dark:bg-yellow-900' },
  { status: 'aguardando', label: 'Aguardando', color: 'bg-orange-100 dark:bg-orange-900' },
  { status: 'finalizada', label: 'Finalizada', color: 'bg-green-100 dark:bg-green-900' },
  { status: 'cancelada', label: 'Cancelada', color: 'bg-red-100 dark:bg-red-900' },
];

export function TaskKanban() {
  const { tasks, isLoading } = useTasks();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {statusColumns.map((column) => (
          <div key={column.status} className="space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        ))}
      </div>
    );
  }

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter((task: Task) => task.status === status);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {statusColumns.map((column) => {
        const columnTasks = getTasksByStatus(column.status);
        
        return (
          <div key={column.status} className="space-y-4">
            <div className={`p-3 rounded-lg ${column.color}`}>
              <h3 className="font-semibold text-sm flex items-center justify-between">
                {column.label}
                <Badge variant="secondary" className="text-xs">
                  {columnTasks.length}
                </Badge>
              </h3>
            </div>

            <div className="space-y-3 min-h-[400px]">
              {columnTasks.map((task: Task) => (
                <KanbanTaskCard key={task.id} task={task} />
              ))}
              
              {columnTasks.length === 0 && (
                <div className="text-center py-8 text-slate-400 text-sm">
                  Nenhuma tarefa
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function KanbanTaskCard({ task }: { task: Task }) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgente':
        return 'bg-red-500';
      case 'alta':
        return 'bg-orange-500';
      case 'media':
        return 'bg-yellow-500';
      case 'baixa':
        return 'bg-green-500';
      default:
        return 'bg-slate-500';
    }
  };

  return (
    <Card className="premium-card cursor-pointer hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-sm font-medium line-clamp-2">
            {task.title}
          </CardTitle>
          <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)} flex-shrink-0 ml-2`} />
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-2">
        {task.description && (
          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
            {task.description}
          </p>
        )}

        <div className="space-y-1">
          {task.project && (
            <div className="flex items-center text-xs text-slate-500">
              <span className="truncate">📁 {task.project.name}</span>
            </div>
          )}

          {task.owner && (
            <div className="flex items-center text-xs text-slate-500">
              <User className="h-3 w-3 mr-1" />
              <span className="truncate">{task.owner.nome}</span>
            </div>
          )}

          {task.due_date && (
            <div className="flex items-center text-xs text-slate-500">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{format(new Date(task.due_date), 'dd/MM/yyyy')}</span>
            </div>
          )}
        </div>

        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {task.tags.slice(0, 2).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                #{tag}
              </Badge>
            ))}
            {task.tags.length > 2 && (
              <Badge variant="outline" className="text-xs px-1 py-0">
                +{task.tags.length - 2}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
