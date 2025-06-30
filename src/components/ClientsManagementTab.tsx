import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/integrations/apiClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, Edit, Trash2, Users, Search, Key, Shield } from 'lucide-react';
import { CreateClientModal } from '@/components/CreateClientModal';
import { EditClientModal } from '@/components/EditClientModal';
import { ResetClientPasswordModal } from '@/components/ResetClientPasswordModal';
import { ClientPermissionsManager } from '@/components/ClientPermissionsManager';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Cliente {
  id: string;
  user_id: string;
  nome: string;
  email?: string;
  telefone?: string;
  empresa?: string;
  observacoes_internas?: string;
  tipo_acesso: 'api' | 'sheet';
  ativo: boolean;
  created_at: string;
  profiles: {
    email: string;
    role: string;
  };
  contas: {
    id: string;
    tipo: 'meta' | 'google';
    identificador: string;
    nome: string;
  }[];
}

export function ClientsManagementTab() {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Cliente | null>(null);
  const [resetPasswordClient, setResetPasswordClient] = useState<Cliente | null>(null);
  const [permissionsClient, setPermissionsClient] = useState<Cliente | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();

  const { data: clientes, isLoading } = useQuery({
    queryKey: ['clients-management'],
    queryFn: async () => {
      const { data, error } = await apiClient
        .from('clientes')
        .select(`
          *,
          profiles:user_id (email, role),
          contas (id, tipo, identificador, nome)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return (data || []).map((item: any) => ({
        ...item,
        profiles: item.profiles && typeof item.profiles === 'object' && !Array.isArray(item.profiles)
          ? item.profiles
          : { email: '', role: '' },
      })) as Cliente[];
    },
  });

  const deleteClientMutation = useMutation({
    mutationFn: async (clientId: string) => {
      const { error } = await apiClient.from('clientes').delete().eq('id', clientId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients-management'] });
      toast.success('Cliente removido com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao remover cliente:', error);
      toast.error('Erro ao remover cliente. Tente novamente.');
    },
  });

  const toggleClientStatus = useMutation({
    mutationFn: async ({ clientId, ativo }: { clientId: string; ativo: boolean }) => {
      const { error } = await apiClient.from('clientes').update({ ativo }).eq('id', clientId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients-management'] });
      toast.success('Status do cliente atualizado!');
    },
    onError: (error) => {
      console.error('Erro ao atualizar status:', error);
      toast.error('Erro ao atualizar status. Tente novamente.');
    },
  });

  const handleDeleteClient = (clientId: string) => {
    if (confirm('Tem certeza que deseja remover este cliente? Esta ação não pode ser desfeita.')) {
      deleteClientMutation.mutate(clientId);
    }
  };
  
  const filteredClientes = clientes?.filter(cliente =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.profiles?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.empresa?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.telefone?.includes(searchTerm)
  ) || [];

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-5 bg-gray-200 rounded w-1/4 mb-3"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-800 dark:text-slate-200"></h1>
          <p className="text-sm mt-2">
            Cadastre e gerencie clientes, suas contas e permissões
          </p>
        </div>
        <Button onClick={() => setCreateModalOpen(true)} size="sm" className="h-8 text-xs px-3">
          <Plus className="h-4 w-4 mr-1" />
          Novo Cliente
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar clientes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-9 text-sm"
          />
        </div>
      </div>

      {!clientes || clientes.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              Nenhum cliente cadastrado
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Comece criando seu primeiro cliente e configurando suas contas.
            </p>
            <Button onClick={() => setCreateModalOpen(true)} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Criar Primeiro Cliente
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Lista de Clientes</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Nome do Contato</TableHead>
                    <TableHead>Empresa</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Contas</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClientes.map((cliente) => (
                    <TableRow key={cliente.id}>
                      <TableCell className="font-medium">
                        {cliente.nome}
                      </TableCell>
                      <TableCell>
                        {cliente.empresa || '-'}
                      </TableCell>
                      <TableCell>
                        {cliente.profiles?.email || cliente.email || '-'}
                      </TableCell>
                      <TableCell>
                        {cliente.telefone || '-'}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {cliente.tipo_acesso === 'api' ? 'API' : 'Google Sheets'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={cliente.ativo ? 'default' : 'secondary'}
                          className={`text-xs ${cliente.ativo ? 'bg-green-100 text-green-800' : ''}`}
                        >
                          {cliente.ativo ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {cliente.contas?.map((conta) => (
                            <Badge key={conta.id} variant="outline" className="text-xs">
                              {conta.tipo.toUpperCase()}: {conta.nome}
                            </Badge>
                          )) || (
                            <span className="text-xs text-gray-500">Nenhuma</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setPermissionsClient(cliente)}
                            className="h-8 w-8 p-0"
                            title="Gerenciar permissões"
                          >
                            <Shield className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingClient(cliente)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setResetPasswordClient(cliente)}
                            className="h-8 w-8 p-0"
                            title="Redefinir senha"
                          >
                            <Key className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              toggleClientStatus.mutate({
                                clientId: cliente.id,
                                ativo: !cliente.ativo,
                              })
                            }
                            className="h-8 px-2 text-xs"
                          >
                            {cliente.ativo ? 'Desativar' : 'Ativar'}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteClient(cliente.id)}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {createModalOpen && (
        <CreateClientModal open={createModalOpen} onClose={() => setCreateModalOpen(false)} />
      )}

      {editingClient && (
        <EditClientModal
          client={editingClient}
          open={!!editingClient}
          onClose={() => setEditingClient(null)}
        />
      )}

      {resetPasswordClient && (
        <ResetClientPasswordModal
          client={resetPasswordClient}
          open={!!resetPasswordClient}
          onClose={() => setResetPasswordClient(null)}
        />
      )}

      {permissionsClient && (
        <ClientPermissionsManager
          client={permissionsClient}
          open={!!permissionsClient}
          onClose={() => setPermissionsClient(null)}
        />
      )}
    </div>
  );
}
