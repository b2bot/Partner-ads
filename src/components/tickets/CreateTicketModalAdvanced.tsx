
import { useState } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { useUserAccess } from '@/hooks/useUserAccess';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, File, X, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface CreateTicketModalAdvancedProps {
  open: boolean;
  onClose: () => void;
}

export function CreateTicketModalAdvanced({ open, onClose }: CreateTicketModalAdvancedProps) {
  const [titulo, setTitulo] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [categoria, setCategoria] = useState('outros');
  const [prioridade, setPrioridade] = useState('media');
  const [clienteId, setClienteId] = useState('');
  const [arquivos, setArquivos] = useState<File[]>([]);
  const [error, setError] = useState('');
  
  const { isAdmin, user } = useAuth();
  const { clienteData } = useUserAccess();
  const queryClient = useQueryClient();

  const { data: clientes } = useQuery({
    queryKey: ['clientes-for-ticket'],
    queryFn: async () => {
      if (!isAdmin) return [];
      
      const { data, error } = await supabase
        .from('clientes')
        .select('id, nome')
        .eq('ativo', true)
        .order('nome');
      
      if (error) throw error;
      return data;
    },
    enabled: isAdmin,
  });

  const createTicketMutation = useMutation({
    mutationFn: async (data: { 
      titulo: string; 
      mensagem: string; 
      categoria: string; 
      prioridade: string; 
      cliente_id: string;
      arquivos_urls?: string[];
    }) => {
      const { error } = await supabase
        .from('chamados')
        .insert({
          cliente_id: data.cliente_id,
          titulo: data.titulo,
          mensagem: data.mensagem,
          categoria: data.categoria,
          prioridade: data.prioridade,
          aberto_por: isAdmin ? 'admin' : 'cliente',
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      toast.success('Chamado criado com sucesso!');
      onClose();
      resetForm();
    },
    onError: (error) => {
      console.error('Erro ao criar chamado:', error);
      setError('Erro ao criar chamado. Tente novamente.');
    },
  });

  const resetForm = () => {
    setTitulo('');
    setMensagem('');
    setCategoria('outros');
    setPrioridade('media');
    setClienteId('');
    setArquivos([]);
    setError('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => file.size <= 10 * 1024 * 1024); // 10MB max
    
    if (validFiles.length !== files.length) {
      toast.error('Alguns arquivos foram removidos por excederem 10MB');
    }
    
    setArquivos(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setArquivos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!titulo.trim() || !mensagem.trim()) {
      setError('Título e mensagem são obrigatórios.');
      return;
    }

    let finalClienteId = '';
    if (isAdmin) {
      if (!clienteId) {
        setError('Selecione um cliente.');
        return;
      }
      finalClienteId = clienteId;
    } else {
      if (!clienteData?.id) {
        setError('Cliente não encontrado. Verifique seu perfil.');
        return;
      }
      finalClienteId = clienteData.id;
    }

    createTicketMutation.mutate({
      titulo: titulo.trim(),
      mensagem: mensagem.trim(),
      categoria,
      prioridade,
      cliente_id: finalClienteId,
    });
  };

  const getPrioridadeBadgeColor = (prio: string) => {
    switch (prio) {
      case 'urgente': return 'bg-red-100 text-red-800';
      case 'alta': return 'bg-orange-100 text-orange-800';
      case 'media': return 'bg-blue-100 text-blue-800';
      case 'baixa': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Novo Chamado de Suporte
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {isAdmin && (
            <div className="space-y-2">
              <Label htmlFor="cliente">Cliente *</Label>
              <Select value={clienteId} onValueChange={setClienteId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clientes?.map((cliente) => (
                    <SelectItem key={cliente.id} value={cliente.id}>
                      {cliente.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="categoria">Categoria</Label>
              <Select value={categoria} onValueChange={setCategoria}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="campanhas">📊 Campanhas</SelectItem>
                  <SelectItem value="hospedagem">🌐 Hospedagem</SelectItem>
                  <SelectItem value="emails">📧 E-mails</SelectItem>
                  <SelectItem value="crm">👥 CRM</SelectItem>
                  <SelectItem value="outros">📋 Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="prioridade">Prioridade</Label>
              <Select value={prioridade} onValueChange={setPrioridade}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baixa">🟢 Baixa</SelectItem>
                  <SelectItem value="media">🟡 Média</SelectItem>
                  <SelectItem value="alta">🟠 Alta</SelectItem>
                  <SelectItem value="urgente">🔴 Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="titulo">Título do chamado *</Label>
            <Input
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Ex: Problema com relatórios de campanha"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mensagem">Descrição detalhada *</Label>
            <Textarea
              id="mensagem"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              placeholder="Descreva o problema ou solicitação em detalhes..."
              rows={5}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Anexos (opcional)</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
                accept="image/*,.pdf,.doc,.docx,.txt,.zip"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600">
                  Clique para selecionar arquivos ou arraste e solte aqui
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Máximo 10MB por arquivo
                </p>
              </label>
            </div>

            {arquivos.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm">Arquivos selecionados:</Label>
                {arquivos.map((arquivo, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center gap-2">
                      <File className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{arquivo.name}</span>
                      <span className="text-xs text-gray-500">
                        ({(arquivo.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={createTicketMutation.isPending}
              className="flex-1"
            >
              {createTicketMutation.isPending ? 'Criando...' : 'Criar Chamado'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
