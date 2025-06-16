
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus, Edit, Trash2, Shield } from 'lucide-react';
import { CreateCollaboratorModal } from './CreateCollaboratorModal';
import { EditCollaboratorModal } from './EditCollaboratorModal';
import { usePermissions } from '@/hooks/usePermissions';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

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

export function CollaboratorsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCollaborator, setEditingCollaborator] = useState<Collaborator | null>(null);
  
  const { hasPermission } = usePermissions();
  const { profile } = useAuth();
  const queryClient = useQueryClient();

  // Verificar se tem permissão para acessar
  if (!hasPermission('manage_collaborators') && !profile?.is_root_admin) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Shield className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">Acesso Negado</h3>
          <p className="text-slate-500 dark:text-slate-400">Você não tem permissão para gerenciar colaboradores.</p>
        </div>
      </div>
    );
  }

  // Buscar colaboradores (excluindo root admin)
  const { data: collaborators, isLoading } = useQuery({
    queryKey: ['collaborators'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('is_root_admin', false)
        .order('nome');
      
      if (error) throw error;
      return data as Collaborator[];
    },
  });

  // Mutation para desativar colaborador
  const deactivateCollaboratorMutation = useMutation({
    mutationFn: async (collaboratorId: string) => {
      const { error } = await supabase
        .from('profiles')
        .update({ status: 'inativo' })
        .eq('id', collaboratorId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collaborators'] });
      toast.success('Colaborador desativado com sucesso');
    },
    onError: (error) => {
      console.error('Erro ao desativar colaborador:', error);
      toast.error('Erro ao desativar colaborador');
    },
  });

  // Filtrar colaboradores
  const filteredCollaborators = collaborators?.filter(collaborator =>
    collaborator.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    collaborator.email.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Gerenciar Colaboradores</h2>
          <p className="text-slate-600 dark:text-slate-400">Gerencie acessos e permissões dos colaboradores</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Novo Colaborador
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <Input
          placeholder="Buscar colaboradores..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Colaborador</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCollaborators.map((collaborator) => (
              <TableRow key={collaborator.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={collaborator.foto_url} />
                      <AvatarFallback>
                        {collaborator.nome.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{collaborator.nome}</span>
                  </div>
                </TableCell>
                <TableCell>{collaborator.email}</TableCell>
                <TableCell>
                  <Badge 
                    variant={collaborator.status === 'ativo' ? 'default' : 'secondary'}
                    className={collaborator.status === 'ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                  >
                    {collaborator.status === 'ativo' ? 'Ativo' : 'Inativo'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {collaborator.role === 'admin' ? 'Administrador' : 'Colaborador'}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(collaborator.created_at).toLocaleDateString('pt-BR')}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingCollaborator(collaborator)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    {collaborator.status === 'ativo' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deactivateCollaboratorMutation.mutate(collaborator.id)}
                        disabled={deactivateCollaboratorMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {showCreateModal && (
        <CreateCollaboratorModal
          open={showCreateModal}
          onClose={() => setShowCreateModal(false)}
        />
      )}

      {editingCollaborator && (
        <EditCollaboratorModal
          collaborator={editingCollaborator}
          open={!!editingCollaborator}
          onClose={() => setEditingCollaborator(null)}
        />
      )}
    </div>
  );
}
