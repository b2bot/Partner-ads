
import { useState } from 'react';
import { useTasks } from '@/hooks/Tarefas/useTasks';
import { Button } from '@/components/ui/button';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { TaskStatusBadge } from './TaskStatusBadge';
import { TaskPriorityBadge } from './TaskPriorityBadge';

type ViewMode = 'month' | 'week' | 'day';

export const CalendarView = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const { data: tasks } = useTasks();

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    
    if (viewMode === 'month') {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    }
    
    setCurrentDate(newDate);
  };

  const formatDateTitle = () => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
    };
    
    if (viewMode === 'day') {
      options.day = 'numeric';
    }
    
    return currentDate.toLocaleDateString('pt-BR', options);
  };

  // Filtrar tarefas que têm data de entrega
  const tasksWithDates = tasks?.filter(task => task.due_date) || [];

  return (
    <div className="space-y-6">
      {/* Header do Calendário */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateDate('prev')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateDate('next')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <h2 className="text-xl font-semibold">{formatDateTitle()}</h2>
          
          <Button variant="outline" size="sm" onClick={goToToday}>
            Hoje
          </Button>
        </div>

        {/* Controles de visualização */}
        <div className="flex gap-2">
          {(['month', 'week', 'day'] as ViewMode[]).map((mode) => (
            <Button
              key={mode}
              variant={viewMode === mode ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode(mode)}
              className="capitalize"
            >
              {mode === 'month' ? 'Mês' : mode === 'week' ? 'Semana' : 'Dia'}
            </Button>
          ))}
        </div>
      </div>

      {/* Visualização do Calendário */}
      <div className="border rounded-lg bg-white">
        {viewMode === 'month' && (
          <MonthView tasks={tasksWithDates} currentDate={currentDate} />
        )}
        {viewMode === 'week' && (
          <WeekView tasks={tasksWithDates} currentDate={currentDate} />
        )}
        {viewMode === 'day' && (
          <DayView tasks={tasksWithDates} currentDate={currentDate} />
        )}
      </div>
    </div>
  );
};

// Componente para visualização mensal
const MonthView = ({ tasks, currentDate }: { tasks: any[]; currentDate: Date }) => {
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const days = [];
  
  // Dias vazios no início
  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push(null);
  }
  
  // Dias do mês
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  const getTasksForDay = (day: number) => {
    const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return tasks.filter(task => {
      const taskDate = new Date(task.due_date);
      return taskDate.toDateString() === dayDate.toDateString();
    });
  };

  return (
    <div className="p-4">
      {/* Cabeçalho dos dias da semana */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
          <div key={day} className="text-center font-medium text-gray-600 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Grid do calendário */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <div
            key={index}
            className={`min-h-24 border rounded-lg p-2 ${
              day ? 'bg-white hover:bg-gray-50' : 'bg-gray-50'
            }`}
          >
            {day && (
              <>
                <div className="font-medium text-sm mb-2">{day}</div>
                <div className="space-y-1">
                  {getTasksForDay(day).slice(0, 2).map(task => (
                    <div
                      key={task.id}
                      className="text-xs p-1 rounded bg-blue-100 text-blue-800 truncate"
                    >
                      {task.title}
                    </div>
                  ))}
                  {getTasksForDay(day).length > 2 && (
                    <div className="text-xs text-gray-500">
                      +{getTasksForDay(day).length - 2} mais
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Componente para visualização semanal
const WeekView = ({ tasks, currentDate }: { tasks: any[]; currentDate: Date }) => {
  return (
    <div className="p-4">
      <div className="text-center text-gray-500">
        <Calendar className="h-12 w-12 mx-auto mb-2" />
        <p>Visualização semanal em desenvolvimento</p>
      </div>
    </div>
  );
};

// Componente para visualização diária
const DayView = ({ tasks, currentDate }: { tasks: any[]; currentDate: Date }) => {
  const dayTasks = tasks.filter(task => {
    const taskDate = new Date(task.due_date);
    return taskDate.toDateString() === currentDate.toDateString();
  });

  return (
    <div className="p-4">
      <h3 className="font-medium mb-4">
        Tarefas para {currentDate.toLocaleDateString('pt-BR')}
      </h3>
      
      {dayTasks.length > 0 ? (
        <div className="space-y-3">
          {dayTasks.map(task => (
            <div key={task.id} className="border rounded-lg p-3">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium">{task.title}</h4>
                  {task.description && (
                    <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <TaskPriorityBadge priority={task.priority} />
                  <TaskStatusBadge status={task.status} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-8">
          <Calendar className="h-12 w-12 mx-auto mb-2" />
          <p>Nenhuma tarefa para este dia</p>
        </div>
      )}
    </div>
  );
};
