
import { Badge } from '@/components/ui/badge';
import { Clock, AlertCircle, CheckCircle, Pause, Play } from 'lucide-react';

interface TicketStatusBadgeProps {
  status: 'aberto' | 'em_andamento' | 'resolvido';
  prioridade?: 'baixa' | 'media' | 'alta' | 'urgente';
  size?: 'sm' | 'md' | 'lg';
}

export function TicketStatusBadge({ status, prioridade, size = 'md' }: TicketStatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'aberto':
        return {
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: AlertCircle,
          label: 'Aberto'
        };
      case 'em_andamento':
        return {
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: Clock,
          label: 'Em Andamento'
        };
      case 'resolvido':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: CheckCircle,
          label: 'Resolvido'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: Clock,
          label: status
        };
    }
  };

  const getPrioridadeConfig = () => {
    if (!prioridade) return null;
    
    switch (prioridade) {
      case 'urgente':
        return { color: 'bg-red-500 text-white', label: 'Urgente' };
      case 'alta':
        return { color: 'bg-orange-500 text-white', label: 'Alta' };
      case 'media':
        return { color: 'bg-blue-500 text-white', label: 'Média' };
      case 'baixa':
        return { color: 'bg-gray-500 text-white', label: 'Baixa' };
      default:
        return null;
    }
  };

  const statusConfig = getStatusConfig();
  const prioridadeConfig = getPrioridadeConfig();
  const IconComponent = statusConfig.icon;
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2 py-1',
    lg: 'text-sm px-3 py-1.5'
  };

  return (
    <div className="flex gap-1">
      <Badge className={`${statusConfig.color} ${sizeClasses[size]} flex items-center gap-1`}>
        <IconComponent className="h-3 w-3" />
        {statusConfig.label}
      </Badge>
      {prioridadeConfig && (
        <Badge className={`${prioridadeConfig.color} ${sizeClasses[size]}`}>
          {prioridadeConfig.label}
        </Badge>
      )}
    </div>
  );
}
