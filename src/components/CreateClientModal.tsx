
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';

interface CreateClientModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreateClientModal({ open, onClose }: CreateClientModalProps) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipoAcesso, setTipoAcesso] = useState<'api' | 'sheet'>('api');
  const [role, setRole] = useState<'admin' | 'cliente'>('cliente');
  const [contasMeta, setContasMeta] = useState<Array<{ identificador: string; nome: string }>>([]);
  const [contasGoogle, setContasGoogle] = useState<Array<{ identificador: string; nome: string }>>([]);
  const [error, setError] = useState('');
  
  const queryClient = useQueryClient();

  const createClientMutation = useMutation({
    mutationFn: async (data: {
      nome: string;
      email: string;
      senha: string;
      tipoAcesso: 'api' | 'sheet';
      role: 'admin' | 'cliente';
      contas: Array<{ tipo: 'meta' | 'google'; identificador: string; nome: string }>;
    }) => {
      // Criar usuário no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.senha,
        options: {
          data: {
            nome: data.nome,
            role: data.role,
          },
        },
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('Usuário não foi criado');

      // Aguardar um pouco para o trigger criar o perfil
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Criar cliente
      const { data: clienteData, error: clienteError } = await supabase
        .from('clientes')
        .insert({
          user_id: authData.user.id,
          nome: data.nome,
          tipo_acesso: data.tipoAcesso,
        })
        .select()
        .single();

      if (clienteError) throw clienteError;

      // Criar contas vinculadas
      if (data.contas.length > 0) {
        const contasToInsert = data.contas.map(conta => ({
          cliente_id: clienteData.id,
          tipo: conta.tipo,
          identificador: conta.identificador,
          nome: conta.nome,
        }));

        const { error: contasError } = await supabase
          .from('contas')
          .insert(contasToInsert);

        if (contasError) throw contasError;
      }

      return clienteData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients-management'] });
      toast.success('Cliente criado com sucesso!');
      onClose();
      resetForm();
    },
    onError: (error) => {
      console.error('Erro ao criar cliente:', error);
      setError('Erro ao criar cliente. Verifique os dados e tente novamente.');
    },
  });

  const resetForm = () => {
    setNome('');
    setEmail('');
    setSenha('');
    setTipoAcesso('api');
    setRole('cliente');
    setContasMeta([]);
    setContasGoogle([]);
    setError('');
  };

  const addMetaAccount = () => {
    setContasMeta([...contasMeta, { identificador: '', nome: '' }]);
  };

  const removeMetaAccount = (index: number) => {
    setContasMeta(contasMeta.filter((_, i) => i !== index));
  };

  const updateMetaAccount = (index: number, field: 'identificador' | 'nome', value: string) => {
    const updated = contasMeta.map((conta, i) => 
      i === index ? { ...conta, [field]: value } : conta
    );
    setContasMeta(updated);
  };

  const addGoogleAccount = () => {
    setContasGoogle([...contasGoogle, { identificador: '', nome: '' }]);
  };

  const removeGoogleAccount = (index: number) => {
    setContasGoogle(contasGoogle.filter((_, i) => i !== index));
  };

  const updateGoogleAccount = (index: number, field: 'identificador' | 'nome', value: string) => {
    const updated = contasGoogle.map((conta, i) => 
      i === index ? { ...conta, [field]: value } : conta
    );
    setContasGoogle(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!nome.trim() || !email.trim() || !senha.trim()) {
      setError('Nome, email e senha são obrigatórios.');
      return;
    }

    const allContas = [
      ...contasMeta.filter(c => c.identificador && c.nome).map(c => ({ ...c, tipo: 'meta' as const })),
      ...contasGoogle.filter(c => c.identificador && c.nome).map(c => ({ ...c, tipo: 'google' as const })),
    ];

    createClientMutation.mutate({
      nome: nome.trim(),
      email: email.trim(),
      senha,
      tipoAcesso,
      role,
      contas: allContas,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Novo Cliente</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome completo</Label>
              <Input
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Nome do cliente"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
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
              <Label htmlFor="senha">Senha</Label>
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
              <Label htmlFor="role">Tipo de usuário</Label>
              <Select value={role} onValueChange={(value: 'admin' | 'cliente') => setRole(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cliente">Cliente</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tipoAcesso">Tipo de acesso aos dados</Label>
            <Select value={tipoAcesso} onValueChange={(value: 'api' | 'sheet') => setTipoAcesso(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="api">API</SelectItem>
                <SelectItem value="sheet">Google Sheets</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Contas Meta */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Contas Meta</Label>
              <Button type="button" variant="outline" size="sm" onClick={addMetaAccount}>
                Adicionar Conta Meta
              </Button>
            </div>
            {contasMeta.map((conta, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder="ID da conta Meta"
                  value={conta.identificador}
                  onChange={(e) => updateMetaAccount(index, 'identificador', e.target.value)}
                />
                <Input
                  placeholder="Nome da conta"
                  value={conta.nome}
                  onChange={(e) => updateMetaAccount(index, 'nome', e.target.value)}
                />
                <Button type="button" variant="outline" size="sm" onClick={() => removeMetaAccount(index)}>
                  Remover
                </Button>
              </div>
            ))}
          </div>

          {/* Contas Google */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Contas Google</Label>
              <Button type="button" variant="outline" size="sm" onClick={addGoogleAccount}>
                Adicionar Conta Google
              </Button>
            </div>
            {contasGoogle.map((conta, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder="ID da conta Google"
                  value={conta.identificador}
                  onChange={(e) => updateGoogleAccount(index, 'identificador', e.target.value)}
                />
                <Input
                  placeholder="Nome da conta"
                  value={conta.nome}
                  onChange={(e) => updateGoogleAccount(index, 'nome', e.target.value)}
                />
                <Button type="button" variant="outline" size="sm" onClick={() => removeGoogleAccount(index)}>
                  Remover
                </Button>
              </div>
            ))}
          </div>

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
              disabled={createClientMutation.isPending}
              className="flex-1"
            >
              {createClientMutation.isPending ? 'Criando...' : 'Criar Cliente'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
