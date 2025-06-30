
import { apiClient } from '@/integrations/apiClient';

export function useAuthActions() {
  const signIn = async (email: string, password: string) => {
    const { data, error } = await apiClient.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  };

  const signUp = async (
    email: string,
    password: string,
    nome: string,
    role: 'admin' | 'cliente' = 'cliente'
  ) => {
    const { data, error } = await apiClient.auth.signUp({
      email,
      password,
      options: {
        data: {
          nome,
          role,
        },
      },
    });
    return { data, error };
  };

  const signOut = async () => {
    const { error } = await apiClient.auth.signOut();
    return { error };
  };

  return {
    signIn,
    signUp,
    signOut,
  };
}
