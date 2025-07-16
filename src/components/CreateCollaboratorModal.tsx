
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';

interface CreateCollaboratorModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function CreateCollaboratorModal({ open, onClose, onSuccess }: CreateCollaboratorModalProps) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const resetForm = () => {
    setNome('');
    setEmail('');
    setSenha('');
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
      console.log('Criando colaborador via signUp...', email);

      const { data, error } = await supabase.auth.signUp({
        email,
        password: senha,
        options: {
          data: {
            nome: nome.trim(),
            role: 'admin'
          },
          emailRedirectTo: `${window.location.origin}/`
        }
      });

      if (error) {
        console.error('Erro no signUp:', error);
        throw new Error(error.message);
      }

      if (!data.user) {
        throw new Error('Usuário não foi criado');
      }

      console.log('Colaborador criado com sucesso! A trigger do banco irá configurar automaticamente.', data.user.id);

      toast.success('Colaborador criado com sucesso!');
      onSuccess?.();
      onClose();
      resetForm();

    } catch (error: any) {
      console.error('Erro ao criar colaborador:', error);
      const errorMessage = error.message || 'Erro ao criar colaborador. Verifique os dados e tente novamente.';
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
          <DialogTitle>Novo Colaborador</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome completo *</Label>
            <Input
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome do colaborador"
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
              {isCreating ? 'Criando...' : 'Criar Colaborador'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
