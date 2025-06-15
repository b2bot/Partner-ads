
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { UserPlus } from 'lucide-react';

interface NewContactModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function NewContactModal({ open, onClose, onSuccess }: NewContactModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    tags: '',
  });
  const { toast } = useToast();

  const handleCreate = async () => {
    if (!formData.name || !formData.phoneNumber) {
      toast({
        title: "Erro",
        description: "Nome e número são obrigatórios",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      const { error } = await supabase
        .from('whatsapp_contacts')
        .insert({
          name: formData.name,
          phone_number: formData.phoneNumber,
          tags: tagsArray,
          is_active: true,
        });

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Contato adicionado com sucesso",
      });

      setFormData({
        name: '',
        phoneNumber: '',
        tags: '',
      });
      
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Error creating contact:', error);
      toast({
        title: "Erro",
        description: "Erro ao adicionar contato",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Adicionar Contato</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              placeholder="Ex: João Silva"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

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
            <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
            <Input
              id="tags"
              placeholder="cliente, vip, importante"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleCreate} disabled={loading}>
              <UserPlus className="w-4 h-4 mr-2" />
              {loading ? 'Adicionando...' : 'Adicionar'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
