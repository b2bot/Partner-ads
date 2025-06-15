
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Send } from 'lucide-react';
import { TemplateSelector } from './TemplateSelector';
import { WhatsAppTemplate } from '@/hooks/useWhatsAppTemplates';

interface NewMessageModalProps {
  open: boolean;
  onClose: () => void;
}

export function NewMessageModal({ open, onClose }: NewMessageModalProps) {
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<WhatsAppTemplate | null>(null);
  const [templateVariables, setTemplateVariables] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const handleTemplateSelect = (template: WhatsAppTemplate | null, variables: Record<string, string>) => {
    setSelectedTemplate(template);
    setTemplateVariables(variables);
  };

  const handleSend = async () => {
    if (!phoneNumber || !selectedTemplate) {
      toast({
        title: "Erro",
        description: "Número e template são obrigatórios",
        variant: "destructive",
      });
      return;
    }

    // Verificar se todas as variáveis foram preenchidas
    const missingVariables = selectedTemplate.variables.filter(
      variable => !templateVariables[variable]?.trim()
    );

    if (missingVariables.length > 0) {
      toast({
        title: "Erro",
        description: `Preencha todos os campos: ${missingVariables.join(', ')}`,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('whatsapp_messages')
        .insert({
          phone_number: phoneNumber,
          message_type: 'template',
          template_name: selectedTemplate.name,
          template_variables: templateVariables,
          status: 'pending',
        });

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Mensagem agendada para envio",
      });

      setPhoneNumber('');
      setSelectedTemplate(null);
      setTemplateVariables({});
      onClose();
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Erro",
        description: "Erro ao agendar mensagem",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nova Mensagem WhatsApp</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Número do WhatsApp</Label>
            <Input
              id="phone"
              placeholder="+55 (11) 99999-9999"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <TemplateSelector
            onTemplateSelect={handleTemplateSelect}
            selectedTemplate={selectedTemplate?.name}
            initialVariables={templateVariables}
          />

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSend} disabled={loading || !selectedTemplate}>
              <Send className="w-4 h-4 mr-2" />
              {loading ? 'Enviando...' : 'Enviar'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
