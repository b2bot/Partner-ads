
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

interface UserProfile {
  id: string;
  nome: string;
  email: string;
  role: 'admin' | 'cliente';
  ativo: boolean;
  is_root_admin?: boolean;
  foto_url?: string;
  status?: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['user-profile', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      console.log('Loading profile for user:', user.id);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) {
        console.error('Error loading profile:', error);
        return null;
      }
      
      console.log('Profile loaded:', data);
      return data as UserProfile;
    },
    enabled: !!user?.id,
  });

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session:', session?.user?.id);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  };

  const signUp = async (email: string, password: string, nome: string, role: 'admin' | 'cliente' = 'cliente') => {
    const { data, error } = await supabase.auth.signUp({
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
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  // Verificação de admin melhorada incluindo root admin
  const isAdmin = profile?.role === 'admin' || profile?.is_root_admin === true;
  const isRootAdmin = profile?.is_root_admin === true;
  const isCliente = profile?.role === 'cliente' && !profile?.is_root_admin;

  console.log('Auth state:', { 
    userId: user?.id, 
    profileRole: profile?.role, 
    isRootAdmin,
    isAdmin, 
    isCliente, 
    loading: loading || profileLoading 
  });

  return {
    user,
    profile,
    loading: loading || profileLoading,
    signIn,
    signUp,
    signOut,
    isAdmin,
    isRootAdmin,
    isCliente,
  };
}
