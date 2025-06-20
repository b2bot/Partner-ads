
import { useState } from 'react';
import { useTasks } from '@/hooks/task/useTasks';
import { Task } from '@/types/task';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, addMonths, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function TaskCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { tasks, isLoading } = useTasks();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <div className="grid grid-cols-7 gap-2">
          {[...Array(35)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      </div>
    );
  }

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getTasksForDate = (date: Date) => {
    return tasks.filter((task: Task) => {
      if (!task.due_date) return false;
      return isSameDay(new Date(task.due_date), date);
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => 
      direction === 'prev' ? subMonths(prev, 1) : addMonths(prev, 1)
    );
  };

  return (
    <div className="space-y-6">
      {/* Header do Calendário */}
      <Card className="premium-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth('prev')}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentDate(new Date())}
              >
                Hoje
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth('next')}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Grade do Calendário */}
      <div className="premium-card p-6">
        {/* Cabeçalho dos dias da semana */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-slate-600 dark:text-slate-400 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Dias do mês */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day) => {
            const dayTasks = getTasksForDate(day);
            const isToday = isSameDay(day, new Date());
            const isCurrentMonth = isSameMonth(day, currentDate);

            return (
              <CalendarDay
                key={day.toString()}
                date={day}
                tasks={dayTasks}
                isToday={isToday}
                isCurrentMonth={isCurrentMonth}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function CalendarDay({ 
  date, 
  tasks, 
  isToday, 
  isCurrentMonth 
}: { 
  date: Date; 
  tasks: Task[]; 
  isToday: boolean; 
  isCurrentMonth: boolean;
}) {
  return (
    <div 
      className={`
        min-h-[80px] p-2 border rounded-lg transition-colors
        ${isToday ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700' : ''}
        ${!isCurrentMonth ? 'opacity-40' : ''}
        ${tasks.length > 0 ? 'bg-slate-50 dark:bg-slate-800/50' : ''}
        hover:bg-slate-100 dark:hover:bg-slate-700/50
      `}
    >
      <div className={`text-sm font-medium mb-1 ${isToday ? 'text-blue-600 dark:text-blue-400' : ''}`}>
        {format(date, 'd')}
      </div>

      <div className="space-y-1">
        {tasks.slice(0, 2).map((task) => (
          <CalendarTaskItem key={task.id} task={task} />
        ))}
        
        {tasks.length > 2 && (
          <div className="text-xs text-slate-500 text-center">
            +{tasks.length - 2} mais
          </div>
        )}
      </div>
    </div>
  );
}

function CalendarTaskItem({ task }: { task: Task }) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgente':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
      case 'alta':
        return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300';
      case 'media':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'baixa':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-300';
    }
  };

  return (
    <div 
      className={`
        text-xs p-1 rounded cursor-pointer hover:opacity-80 transition-opacity
        ${getPriorityColor(task.priority)}
      `}
      title={task.title}
    >
      <div className="truncate font-medium">
        {task.title}
      </div>
      {task.owner && (
        <div className="truncate opacity-75">
          {task.owner.nome}
        </div>
      )}
    </div>
  );
}
