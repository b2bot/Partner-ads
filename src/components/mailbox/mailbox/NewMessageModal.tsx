
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Send, Paperclip, X } from 'lucide-react';
import { useSendMessage } from '@/hooks/mailbox/useMailboxMessages';
import { SendMessageRequest } from '@/types/mailbox';

interface NewMessageModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTo?: string;
  defaultSubject?: string;
}

export const NewMessageModal = ({ 
  open, 
  onOpenChange, 
  defaultTo = '',
  defaultSubject = ''
}: NewMessageModalProps) => {
  const [formData, setFormData] = useState({
    from_email: '',
    from_name: '',
    to_email: defaultTo,
    to_name: '',
    cc_emails: [] as string[],
    subject: defaultSubject,
    body: '',
    is_html: true
  });

  const [ccVisible, setCcVisible] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);

  const sendMutation = useSendMessage();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSend = async () => {
    const request: SendMessageRequest = {
      ...formData,
      attachments
    };

    try {
      await sendMutation.mutateAsync(request);
      onOpenChange(false);
      // Reset form
      setFormData({
        from_email: '',
        from_name: '',
        to_email: '',
        to_name: '',
        cc_emails: [],
        subject: '',
        body: '',
        is_html: true
      });
      setAttachments([]);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Nova Mensagem</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* De */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="from_email">Seu Email</Label>
              <Input
                id="from_email"
                type="email"
                value={formData.from_email}
                onChange={(e) => handleInputChange('from_email', e.target.value)}
                placeholder="seu@email.com"
              />
            </div>
            <div>
              <Label htmlFor="from_name">Seu Nome</Label>
              <Input
                id="from_name"
                value={formData.from_name}
                onChange={(e) => handleInputChange('from_name', e.target.value)}
                placeholder="Seu Nome"
              />
            </div>
          </div>

          {/* Para */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="to_email">Para (Email)</Label>
              <Input
                id="to_email"
                type="email"
                value={formData.to_email}
                onChange={(e) => handleInputChange('to_email', e.target.value)}
                placeholder="destinatario@email.com"
              />
            </div>
            <div>
              <Label htmlFor="to_name">Para (Nome)</Label>
              <Input
                id="to_name"
                value={formData.to_name}
                onChange={(e) => handleInputChange('to_name', e.target.value)}
                placeholder="Nome do Destinatário"
              />
            </div>
          </div>

          {/* CC */}
          {!ccVisible && (
            <Button 
              type="button" 
              variant="link" 
              className="p-0 h-auto text-sm"
              onClick={() => setCcVisible(true)}
            >
              Adicionar CC
            </Button>
          )}

          {ccVisible && (
            <div>
              <Label htmlFor="cc_emails">CC (separar emails por vírgula)</Label>
              <Input
                id="cc_emails"
                value={formData.cc_emails.join(', ')}
                onChange={(e) => handleInputChange('cc_emails', e.target.value)}
                placeholder="email1@exemplo.com, email2@exemplo.com"
              />
            </div>
          )}

          {/* Assunto */}
          <div>
            <Label htmlFor="subject">Assunto</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              placeholder="Assunto da mensagem"
            />
          </div>

          {/* Corpo da mensagem */}
          <div>
            <Label htmlFor="body">Mensagem</Label>
            <Textarea
              id="body"
              value={formData.body}
              onChange={(e) => handleInputChange('body', e.target.value)}
              placeholder="Digite sua mensagem..."
              rows={10}
              className="resize-none"
            />
          </div>

          {/* Anexos */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Label>Anexos</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <Paperclip className="h-4 w-4 mr-2" />
                Adicionar Arquivo
              </Button>
              <input
                id="file-upload"
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {attachments.length > 0 && (
              <div className="space-y-2">
                {attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm">{file.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAttachment(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Botões */}
          <div className="flex justify-end gap-2 pt-4">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSend}
              disabled={sendMutation.isPending || !formData.to_email || !formData.from_email}
              className="premium-button"
            >
              {sendMutation.isPending ? (
                'Enviando...'
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Enviar
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
