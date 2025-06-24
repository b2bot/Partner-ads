import { useState } from 'react';
import type { NextApiRequest, NextApiResponse } from 'next';
import { useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { usePermissions, PermissionType } from '@/hooks/usePermissions';
import { PERMISSION_LABELS, PERMISSION_GROUPS } from './permissions/PermissionLabels';
import { useCreateCollaborator } from '@/hooks/useCreateCollaborator';
import { supabase } from '@/integrations/supabase/client';
import { supabaseAdmin } from '@/integrations/supabase/supabaseAdmin';

interface CreateCollaboratorModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreateCollaboratorModal({ open, onClose }: CreateCollaboratorModalProps) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [fotoUrl, setFotoUrl] = useState('');
  const [status, setStatus] = useState('ativo');
  const [selectedPermissions, setSelectedPermissions] = useState<PermissionType[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [error, setError] = useState('');

  const { permissionTemplates } = usePermissions();
  const queryClient = useQueryClient();
  const createCollaboratorMutation = useCreateCollaborator();

  const resetForm = () => {
    setNome('');
    setEmail('');
    setSenha('');
    setFotoUrl('');
    setStatus('ativo');
    setSelectedPermissions([]);
    setSelectedTemplate('');
    setError('');
  };

  const handlePermissionChange = (permission: PermissionType, checked: boolean) => {
    if (checked) {
      setSelectedPermissions((prev) => [...prev, permission]);
    } else {
      setSelectedPermissions((prev) => prev.filter((p) => p !== permission));
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = permissionTemplates?.find((t) => t.id === templateId);
    if (template) {
      setSelectedPermissions(template.permissions);
      setSelectedTemplate(templateId);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!nome.trim() || !email.trim() || !senha.trim()) {
      setError('Nome, email e senha são obrigatórios.');
      return;
    }

    if (senha.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    createCollaboratorMutation.mutate(
      {
        nome: nome.trim(),
        email: email.trim(),
        password: senha,
        foto_url: fotoUrl.trim() || undefined,
        role: 'colaborador',
        status,
      },
      {
        onSuccess: async (result) => {
          const userId = result?.userId;
          if (!userId) {
            toast.error('Usuário criado, mas ID não retornado');
            return;
          }

          // Inserir permissões
          const inserts = selectedPermissions.map((perm) => ({
            user_id: userId,
            permission: perm,
          }));

          if (inserts.length > 0) {
            const { error: permError } = await supabase
              .from('user_permissions')
              .insert(inserts);

            if (permError) {
              console.error('Erro ao salvar permissões:', permError);
              toast.error('Erro ao salvar permissões');
            }
          }

          queryClient.invalidateQueries({ queryKey: ['collaborators'] });
          toast.success('Colaborador criado com sucesso!');
          onClose();
          resetForm();
        },
        onError: (error: any) => {
          console.error('Erro ao criar colaborador:', error);
          const errorMessage =
            error.message || 'Erro ao criar colaborador. Verifique os dados e tente novamente.';
          setError(errorMessage);
          toast.error(errorMessage);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Novo Colaborador</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[80vh] pr-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome completo *</Label>
                <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="senha">Senha *</Label>
                <Input
                  id="senha"
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  minLength={6}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="inativo">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="foto">URL da Foto</Label>
              <Input
                id="foto"
                value={fotoUrl}
                onChange={(e) => setFotoUrl(e.target.value)}
                placeholder="https://exemplo.com/foto.jpg"
              />
            </div>

            {permissionTemplates && permissionTemplates.length > 0 && (
              <div className="space-y-2">
                <Label>Template de Permissões</Label>
                <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um template (opcional)" />
                  </SelectTrigger>
                  <SelectContent>
                    {permissionTemplates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Permissões Personalizadas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(PERMISSION_GROUPS).map(([groupName, permissions]) => (
                  <div key={groupName} className="space-y-2">
                    <h4 className="font-medium text-sm">{groupName}</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {permissions.map((permission) => (
                        <div key={permission} className="flex items-center space-x-2">
                          <Checkbox
                            id={permission}
                            checked={selectedPermissions.includes(permission as PermissionType)}
                            onCheckedChange={(checked) =>
                              handlePermissionChange(permission as PermissionType, checked as boolean)
                            }
                          />
                          <Label htmlFor={permission} className="text-sm">
                            {PERMISSION_LABELS[permission as PermissionType]}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancelar
              </Button>
              <Button type="submit" disabled={createCollaboratorMutation.isPending} className="flex-1">
                {createCollaboratorMutation.isPending ? 'Criando...' : 'Criar Colaborador'}
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
