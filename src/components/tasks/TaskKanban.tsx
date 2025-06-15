
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Clock, User, Tag, AlertCircle } from 'lucide-react';
import { Task } from '@/hooks/useTasks';

interface TaskKanbanProps {
  tasksByStatus: Record<string, Task[]>;
  onTaskClick: (task: Task) => void;
  onStatusChange: (taskId: string, newStatus: string) => void;
}

const statusConfig = {
  backlog: { title: 'Backlog', color: 'bg-gray-100 text-gray-800', icon: '📋' },
  execucao: { title: 'Em Execução', color: 'bg-blue-100 text-blue-800', icon: '⚡' },
  revisao: { title: 'Em Revisão', color: 'bg-yellow-100 text-yellow-800', icon: '👀' },
  aguardando: { title: 'Aguardando', color: 'bg-orange-100 text-orange-800', icon: '⏳' },
  finalizada: { title: 'Finalizada', color: 'bg-green-100 text-green-800', icon: '✅' },
  cancelada: { title: 'Cancelada', color: 'bg-red-100 text-red-800', icon: '❌' },
};

const priorityColors = {
  baixa: 'bg-gray-100 text-gray-800',
  media: 'bg-blue-100 text-blue-800',
  alta: 'bg-orange-100 text-orange-800',
  urgente: 'bg-red-100 text-red-800',
};

export function TaskKanban({ tasksByStatus, onTaskClick, onStatusChange }: TaskKanbanProps) {
  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('text/plain', taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, status: string) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    onStatusChange(taskId, status);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 h-full">
      {Object.entries(statusConfig).map(([status, config]) => (
        <div
          key={status}
          className="flex flex-col"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, status)}
        >
          <div className={`p-3 rounded-t-lg ${config.color} flex items-center justify-between`}>
            <div className="flex items-center gap-2">
              <span>{config.icon}</span>
              <h3 className="font-semibold">{config.title}</h3>
            </div>
            <Badge variant="secondary" className="bg-white/20">
              {tasksByStatus[status]?.length || 0}
            </Badge>
          </div>
          
          <div className="flex-1 bg-gray-50 p-2 space-y-2 min-h-[400px] max-h-[600px] overflow-y-auto">
            {tasksByStatus[status]?.map((task) => (
              <Card
                key={task.id}
                className="cursor-pointer hover:shadow-md transition-shadow bg-white"
                draggable
                onDragStart={(e) => handleDragStart(e, task.id)}
                onClick={() => onTaskClick(task)}
              >
                <CardHeader className="p-3 pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-sm font-medium line-clamp-2">
                      {task.titulo}
                    </CardTitle>
                    <Badge
                      variant="outline"
                      className={`text-xs ${priorityColors[task.prioridade]} border-0`}
                    >
                      {task.prioridade}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="p-3 pt-0 space-y-2">
                  {task.descricao && (
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {task.descricao}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    {task.responsavel && (
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{task.responsavel.nome}</span>
                      </div>
                    )}
                    
                    {task.tempo_estimado && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{task.tempo_estimado}h</span>
                      </div>
                    )}
                  </div>
                  
                  {task.projeto && (
                    <div className="flex items-center gap-1 text-xs">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: task.projeto.cor }}
                      />
                      <span className="text-gray-600">{task.projeto.nome}</span>
                    </div>
                  )}
                  
                  {task.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
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
                  )}
                  
                  {task.status === 'aguardando' && task.motivo_status && (
                    <div className="flex items-center gap-1 text-xs text-orange-600">
                      <AlertCircle className="w-3 h-3" />
                      <span className="line-clamp-1">{task.motivo_status}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
