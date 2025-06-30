
import { apiClient, setAuthToken } from '@/integrations/apiClient';

export function useAuthActions() {
  const signIn = async (email: string, password: string) => {
    try {
      const data = await apiClient.post<{ token: string; user: any }>('/api/login.php', {
        email,
        password,
      });
      setAuthToken(data.token);
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error };
    }
  };

  const signUp = async (
    email: string,
    password: string,
    nome: string,
    role: 'admin' | 'cliente' = 'cliente'
  ) => {
    try {
      const data = await apiClient.post<{ token: string; user: any }>('/api/register.php', {
        email,
        password,
        nome,
        role,
      });
      setAuthToken(data.token);
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error };
    }
  };

  const signOut = async () => {
    try {
      await apiClient.post('/api/logout.php');
    } finally {
      setAuthToken(null);
    }
    return { error: null };
  };

  return {
    signIn,
    signUp,
    signOut,
  };
}
