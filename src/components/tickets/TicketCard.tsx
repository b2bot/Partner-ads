import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TicketStatusBadge } from './TicketStatusBadge';
import { TicketStepper } from './TicketStepper';
import { MessageCircle, Paperclip, User, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface TicketCardProps {
  ticket: {
    id: string;
    titulo: string;
    mensagem: string;
    status: 'novo' | 'aguardando_equipe' | 'aguardando_cliente' | 'em_analise' | 'em_andamento' | 'resolvido';
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
  const { isAdmin: isAuthAdmin } = useAuth();
  const queryClient = useQueryClient();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const deleteTicketMutation = useMutation({
    mutationFn: async (ticketId: string) => {
      await supabase.from('chamados_mensagens').delete().eq('chamado_id', ticketId);
      await supabase.from('chamados_timeline').delete().eq('chamado_id', ticketId);
      const { error } = await supabase.from('chamados').delete().eq('id', ticketId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      toast.success('Chamado excluído com sucesso!');
      setDeleteDialogOpen(false);
    },
    onError: (error) => {
      console.error('Erro ao excluir chamado:', error);
      toast.error('Erro ao excluir chamado. Tente novamente.');
    },
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getInitials = (nome: string) => {
    return nome.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    deleteTicketMutation.mutate(ticket.id);
  };

  return (
    <Card className="cursor-pointer hover:shadow-md transition-all" onClick={onClick}>
      <CardContent className="flex flex-col p-3 gap-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-blue-500 text-white text-xs">
                {isAdmin && ticket.clientes ? getInitials(ticket.clientes.nome) : <User className="h-4 w-4" />}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="font-semibold text-sm text-gray-900 truncate">{ticket.titulo}</p>
              {isAdmin && ticket.clientes && (
                <p className="text-xs text-gray-500 truncate">Cliente: {ticket.clientes.nome}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-gray-600">
            <TicketStatusBadge status={ticket.status} prioridade={ticket.prioridade as any} size="sm" />
            {ticket.categoria && (
              <Badge variant="outline" className="text-[10px] px-2 py-0.5">{ticket.categoria}</Badge>
            )}
            <span>{formatDate(ticket.created_at)}</span>
            {ticket.arquivo_url && (
              <Paperclip className="h-4 w-4 text-blue-600" />
            )}
            {ticket.resposta && (
              <MessageCircle className="h-4 w-4 text-green-600" />
            )}
            {isAuthAdmin && (
              <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={handleDeleteClick}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                    <AlertDialogDescription>
                      Tem certeza que deseja excluir este chamado?
                      <br /><strong>{ticket.titulo}</strong>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-red-600 hover:bg-red-700"
                      disabled={deleteTicketMutation.isPending}
                    >
                      {deleteTicketMutation.isPending ? 'Excluindo...' : 'Excluir'}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>

        {/* Stepper movido para a direita */}
        <div className="flex justify-end">
          <TicketStepper status={ticket.status} categoria={ticket.categoria} />
        </div>
      </CardContent>
    </Card>
  );
}
