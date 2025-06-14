
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, Bot, Settings } from 'lucide-react';

interface TimelineEntry {
  id: string;
  tipo: string;
  conteudo: string;
  autor_nome: string;
  autor_tipo: 'cliente' | 'admin' | 'sistema';
  created_at: string;
  metadata?: any;
}

interface TicketTimelineProps {
  timeline: TimelineEntry[];
  className?: string;
}

export function TicketTimeline({ timeline, className }: TicketTimelineProps) {
  const getAuthorAvatar = (autorTipo: string, autorNome: string) => {
    const initials = autorNome.split(' ').map(n => n[0]).join('').toUpperCase();
    
    switch (autorTipo) {
      case 'admin':
        return <Bot className="h-4 w-4" />;
      case 'sistema':
        return <Settings className="h-4 w-4" />;
      default:
        return initials;
    }
  };

  const getMessageStyle = (autorTipo: string) => {
    switch (autorTipo) {
      case 'admin':
        return 'bg-blue-50 border-blue-200 ml-0 mr-8';
      case 'sistema':
        return 'bg-gray-50 border-gray-200 mx-4';
      default:
        return 'bg-green-50 border-green-200 ml-8 mr-0';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`space-y-4 pb-4 ${className}`}>
      {timeline.map((entry, index) => (
        <div key={entry.id} className="flex gap-3">
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarFallback className={`
              text-xs
              ${entry.autor_tipo === 'admin' ? 'bg-blue-500 text-white' : ''}
              ${entry.autor_tipo === 'sistema' ? 'bg-gray-500 text-white' : ''}
              ${entry.autor_tipo === 'cliente' ? 'bg-green-500 text-white' : ''}
            `}>
              {getAuthorAvatar(entry.autor_tipo, entry.autor_nome)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium">{entry.autor_nome}</span>
              <Badge variant="outline" className="text-xs">
                {entry.autor_tipo === 'admin' ? 'Equipe' : 
                 entry.autor_tipo === 'sistema' ? 'Sistema' : 'Cliente'}
              </Badge>
              <span className="text-xs text-gray-500">
                {formatDate(entry.created_at)}
              </span>
            </div>

            <div className={`
              p-3 rounded-lg border text-sm whitespace-pre-wrap break-words
              ${getMessageStyle(entry.autor_tipo)}
            `}>
              {entry.tipo === 'status_change' ? (
                <div className="flex items-center gap-2 text-amber-600">
                  <Settings className="h-4 w-4" />
                  {entry.conteudo}
                </div>
              ) : (
                entry.conteudo
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
