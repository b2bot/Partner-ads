
import { useState } from 'react';
import { Task } from '@/types/task';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Calendar, 
  User, 
  FolderOpen, 
  Tag, 
  Clock,
  MessageSquare,
  Paperclip
} from 'lucide-react';
import { format } from 'date-fns';

interface TaskDetailModalProps {
  task: Task;
  open: boolean;
  onClose: () => void;
}

export function TaskDetailModal({ task, open, onClose }: TaskDetailModalProps) {
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
    return format(new Date(dateString), 'dd/MM/yyyy');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-xl mb-2">{task.title}</DialogTitle>
              <div className="flex items-center gap-2">
                <Badge className={getPriorityColor(task.priority)}>
                  {task.priority}
                </Badge>
                <Badge className={getStatusColor(task.status)}>
                  {task.status}
                </Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações Básicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {task.project && (
              <div className="flex items-center gap-2">
                <FolderOpen className="h-4 w-4 text-slate-500" />
                <span className="text-sm">{task.project.name}</span>
              </div>
            )}

            {task.owner && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-slate-500" />
                <span className="text-sm">{task.owner.nome}</span>
              </div>
            )}

            {task.due_date && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-slate-500" />
                <span className="text-sm">Entrega: {formatDate(task.due_date)}</span>
              </div>
            )}

            {task.data_inicio && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-500" />
                <span className="text-sm">Iniciada: {formatDate(task.data_inicio)}</span>
              </div>
            )}
          </div>

          {/* Descrição */}
          {task.description && (
            <div>
              <h3 className="font-semibold mb-2">Descrição</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 whitespace-pre-wrap">
                {task.description}
              </p>
            </div>
          )}

          {/* Tags */}
          {task.tags.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {task.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Tipo */}
          {task.type && (
            <div>
              <h3 className="font-semibold mb-2">Tipo</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">{task.type}</p>
            </div>
          )}

          {/* Chamado Vinculado */}
          {task.linked_ticket && (
            <div>
              <h3 className="font-semibold mb-2">Chamado Vinculado</h3>
              <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <MessageSquare className="h-4 w-4 text-blue-500" />
                <span className="text-sm">{task.linked_ticket.titulo}</span>
              </div>
            </div>
          )}

          {/* Datas */}
          <div>
            <h3 className="font-semibold mb-2">Cronograma</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Criada:</span>
                <span>{formatDate(task.created_at)}</span>
              </div>
              {task.start_date && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Início:</span>
                  <span>{formatDate(task.start_date)}</span>
                </div>
              )}
              {task.due_date && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Entrega:</span>
                  <span>{formatDate(task.due_date)}</span>
                </div>
              )}
              {task.data_conclusao && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Concluída:</span>
                  <span>{formatDate(task.data_conclusao)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Recorrência */}
          {task.is_recurring && (
            <div>
              <h3 className="font-semibold mb-2">Recorrência</h3>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Esta tarefa se repete {task.frequency} e será gerada automaticamente.
                </p>
                {task.next_generation_date && (
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                    Próxima geração: {formatDate(task.next_generation_date)}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={onClose}>Fechar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
