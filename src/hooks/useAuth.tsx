import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useUserProfile } from './useUserProfile';
import { useUserPermissions } from './useUserPermissions';
import { useClientPermissions } from './useClientPermissions'; // já refatorado
import { useAuthActions } from './useAuthActions';
import { Permission, ALL_PERMISSIONS } from '@/types/auth';
import { hasPermission as checkPermission } from '@/utils/permissionUtils';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const { data: profile, isLoading: profileLoading } = useUserProfile(user);
  const { signIn, signUp, signOut } = useAuthActions();

  const isRootAdmin = profile?.is_root_admin === true;
  const isAdmin = profile?.role === 'admin' || isRootAdmin;
  const isCliente = profile?.role === 'cliente' && !isRootAdmin;

  const { data: userPermissions = [], isLoading: permissionsLoading } = useUserPermissions(user, isRootAdmin);

  const {
    hasModulePermission,
    hasReportPermission,
    loading: clientPermissionsLoading,
  } = useClientPermissions(user, isCliente);

  useEffect(() => {
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

  const hasPermission = (permission: Permission): boolean => {
    if (isRootAdmin) return true;

    if (isCliente) {
      switch (permission) {
        case 'access_dashboard':
          return hasModulePermission('dashboard');
        case 'access_calls':
          return hasModulePermission('chamados');
        case 'access_creatives':
          return hasModulePermission('criativos');
        case 'access_reports':
          return hasModulePermission('relatorios');
        case 'access_paid_media':
          return (
            hasReportPermission('campanhas') ||
            hasReportPermission('conjuntos_anuncios') ||
            hasReportPermission('anuncios')
          );
        default:
          return false;
      }
    }

    return checkPermission(userPermissions, permission, isRootAdmin);
  };

  const allPermissions = isRootAdmin ? ALL_PERMISSIONS : userPermissions;

  console.log('🔐 Auth state detailed:', {
    userId: user?.id,
    userEmail: user?.email,
    profileRole: profile?.role,
    profileIsRootAdmin: profile?.is_root_admin,
    isRootAdmin,
    isAdmin,
    isCliente,
    loading: loading || profileLoading || permissionsLoading || clientPermissionsLoading,
    permissionsCount: allPermissions.length,
    hasAccessDashboard: hasPermission('access_dashboard'),
    hasManageCollaborators: hasPermission('manage_collaborators'),
    profile: profile
  });

  return {
    user,
    profile,
    loading: loading || profileLoading || permissionsLoading || clientPermissionsLoading,
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
