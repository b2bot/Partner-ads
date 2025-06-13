
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { useUserAccess } from '@/hooks/useUserAccess';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Image, Video, CheckCircle, XCircle, Edit3 } from 'lucide-react';
import { UploadCreativeModal } from '@/components/UploadCreativeModal';
import { CreativeDetailModal } from '@/components/CreativeDetailModal';
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

export function CreativesTab() {
  const { isAdmin } = useAuth();
  const { clienteData } = useUserAccess();
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedCreative, setSelectedCreative] = useState<Creative | null>(null);
  const queryClient = useQueryClient();

  const { data: creatives, isLoading } = useQuery({
    queryKey: ['creatives'],
    queryFn: async () => {
      let query = supabase
        .from('criativos')
        .select(`
          *,
          clientes (nome)
        `)
        .order('created_at', { ascending: false });

      // Se não for admin, filtrar apenas os criativos do cliente
      if (!isAdmin && clienteData?.id) {
        query = query.eq('cliente_id', clienteData.id);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as Creative[];
    },
  });

  const updateCreativeStatus = useMutation({
    mutationFn: async ({ 
      creativeId, 
      status, 
      comentario 
    }: { 
      creativeId: string; 
      status: 'aprovado' | 'reprovado' | 'ajuste_solicitado';
      comentario?: string;
    }) => {
      const { error } = await supabase
        .from('criativos')
        .update({ 
          status,
          comentario_cliente: comentario 
        })
        .eq('id', creativeId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['creatives'] });
      toast.success('Status do criativo atualizado!');
    },
    onError: (error) => {
      console.error('Erro ao atualizar criativo:', error);
      toast.error('Erro ao atualizar criativo. Tente novamente.');
    },
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'aprovado':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'reprovado':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'ajuste_solicitado':
        return <Edit3 className="h-4 w-4 text-yellow-600" />;
      default:
        return <Image className="h-4 w-4 text-gray-600" />;
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

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
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
            {isAdmin ? 'Gerenciar Criativos' : 'Meus Criativos'}
          </h1>
          <p className="text-slate-600 mt-2">
            {isAdmin 
              ? 'Faça upload de criativos para aprovação dos clientes'
              : 'Visualize e aprove criativos enviados pela equipe'
            }
          </p>
        </div>
        {isAdmin && (
          <Button onClick={() => setUploadModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Upload Criativo
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {creatives?.length === 0 ? (
          <div className="col-span-full">
            <Card>
              <CardContent className="p-8 text-center">
                <Image className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {isAdmin ? 'Nenhum criativo enviado' : 'Nenhum criativo disponível'}
                </h3>
                <p className="text-gray-500">
                  {isAdmin 
                    ? 'Comece fazendo upload do primeiro criativo para aprovação.'
                    : 'Aguarde a equipe enviar criativos para sua aprovação.'
                  }
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          creatives?.map((creative) => (
            <Card 
              key={creative.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedCreative(creative)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg line-clamp-1">{creative.titulo}</CardTitle>
                  <Badge className={getStatusColor(creative.status)}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(creative.status)}
                      {getStatusLabel(creative.status)}
                    </div>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* Visualização do arquivo */}
                  <div className="aspect-video bg-gray-100 rounded-md overflow-hidden">
                    {creative.tipo_arquivo.startsWith('image/') ? (
                      <img 
                        src={creative.arquivo_url} 
                        alt={creative.titulo}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <Video className="h-8 w-8 text-gray-600" />
                        <span className="ml-2 text-gray-600">Vídeo</span>
                      </div>
                    )}
                  </div>

                  {creative.descricao && (
                    <p className="text-sm text-gray-600 line-clamp-2">{creative.descricao}</p>
                  )}

                  {isAdmin && (
                    <p className="text-xs text-gray-500">
                      Cliente: {creative.clientes.nome}
                    </p>
                  )}

                  <div className="text-xs text-gray-500">
                    Criado em: {new Date(creative.created_at).toLocaleDateString('pt-BR')}
                  </div>

                  {/* Ações rápidas para cliente */}
                  {!isAdmin && creative.status === 'pendente' && (
                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateCreativeStatus.mutate({
                            creativeId: creative.id,
                            status: 'aprovado'
                          });
                        }}
                        className="flex-1"
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Aprovar
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateCreativeStatus.mutate({
                            creativeId: creative.id,
                            status: 'reprovado'
                          });
                        }}
                        className="flex-1"
                      >
                        <XCircle className="h-3 w-3 mr-1" />
                        Reprovar
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {uploadModalOpen && (
        <UploadCreativeModal
          open={uploadModalOpen}
          onClose={() => setUploadModalOpen(false)}
        />
      )}

      {selectedCreative && (
        <CreativeDetailModal
          creative={selectedCreative}
          open={!!selectedCreative}
          onClose={() => setSelectedCreative(null)}
        />
      )}
    </div>
  );
}
