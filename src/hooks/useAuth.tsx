
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
      
      // Verificar se é super admin pelo raw_user_meta_data
      const isSuperAdmin = user.raw_user_meta_data?.is_super_admin === true || 
                          user.is_super_admin === true;
      
      console.log('Is super admin from raw data:', isSuperAdmin);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) {
        console.error('Error loading profile:', error);
        return null;
      }
      
      // Se o usuário é super admin mas o profile não tem is_root_admin = true, atualizar
      if (isSuperAdmin && !data.is_root_admin) {
        console.log('Updating profile to set is_root_admin = true');
        const { data: updatedData, error: updateError } = await supabase
          .from('profiles')
          .update({ 
            is_root_admin: true,
            role: 'admin'
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
      
      console.log('Profile loaded:', data);
      return data as UserProfile;
    },
    enabled: !!user?.id,
  });

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session:', session?.user?.id);
      console.log('Initial user data:', session?.user);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        console.log('Auth user data:', session?.user);
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
  const isRootAdmin = profile?.is_root_admin === true || 
                      user?.raw_user_meta_data?.is_super_admin === true ||
                      user?.is_super_admin === true;
  const isAdmin = profile?.role === 'admin' || isRootAdmin;
  const isCliente = profile?.role === 'cliente' && !isRootAdmin;

  console.log('Auth state:', { 
    userId: user?.id, 
    profileRole: profile?.role, 
    isRootAdmin,
    isAdmin, 
    isCliente, 
    loading: loading || profileLoading,
    userRawData: user?.raw_user_meta_data,
    isSuperAdminFromRaw: user?.raw_user_meta_data?.is_super_admin || user?.is_super_admin
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
