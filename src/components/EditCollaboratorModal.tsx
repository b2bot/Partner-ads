
import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
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

interface Collaborator {
  id: string;
  nome: string;
  email: string;
  foto_url?: string;
  status: string;
  role: string;
  created_at: string;
  is_root_admin: boolean;
}

interface EditCollaboratorModalProps {
  collaborator: Collaborator;
  open: boolean;
  onClose: () => void;
}

export function EditCollaboratorModal({ collaborator, open, onClose }: EditCollaboratorModalProps) {
  const [nome, setNome] = useState(collaborator.nome);
  const [email, setEmail] = useState(collaborator.email);
  const [fotoUrl, setFotoUrl] = useState(collaborator.foto_url || '');
  const [status, setStatus] = useState(collaborator.status);
  const [selectedPermissions, setSelectedPermissions] = useState<PermissionType[]>([]);
  const [error, setError] = useState('');

  const { grantPermission, revokePermission } = usePermissions();
  const queryClient = useQueryClient();

  // Buscar permissões atuais do colaborador
  const { data: currentPermissions } = useQuery({
    queryKey: ['collaborator-permissions', collaborator.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_permissions')
        .select('permission')
        .eq('user_id', collaborator.id);
      
      if (error) throw error;
      return data.map(p => p.permission as PermissionType);
    },
    enabled: open,
  });

  useEffect(() => {
    if (currentPermissions) {
      setSelectedPermissions(currentPermissions);
    }
  }, [currentPermissions]);

  const updateCollaboratorMutation = useMutation({
    mutationFn: async (data: {
      nome: string;
      email: string;
      foto_url?: string;
      status: string;
      permissions: PermissionType[];
    }) => {
      // Atualizar dados básicos
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          nome: data.nome,
          email: data.email,
          foto_url: data.foto_url,
          status: data.status,
          ativo: data.status === 'ativo',
        })
        .eq('id', collaborator.id);

      if (profileError) throw profileError;

      // Comparar permissões atuais com as selecionadas
      const currentPerms = currentPermissions || [];
      const newPerms = data.permissions;

      // Permissões a serem removidas
      const toRemove = currentPerms.filter(p => !newPerms.includes(p));
      
      // Permissões a serem adicionadas
      const toAdd = newPerms.filter(p => !currentPerms.includes(p));

      // Remover permissões
      for (const permission of toRemove) {
        try {
          const { error } = await supabase
            .from('user_permissions')
            .delete()
            .eq('user_id', collaborator.id)
            .eq('permission', permission as any);

          if (error) {
            console.error('Erro ao remover permissão:', permission, error);
          }
        } catch (err) {
          console.error('Erro na remoção de permissão:', permission, err);
        }
      }

      // Adicionar permissões
      for (const permission of toAdd) {
        try {
          const { error } = await supabase
            .from('user_permissions')
            .insert({
              user_id: collaborator.id,
              permission: permission as any,
            });

          if (error) {
            console.error('Erro ao adicionar permissão:', permission, error);
          }
        } catch (err) {
          console.error('Erro na adição de permissão:', permission, err);
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collaborators'] });
      queryClient.invalidateQueries({ queryKey: ['collaborator-permissions'] });
      toast.success('Colaborador atualizado com sucesso!');
      onClose();
    },
    onError: (error: any) => {
      console.error('Erro ao atualizar colaborador:', error);
      const errorMessage = error.message || 'Erro ao atualizar colaborador.';
      setError(errorMessage);
      toast.error(errorMessage);
    },
  });

  const handlePermissionChange = (permission: PermissionType, checked: boolean) => {
    if (checked) {
      setSelectedPermissions(prev => [...prev, permission]);
    } else {
      setSelectedPermissions(prev => prev.filter(p => p !== permission));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!nome.trim() || !email.trim()) {
      setError('Nome e email são obrigatórios.');
      return;
    }

    updateCollaboratorMutation.mutate({
      nome: nome.trim(),
      email: email.trim(),
      foto_url: fotoUrl.trim() || undefined,
      status,
      permissions: selectedPermissions,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Editar Colaborador</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[80vh] pr-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome completo *</Label>
                <Input
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Nome do colaborador"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@exemplo.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="foto">URL da Foto</Label>
                <Input
                  id="foto"
                  value={fotoUrl}
                  onChange={(e) => setFotoUrl(e.target.value)}
                  placeholder="https://exemplo.com/foto.jpg"
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

            <Card>
              <CardHeader>
                <CardTitle>Permissões</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(PERMISSION_GROUPS).map(([groupName, permissions]) => (
                  <div key={groupName} className="space-y-2">
                    <h4 className="font-medium text-sm text-slate-900 dark:text-slate-100">{groupName}</h4>
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
                          <Label 
                            htmlFor={permission} 
                            className={`text-sm ${
                              PERMISSION_LABELS[permission as PermissionType]?.startsWith('⚠️') 
                                ? 'text-amber-600 dark:text-amber-400 font-medium' 
                                : ''
                            }`}
                          >
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
              <Button 
                type="submit" 
                disabled={updateCollaboratorMutation.isPending}
                className="flex-1"
              >
                {updateCollaboratorMutation.isPending ? 'Salvando...' : 'Salvar Alterações'}
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
