
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useUserProfile } from './useUserProfile';
import { useUserPermissions } from './useUserPermissions';
import { useAuthActions } from './useAuthActions';
import { Permission, ALL_PERMISSIONS } from '@/types/auth';
import { hasPermission as checkPermission } from '@/utils/permissionUtils';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const { data: profile, isLoading: profileLoading } = useUserProfile(user);
  const { signIn, signUp, signOut } = useAuthActions();

  // Verificar se é root admin com proteção para null/undefined
  const userMeta = user?.user_metadata || {};
  const isRootAdmin = profile?.is_root_admin === true || userMeta?.is_super_admin === true;
  
  const { data: userPermissions = [], isLoading: permissionsLoading } = useUserPermissions(user, isRootAdmin);

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

  const isAdmin = profile?.role === 'admin' || isRootAdmin;
  const isCliente = profile?.role === 'cliente' && !isRootAdmin;

  // Função para verificar se tem permissão específica
  const hasPermission = (permission: Permission): boolean => {
    return checkPermission(userPermissions, permission, isRootAdmin);
  };

  // Se é root admin, incluir todas as permissões possíveis
  const allPermissions = isRootAdmin ? ALL_PERMISSIONS : userPermissions;

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
