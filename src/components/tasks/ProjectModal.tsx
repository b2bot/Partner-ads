
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Project } from '@/hooks/useTasks';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (projectData: Partial<Project>) => void;
}

const colorOptions = [
  { value: '#3b82f6', label: 'Azul', color: '#3b82f6' },
  { value: '#ef4444', label: 'Vermelho', color: '#ef4444' },
  { value: '#10b981', label: 'Verde', color: '#10b981' },
  { value: '#f59e0b', label: 'Laranja', color: '#f59e0b' },
  { value: '#8b5cf6', label: 'Roxo', color: '#8b5cf6' },
  { value: '#06b6d4', label: 'Ciano', color: '#06b6d4' },
  { value: '#84cc16', label: 'Lima', color: '#84cc16' },
  { value: '#f97316', label: 'Amber', color: '#f97316' },
];

export function ProjectModal({ isOpen, onClose, onSave }: ProjectModalProps) {
  const [formData, setFormData] = useState<Partial<Project>>({
    nome: '',
    descricao: '',
    cor: '#3b82f6',
  });

  const { data: clients } = useQuery({
    queryKey: ['clients-for-projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clientes')
        .select('id, nome')
        .eq('ativo', true)
        .order('nome');
      
      if (error) throw error;
      return data;
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
    setFormData({
      nome: '',
      descricao: '',
      cor: '#3b82f6',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Novo Projeto</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome do Projeto *</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cliente_id">Cliente</Label>
            <Select 
              value={formData.cliente_id || ''} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, cliente_id: value || undefined }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecionar cliente (opcional)" />
              </SelectTrigger>
              <SelectContent>
                {clients?.map(client => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Cor do Projeto</Label>
            <div className="grid grid-cols-4 gap-2">
              {colorOptions.map(option => (
                <button
                  key={option.value}
                  type="button"
                  className={`w-full h-10 rounded-md border-2 ${
                    formData.cor === option.value ? 'border-gray-900' : 'border-gray-200'
                  }`}
                  style={{ backgroundColor: option.color }}
                  onClick={() => setFormData(prev => ({ ...prev, cor: option.value }))}
                  title={option.label}
                />
              ))}
            </div>
          </div>

          <Separator />

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              Criar Projeto
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
