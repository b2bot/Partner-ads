
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
      console.log('User raw data:', user);

      // Verificar se é super admin do metadata com proteção para null
      const userMeta = user?.user_metadata || {};
      const isSuperAdmin = userMeta?.is_super_admin === true;

      console.log('User metadata:', userMeta);
      console.log('Is super admin from metadata:', isSuperAdmin);

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error loading profile:', error);
        return null;
      }

      // Se é super admin mas não tem is_root_admin = true, atualizar
      if (isSuperAdmin && !data.is_root_admin) {
        console.log('Updating profile to set is_root_admin = true');
        const { data: updatedData, error: updateError } = await supabase
          .from('profiles')
          .update({
            is_root_admin: true,
            role: 'admin',
          })
          .eq('id', user.id)
          .select()
          .single();

        if (updateError) {
          console.error('Error updating profile:', updateError);
        } else {
          console.log('Profile updated successfully:', updatedData);
          return updatedData as UserProfile;
        }
      }

      return data as UserProfile;
    },
    enabled: !!user?.id,
  });

  useEffect(() => {
    // Limpar cache do localStorage
    localStorage.removeItem('supabase.auth.token');
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
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

  // Verificar se é root admin com proteção para null/undefined
  const userMeta = user?.user_metadata || {};
  const isRootAdmin = profile?.is_root_admin === true || userMeta?.is_super_admin === true;
  const isAdmin = profile?.role === 'admin' || isRootAdmin;
  const isCliente = profile?.role === 'cliente' && !isRootAdmin;

  console.log('Auth state:', {
    userId: user?.id,
    profileRole: profile?.role,
    isRootAdmin,
    isAdmin,
    isCliente,
    loading: loading || profileLoading,
    userMeta,
    isSuperAdminFromMeta: userMeta?.is_super_admin,
    profileIsRootAdmin: profile?.is_root_admin,
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
