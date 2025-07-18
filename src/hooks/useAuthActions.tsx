
import { supabase } from '@/integrations/supabase/client';

export function useAuthActions() {
  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
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
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { 
        data: { nome, role },
        emailRedirectTo: `${window.location.origin}/`
      },
    });
    return { data, error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  return {
    signIn,
    signUp,
    signOut,
  };
}
