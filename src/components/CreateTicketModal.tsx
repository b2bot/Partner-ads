
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserAccess } from '@/hooks/useUserAccess';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';

interface CreateTicketModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreateTicketModal({ open, onClose }: CreateTicketModalProps) {
  const [titulo, setTitulo] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [error, setError] = useState('');
  
  const { clienteData } = useUserAccess();
  const queryClient = useQueryClient();

  const createTicketMutation = useMutation({
    mutationFn: async (data: { titulo: string; mensagem: string; arquivo_url?: string }) => {
      if (!clienteData?.id) {
        throw new Error('Cliente não encontrado');
      }

      const { error } = await supabase
        .from('chamados')
        .insert({
          cliente_id: clienteData.id,
          titulo: data.titulo,
          mensagem: data.mensagem,
          arquivo_url: data.arquivo_url,
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
    setArquivo(null);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!titulo.trim() || !mensagem.trim()) {
      setError('Título e mensagem são obrigatórios.');
      return;
    }

    let arquivo_url = undefined;

    // Upload do arquivo se fornecido
    if (arquivo) {
      try {
        const fileExt = arquivo.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('tickets')
          .upload(fileName, arquivo);

        if (uploadError) {
          console.error('Erro no upload:', uploadError);
        } else {
          const { data } = supabase.storage
            .from('tickets')
            .getPublicUrl(fileName);
          arquivo_url = data.publicUrl;
        }
      } catch (error) {
        console.error('Erro ao fazer upload do arquivo:', error);
        setError('Erro ao fazer upload do arquivo. O chamado será criado sem o anexo.');
      }
    }

    createTicketMutation.mutate({
      titulo: titulo.trim(),
      mensagem: mensagem.trim(),
      arquivo_url,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Limite de 5MB
      if (file.size > 5 * 1024 * 1024) {
        setError('Arquivo deve ter no máximo 5MB.');
        return;
      }
      setArquivo(file);
      setError('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Novo Chamado</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="titulo">Título do chamado</Label>
            <Input
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Ex: Problema com relatórios de campanha"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mensagem">Descrição detalhada</Label>
            <Textarea
              id="mensagem"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              placeholder="Descreva o problema ou solicitação em detalhes..."
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="arquivo">Anexar arquivo (opcional)</Label>
            <div className="flex items-center gap-2">
              <Input
                id="arquivo"
                type="file"
                onChange={handleFileChange}
                accept="image/*,.pdf,.doc,.docx,.txt"
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('arquivo')?.click()}
                className="w-full"
              >
                <Upload className="h-4 w-4 mr-2" />
                {arquivo ? arquivo.name : 'Selecionar arquivo'}
              </Button>
            </div>
            <p className="text-xs text-slate-500">
              Formatos aceitos: imagens, PDF, DOC, TXT (máx. 5MB)
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex gap-2 pt-4">
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
