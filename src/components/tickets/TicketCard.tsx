
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TicketStatusBadge } from './TicketStatusBadge';
import { TicketStepper } from './TicketStepper';
import { MessageCircle, Clock, Paperclip, User, Calendar } from 'lucide-react';

interface TicketCardProps {
  ticket: {
    id: string;
    titulo: string;
    mensagem: string;
    status: 'aberto' | 'em_andamento' | 'resolvido';
    categoria?: string;
    prioridade?: string;
    created_at: string;
    updated_at: string;
    resposta?: string;
    arquivo_url?: string;
    clientes?: { nome: string };
  };
  isAdmin: boolean;
  onClick: () => void;
}

export function TicketCard({ ticket, isAdmin, onClick }: TicketCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoriaIcon = (categoria?: string) => {
    switch (categoria) {
      case 'campanhas': return '📊';
      case 'hospedagem': return '🌐';
      case 'emails': return '📧';
      case 'crm': return '👥';
      default: return '📋';
    }
  };

  const getInitials = (nome: string) => {
    return nome.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-blue-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-blue-500 text-white text-sm">
                {isAdmin && ticket.clientes ? getInitials(ticket.clientes.nome) : <User className="h-5 w-5" />}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-900 truncate">{ticket.titulo}</h3>
                {ticket.categoria && (
                  <span className="text-lg">{getCategoriaIcon(ticket.categoria)}</span>
                )}
              </div>
              
              {isAdmin && ticket.clientes && (
                <p className="text-sm text-gray-600 mb-2">
                  Cliente: {ticket.clientes.nome}
                </p>
              )}

              <div className="flex items-center gap-2 mb-2">
                <TicketStatusBadge 
                  status={ticket.status} 
                  prioridade={ticket.prioridade as any}
                  size="sm"
                />
                {ticket.categoria && (
                  <Badge variant="outline" className="text-xs">
                    {ticket.categoria}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        <TicketStepper status={ticket.status} categoria={ticket.categoria} />
      </CardHeader>

      <CardContent className="pt-0" onClick={onClick}>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {ticket.mensagem}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(ticket.created_at)}
            </div>
            
            {ticket.updated_at !== ticket.created_at && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Atualizado {formatDate(ticket.updated_at)}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {ticket.arquivo_url && (
              <div className="flex items-center gap-1 text-blue-600">
                <Paperclip className="h-3 w-3" />
                <span>Anexo</span>
              </div>
            )}
            
            {ticket.resposta && (
              <div className="flex items-center gap-1 text-green-600">
                <MessageCircle className="h-3 w-3" />
                <span>Respondido</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
