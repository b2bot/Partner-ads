
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Paperclip, Send, X } from 'lucide-react';
import { toast } from 'sonner';

interface ClientMessageFormProps {
  ticketId: string;
  onSuccess?: () => void;
  className?: string;
}

export function ClientMessageForm({ ticketId, onSuccess, className }: ClientMessageFormProps) {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const queryClient = useQueryClient();

  const sendMessageMutation = useMutation({
    mutationFn: async (data: { conteudo: string; arquivo_url?: string }) => {
      const { error } = await supabase
        .from('chamados_mensagens')
        .insert({
          chamado_id: ticketId,
          conteudo: data.conteudo,
          arquivo_url: data.arquivo_url,
          autor_id: user?.id,
          autor_nome: user?.user_metadata?.nome || user?.email || 'Cliente',
          autor_tipo: 'cliente'
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ticket-timeline', ticketId] });
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      setMessage('');
      setFile(null);
      toast.success('Mensagem enviada com sucesso!');
      onSuccess?.();
    },
    onError: (error) => {
      console.error('Erro ao enviar mensagem:', error);
      setError('Erro ao enviar mensagem. Tente novamente.');
    },
  });

  const uploadFile = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `chamados/${ticketId}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('chamados')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('chamados')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!message.trim()) {
      setError('Por favor, digite uma mensagem.');
      return;
    }

    try {
      let arquivo_url;
      
      if (file) {
        arquivo_url = await uploadFile(file);
      }

      await sendMessageMutation.mutateAsync({
        conteudo: message.trim(),
        arquivo_url
      });
    } catch (error) {
      console.error('Erro:', error);
      setError('Erro ao enviar mensagem. Tente novamente.');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validar tamanho do arquivo (máximo 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('Arquivo muito grande. Máximo 10MB.');
        return;
      }
      setFile(selectedFile);
      setError('');
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  return (
    <div className={`flex flex-col h-full ${className}`}>
      <form onSubmit={handleSubmit} className="flex flex-col h-full space-y-4 p-4">
        <div className="flex-1">
          <Label htmlFor="message" className="text-sm font-medium">
            Sua resposta
          </Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            rows={8}
            className="mt-2 resize-none h-full min-h-[200px]"
            disabled={sendMessageMutation.isPending}
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1">
            <Label htmlFor="file" className="sr-only">
              Anexar arquivo
            </Label>
            <Input
              id="file"
              type="file"
              onChange={handleFileSelect}
              className="hidden"
              disabled={sendMessageMutation.isPending}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => document.getElementById('file')?.click()}
              disabled={sendMessageMutation.isPending}
            >
              <Paperclip className="h-4 w-4 mr-2" />
              Anexar arquivo
            </Button>
          </div>

          <Button
            type="submit"
            disabled={!message.trim() || sendMessageMutation.isPending}
            size="sm"
          >
            <Send className="h-4 w-4 mr-2" />
            {sendMessageMutation.isPending ? 'Enviando...' : 'Enviar'}
          </Button>
        </div>

        {file && (
          <div className="flex items-center justify-between p-2 bg-blue-50 rounded border">
            <span className="text-sm text-gray-700 flex items-center gap-2">
              <Paperclip className="h-4 w-4" />
              {file.name}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={removeFile}
              disabled={sendMessageMutation.isPending}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </form>
    </div>
  );
}
