
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Send } from 'lucide-react';

interface NewMessageModalProps {
  open: boolean;
  onClose: () => void;
}

export function NewMessageModal({ open, onClose }: NewMessageModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    message: '',
    messageType: 'text' as 'text' | 'template',
    templateName: '',
  });
  const { toast } = useToast();

  const handleSend = async () => {
    if (!formData.phoneNumber || !formData.message) {
      toast({
        title: "Erro",
        description: "Número e mensagem são obrigatórios",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('whatsapp_messages')
        .insert({
          phone_number: formData.phoneNumber,
          message_type: formData.messageType,
          message_content: formData.message,
          template_name: formData.messageType === 'template' ? formData.templateName : null,
          status: 'pending',
        });

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Mensagem enviada com sucesso",
      });

      setFormData({
        phoneNumber: '',
        message: '',
        messageType: 'text',
        templateName: '',
      });
      onClose();
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Erro",
        description: "Erro ao enviar mensagem",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nova Mensagem WhatsApp</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Número do WhatsApp</Label>
            <Input
              id="phone"
              placeholder="+55 (11) 99999-9999"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Tipo de Mensagem</Label>
            <Select 
              value={formData.messageType} 
              onValueChange={(value: 'text' | 'template') => setFormData({ ...formData, messageType: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Texto Livre</SelectItem>
                <SelectItem value="template">Template</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.messageType === 'template' && (
            <div className="space-y-2">
              <Label htmlFor="template">Nome do Template</Label>
              <Input
                id="template"
                placeholder="nome_do_template"
                value={formData.templateName}
                onChange={(e) => setFormData({ ...formData, templateName: e.target.value })}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="message">Mensagem</Label>
            <Textarea
              id="message"
              placeholder="Digite sua mensagem..."
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSend} disabled={loading}>
              <Send className="w-4 h-4 mr-2" />
              {loading ? 'Enviando...' : 'Enviar'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
