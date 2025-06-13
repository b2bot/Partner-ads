
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, Edit3, Image, Video, Download } from 'lucide-react';
import { toast } from 'sonner';

interface Creative {
  id: string;
  titulo: string;
  descricao?: string;
  arquivo_url: string;
  tipo_arquivo: string;
  status: 'pendente' | 'aprovado' | 'reprovado' | 'ajuste_solicitado';
  resposta?: string;
  comentario_cliente?: string;
  created_at: string;
  clientes: {
    nome: string;
  };
}

interface CreativeDetailModalProps {
  creative: Creative;
  open: boolean;
  onClose: () => void;
}

export function CreativeDetailModal({ creative, open, onClose }: CreativeDetailModalProps) {
  const { isAdmin } = useAuth();
  const [comentario, setComentario] = useState('');
  const [error, setError] = useState('');
  
  const queryClient = useQueryClient();

  const updateCreativeStatus = useMutation({
    mutationFn: async ({ 
      status, 
      comentario 
    }: { 
      status: 'aprovado' | 'reprovado' | 'ajuste_solicitado';
      comentario?: string;
    }) => {
      const updateData: any = { status };
      
      if (comentario && comentario.trim()) {
        updateData.comentario_cliente = comentario.trim();
      }

      const { error } = await supabase
        .from('criativos')
        .update(updateData)
        .eq('id', creative.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['creatives'] });
      toast.success('Status do criativo atualizado!');
      onClose();
    },
    onError: (error) => {
      console.error('Erro ao atualizar criativo:', error);
      setError('Erro ao atualizar criativo. Tente novamente.');
    },
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'aprovado':
        return <CheckCircle className="h-4 w-4" />;
      case 'reprovado':
        return <XCircle className="h-4 w-4" />;
      case 'ajuste_solicitado':
        return <Edit3 className="h-4 w-4" />;
      default:
        return <Image className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aprovado':
        return 'bg-green-100 text-green-800';
      case 'reprovado':
        return 'bg-red-100 text-red-800';
      case 'ajuste_solicitado':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pendente':
        return 'Pendente';
      case 'aprovado':
        return 'Aprovado';
      case 'reprovado':
        return 'Reprovado';
      case 'ajuste_solicitado':
        return 'Ajuste Solicitado';
      default:
        return status;
    }
  };

  const handleStatusUpdate = (status: 'aprovado' | 'reprovado' | 'ajuste_solicitado') => {
    setError('');
    updateCreativeStatus.mutate({ status, comentario });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <DialogTitle className="text-xl">{creative.titulo}</DialogTitle>
            <Badge className={getStatusColor(creative.status)}>
              <div className="flex items-center gap-1">
                {getStatusIcon(creative.status)}
                {getStatusLabel(creative.status)}
              </div>
            </Badge>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Visualização do arquivo */}
          <div className="w-full">
            {creative.tipo_arquivo.startsWith('image/') ? (
              <img 
                src={creative.arquivo_url} 
                alt={creative.titulo}
                className="w-full max-h-96 object-contain rounded-lg bg-gray-100"
              />
            ) : (
              <video 
                src={creative.arquivo_url}
                controls
                className="w-full max-h-96 rounded-lg bg-gray-100"
              >
                Seu navegador não suporta vídeo.
              </video>
            )}
          </div>

          {/* Informações do criativo */}
          <div className="space-y-4">
            {creative.descricao && (
              <div>
                <Label className="text-sm font-medium text-gray-600">Descrição:</Label>
                <div className="mt-1 p-3 bg-gray-50 rounded-md">
                  <p className="text-gray-800 whitespace-pre-wrap">{creative.descricao}</p>
                </div>
              </div>
            )}

            {isAdmin && (
              <div>
                <Label className="text-sm font-medium text-gray-600">Cliente:</Label>
                <p className="text-gray-800">{creative.clientes.nome}</p>
              </div>
            )}

            <div className="text-sm text-gray-500">
              <p>Criado em: {new Date(creative.created_at).toLocaleString('pt-BR')}</p>
            </div>

            <div>
              <Button
                variant="outline"
                onClick={() => window.open(creative.arquivo_url, '_blank')}
                className="w-full"
              >
                <Download className="h-4 w-4 mr-2" />
                Baixar arquivo original
              </Button>
            </div>
          </div>

          {/* Comentário existente do cliente */}
          {creative.comentario_cliente && (
            <div>
              <Label className="text-sm font-medium text-gray-600">Comentário do cliente:</Label>
              <div className="mt-1 p-3 bg-blue-50 rounded-md border-l-4 border-blue-400">
                <p className="text-gray-800 whitespace-pre-wrap">{creative.comentario_cliente}</p>
              </div>
            </div>
          )}

          {/* Ações para cliente não admin */}
          {!isAdmin && creative.status === 'pendente' && (
            <div className="space-y-4 border-t pt-4">
              <div className="space-y-2">
                <Label htmlFor="comentario">Comentário (opcional)</Label>
                <Textarea
                  id="comentario"
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  placeholder="Adicione comentários sobre o criativo..."
                  rows={3}
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="flex gap-2">
                <Button
                  onClick={() => handleStatusUpdate('aprovado')}
                  disabled={updateCreativeStatus.isPending}
                  className="flex-1"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  {updateCreativeStatus.isPending ? 'Aprovando...' : 'Aprovar'}
                </Button>
                <Button
                  onClick={() => handleStatusUpdate('ajuste_solicitado')}
                  disabled={updateCreativeStatus.isPending}
                  variant="outline"
                  className="flex-1"
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  {updateCreativeStatus.isPending ? 'Enviando...' : 'Pedir Ajuste'}
                </Button>
                <Button
                  onClick={() => handleStatusUpdate('reprovado')}
                  disabled={updateCreativeStatus.isPending}
                  variant="destructive"
                  className="flex-1"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  {updateCreativeStatus.isPending ? 'Reprovando...' : 'Reprovar'}
                </Button>
              </div>
            </div>
          )}

          {/* Botão de fechar */}
          <div className="border-t pt-4">
            <Button onClick={onClose} className="w-full">
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
