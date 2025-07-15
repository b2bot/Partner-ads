
import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/integrations/apiClient';
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
import { Collaborator } from '@/types/collaborator';

interface EditCollaboratorModalProps {
  collaborator: Collaborator;
  open: boolean;
  onClose: () => void;
}

export function EditCollaboratorModal({ collaborator, open, onClose }: EditCollaboratorModalProps) {
  const [nome, setNome] = useState(collaborator.nome);
  const [email, setEmail] = useState(collaborator.email);
  const [fotoUrl, setFotoUrl] = useState(collaborator.foto_url || '');
  const [ativo, setAtivo] = useState(collaborator.ativo);
  const [selectedPermissions, setSelectedPermissions] = useState<PermissionType[]>([]);
  const [error, setError] = useState('');

  const { grantPermission, revokePermission } = usePermissions();
  const queryClient = useQueryClient();

  // Buscar permissões atuais do colaborador
  const { data: currentPermissions, isLoading: isLoadingPermissions } = useQuery({
    queryKey: ['collaborator-permissions', collaborator.user_id],
    queryFn: async () => {
      const { data, error } = await apiClient
        .from('user_permissions')
        .select('permission')
        .eq('user_id', collaborator.user_id);
      
      if (error) throw error;
      return data.map(p => p.permission as PermissionType);
    },
    enabled: open && !!collaborator.user_id,
  });

  useEffect(() => {
    if (open) {
      // Reset form data when modal opens
      setNome(collaborator.nome);
      setEmail(collaborator.email);
      setFotoUrl(collaborator.foto_url || '');
      setAtivo(collaborator.ativo);
      setError('');
      setSelectedPermissions([]);
    }
  }, [open, collaborator]);

  useEffect(() => {
    if (currentPermissions && open) {
      setSelectedPermissions(currentPermissions);
    }
  }, [currentPermissions, open]);

  const updateCollaboratorMutation = useMutation({
    mutationFn: async (data: {
      nome: string;
      email: string;
      foto_url?: string;
      ativo: boolean;
      permissions: PermissionType[];
    }) => {
      // Atualizar dados básicos do colaborador
      const { error: colaboradorError } = await apiClient
        .from('colaboradores')
        .update({
          nome: data.nome,
          email: data.email,
          foto_url: data.foto_url,
          ativo: data.ativo,
        })
        .eq('id', collaborator.id);

      if (colaboradorError) {
        console.error('Erro ao atualizar colaborador:', colaboradorError);
        throw new Error(`Erro ao atualizar dados do colaborador: ${colaboradorError.message}`);
      }

      // Gerenciar permissões
      const currentPerms = currentPermissions || [];
      const newPerms = data.permissions;

      // Permissões a serem removidas
      const toRemove = currentPerms.filter(p => !newPerms.includes(p));
      
      // Permissões a serem adicionadas
      const toAdd = newPerms.filter(p => !currentPerms.includes(p));

      // Remover permissões
      if (toRemove.length > 0) {
        const { error: removeError } = await apiClient
          .from('user_permissions')
          .delete()
          .eq('user_id', collaborator.user_id)
          .in('permission', toRemove);

        if (removeError) {
          console.error('Erro ao remover permissões:', removeError);
          throw new Error(`Erro ao remover permissões: ${removeError.message}`);
        }
      }

      // Adicionar permissões
      if (toAdd.length > 0) {
        const permissionsToInsert = toAdd.map(permission => ({
          user_id: collaborator.user_id,
          permission: permission as any,
          granted_by: null, // O sistema gerencia automaticamente
        }));

        const { error: insertError } = await apiClient
          .from('user_permissions')
          .insert(permissionsToInsert);

        if (insertError) {
          console.error('Erro ao adicionar permissões:', insertError);
          throw new Error(`Erro ao adicionar permissões: ${insertError.message}`);
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collaborators'] });
      queryClient.invalidateQueries({ queryKey: ['collaborator-permissions', collaborator.user_id] });
      queryClient.invalidateQueries({ queryKey: ['all-user-permissions'] });
      queryClient.invalidateQueries({ queryKey: ['user-permissions-list'] });
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
      ativo,
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
                <Label htmlFor="ativo">Ativo</Label>
                 <Select value={ativo.toString()} onValueChange={(value) => setAtivo(value === 'true')}>
                   <SelectTrigger>
                     <SelectValue />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="true">Ativo</SelectItem>
                     <SelectItem value="false">Inativo</SelectItem>
                   </SelectContent>
                 </Select>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Permissões</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoadingPermissions ? (
                  <div className="text-center py-4">
                    <p className="text-sm text-slate-600 dark:text-slate-400">Carregando permissões...</p>
                  </div>
                ) : (
                  Object.entries(PERMISSION_GROUPS).map(([groupName, permissions]) => (
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
                              disabled={updateCollaboratorMutation.isPending}
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
                  ))
                )}
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
