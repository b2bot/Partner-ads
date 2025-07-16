
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';

interface CreateClientModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function CreateClientModal({ open, onClose, onSuccess }: CreateClientModalProps) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipoAcesso, setTipoAcesso] = useState<'api' | 'sheet'>('api');
  const [error, setError] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const resetForm = () => {
    setNome('');
    setEmail('');
    setSenha('');
    setTipoAcesso('api');
    setError('');
    setIsCreating(false);
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

    setIsCreating(true);

    try {
      console.log('Criando cliente via signUp...', email);

      const { data, error } = await supabase.auth.signUp({
        email,
        password: senha,
        options: {
          data: {
            nome: nome.trim(),
            role: 'cliente'
          }
        }
      });

      if (error) {
        console.error('Erro no signUp:', error);
        throw new Error(error.message);
      }

      if (!data.user) {
        throw new Error('Usuário não foi criado');
      }

      console.log('Cliente criado com sucesso!', data.user.id);
      
      // Aguardar um pouco para a trigger processar
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Atualizar tipo de acesso se necessário
      if (tipoAcesso === 'sheet') {
        const { error: updateError } = await supabase
          .from('clientes')
          .update({ tipo_acesso: tipoAcesso })
          .eq('user_id', data.user.id);

        if (updateError) {
          console.error('Erro ao atualizar tipo de acesso:', updateError);
        }
      }

      toast.success('Cliente criado com sucesso!');
      onSuccess?.();
      onClose();
      resetForm();

    } catch (error: any) {
      console.error('Erro ao criar cliente:', error);
      const errorMessage = error.message || 'Erro ao criar cliente. Verifique os dados e tente novamente.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Novo Cliente</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome completo *</Label>
            <Input
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome do cliente"
              required
              disabled={isCreating}
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
              disabled={isCreating}
            />
          </div>

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
              disabled={isCreating}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tipoAcesso">Tipo de acesso aos dados</Label>
            <Select value={tipoAcesso} onValueChange={(value: 'api' | 'sheet') => setTipoAcesso(value)} disabled={isCreating}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="api">API</SelectItem>
                <SelectItem value="sheet">Google Sheets</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1" disabled={isCreating}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={isCreating}
              className="flex-1"
            >
              {isCreating ? 'Criando...' : 'Criar Cliente'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
