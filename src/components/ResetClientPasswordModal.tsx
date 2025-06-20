
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { toast } from 'sonner';

interface Cliente {
  id: string;
  user_id: string;
  nome: string;
  email?: string;
  profiles: {
    email: string;
    role: string;
  };
}

interface ResetClientPasswordModalProps {
  client: Cliente;
  open: boolean;
  onClose: () => void;
}

export function ResetClientPasswordModal({ client, open, onClose }: ResetClientPasswordModalProps) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const queryClient = useQueryClient();

  const resetPasswordMutation = useMutation({
    mutationFn: async ({ userId, password }: { userId: string; password: string }) => {
      console.log('Initiating password reset for user:', userId);
      
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        throw new Error('Usuário não autenticado');
      }

      const { data, error } = await supabase.functions.invoke('reset-client-password', {
        body: {
          userId: userId,
          newPassword: password,
        },
        headers: {
          Authorization: `Bearer ${session.session.access_token}`,
        },
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'Erro ao chamar função de reset');
      }

      if (!data || !data.success) {
        console.error('Function returned error:', data);
        throw new Error(data?.error || 'Erro desconhecido ao redefinir senha');
      }

      return data;
    },
    onSuccess: () => {
      console.log('Password reset successful');
      toast.success('Senha do cliente atualizada com sucesso!');
      setNewPassword('');
      setConfirmPassword('');
      setError('');
      setSuccess('Senha atualizada com sucesso!');
      setTimeout(() => {
        onClose();
        setSuccess('');
      }, 2000);
    },
    onError: (error: any) => {
      console.error('Password reset failed:', error);
      let errorMessage = 'Erro ao redefinir senha. Tente novamente.';
      
      if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    console.log('Submitting password reset for client:', client.nome);
    resetPasswordMutation.mutate({ 
      userId: client.user_id, 
      password: newPassword 
    });
  };

  const handleClose = () => {
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setSuccess('');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Redefinir Senha do Cliente</DialogTitle>
          <p className="text-sm text-gray-600">
            Definir nova senha para <strong>{client.nome}</strong>
            <br />
            <span className="text-xs text-gray-500">
              {client.profiles?.email || client.email}
            </span>
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="newPassword">Nova senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                id="newPassword"
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-10 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar nova senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-10 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-200 bg-green-50 text-green-800">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={resetPasswordMutation.isPending}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={resetPasswordMutation.isPending}
            >
              {resetPasswordMutation.isPending ? 'Atualizando...' : 'Atualizar Senha'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
