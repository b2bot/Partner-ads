
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

  // Buscar permissões do usuário
  const { data: userPermissions = [], isLoading: permissionsLoading } = useQuery({
    queryKey: ['user-permissions', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      console.log('Loading permissions for user:', user.id);

      const { data, error } = await supabase
        .from('user_permissions')
        .select('permission')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error loading user permissions:', error);
        return [];
      }

      const permissions = data.map(p => p.permission);
      console.log('User permissions loaded:', permissions);
      return permissions;
    },
    enabled: !!user?.id,
  });

  useEffect(() => {
    // Limpar cache do localStorage
    localStorage.removeItem('supabase.auth.token');
    localStorage.removeItem('react-query-cache');
    
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

  // Função para verificar se tem permissão específica
  const hasPermission = (permission: string): boolean => {
    // Root admin tem todas as permissões
    if (isRootAdmin) return true;
    
    // Verificar se tem a permissão específica
    return userPermissions.includes(permission);
  };

  // Se é root admin, incluir todas as permissões possíveis
  const allPermissions = isRootAdmin ? [
    'access_dashboard',
    'access_whatsapp',
    'create_campaigns',
    'edit_campaigns',
    'view_templates',
    'send_messages',
    'view_metrics',
    'access_tasks',
    'create_tasks',
    'assign_tasks',
    'finalize_tasks',
    'edit_execution_time',
    'access_calls',
    'create_calls',
    'finalize_calls',
    'link_calls_to_tasks',
    'access_creatives',
    'create_edit_creatives',
    'approve_creatives',
    'view_change_history',
    'access_paid_media',
    'create_campaigns_media',
    'view_metrics_media',
    'access_reports',
    'create_automatic_reports',
    'manage_user_settings',
    'manage_collaborators',
    'manage_whatsapp_templates',
    'manage_api_settings',
    'manage_appearance_and_visual_identity',
    'manage_external_integrations',
    'manage_variables_and_pre_configurations',
    'view_billing_settings',
    'view_system_logs'
  ] : userPermissions;

  console.log('Auth state:', {
    userId: user?.id,
    profileRole: profile?.role,
    isRootAdmin,
    isAdmin,
    isCliente,
    loading: loading || profileLoading || permissionsLoading,
    userMeta,
    isSuperAdminFromMeta: userMeta?.is_super_admin,
    profileIsRootAdmin: profile?.is_root_admin,
    permissions: allPermissions,
    hasAccessDashboard: hasPermission('access_dashboard'),
    hasManageCollaborators: hasPermission('manage_collaborators'),
  });

  return {
    user,
    profile,
    loading: loading || profileLoading || permissionsLoading,
    signIn,
    signUp,
    signOut,
    isAdmin,
    isRootAdmin,
    isCliente,
    permissions: allPermissions,
    hasPermission,
  };
}
