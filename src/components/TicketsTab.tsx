
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { useUserAccess } from '@/hooks/useUserAccess';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, MessageCircle, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { CreateTicketModal } from '@/components/CreateTicketModal';
import { TicketDetailModal } from '@/components/TicketDetailModal';

interface Ticket {
  id: string;
  titulo: string;
  mensagem: string;
  status: 'aberto' | 'em_andamento' | 'resolvido';
  status_detalhado?: string;
  resposta?: string;
  arquivo_url?: string;
  aberto_por?: string;
  created_at: string;
  updated_at: string;
  clientes: {
    nome: string;
  };
}

export function TicketsTab() {
  const { isAdmin } = useAuth();
  const { clienteData } = useUserAccess();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const { data: tickets, isLoading } = useQuery({
    queryKey: ['tickets'],
    queryFn: async () => {
      let query = supabase
        .from('chamados')
        .select(`
          *,
          clientes:cliente_id (nome)
        `)
        .order('created_at', { ascending: false });

      // Para clientes, filtrar apenas seus chamados
      if (!isAdmin && clienteData?.id) {
        query = query.eq('cliente_id', clienteData.id);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as Ticket[];
    },
    enabled: isAdmin || !!clienteData?.id,
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'aberto':
        return <AlertCircle className="h-4 w-4" />;
      case 'em_andamento':
        return <Clock className="h-4 w-4" />;
      case 'resolvido':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <MessageCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aberto':
        return 'bg-red-100 text-red-800';
      case 'em_andamento':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolvido':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (ticket: Ticket) => {
    return ticket.status_detalhado || ticket.status;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            {isAdmin ? 'Gerenciar Chamados' : 'Meus Chamados'}
          </h1>
          <p className="text-slate-600 mt-2">
            {isAdmin 
              ? 'Visualize e responda todos os chamados dos clientes'
              : 'Abra chamados para suporte técnico e acompanhe o status'
            }
          </p>
        </div>
        <Button onClick={() => setCreateModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Chamado
        </Button>
      </div>

      <div className="grid gap-4">
        {tickets?.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {isAdmin ? 'Nenhum chamado encontrado' : 'Você ainda não tem chamados'}
              </h3>
              <p className="text-gray-500">
                {isAdmin 
                  ? 'Quando os clientes abrirem chamados, eles aparecerão aqui.'
                  : 'Clique em "Novo Chamado" para abrir seu primeiro chamado de suporte.'
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          tickets?.map((ticket) => (
            <Card 
              key={ticket.id} 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedTicket(ticket)}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{ticket.titulo}</CardTitle>
                    {isAdmin && (
                      <p className="text-sm text-slate-500 mt-1">
                        Cliente: {ticket.clientes?.nome}
                      </p>
                    )}
                  </div>
                  <Badge className={getStatusColor(ticket.status)}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(ticket.status)}
                      {getStatusLabel(ticket)}
                    </div>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-3 line-clamp-2">{ticket.mensagem}</p>
                <div className="flex justify-between items-center text-sm text-slate-500">
                  <div className="space-y-1">
                    <p>Criado: {new Date(ticket.created_at).toLocaleDateString('pt-BR')}</p>
                    {ticket.updated_at !== ticket.created_at && (
                      <p>Atualizado: {new Date(ticket.updated_at).toLocaleDateString('pt-BR')}</p>
                    )}
                  </div>
                  {ticket.resposta && (
                    <span className="text-green-600 font-medium">
                      ✓ Respondido
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {createModalOpen && (
        <CreateTicketModal
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
        />
      )}

      {selectedTicket && (
        <TicketDetailModal
          ticket={selectedTicket}
          open={!!selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />
      )}
    </div>
  );
}
