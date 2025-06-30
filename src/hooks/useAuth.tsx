
import { useEffect, useState } from 'react';
import { User } from '@apiClient/apiClient-js';
import { apiClient } from '@/integrations/apiClient';
import { useUserProfile } from './useUserProfile';
import { useUserPermissions } from './useUserPermissions';
import { useClientPermissions } from './useClientPermissions';
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
    console.log('🚀 Inicializando useAuth...');
    
    apiClient.auth.getSession().then(({ data: { session } }) => {
      console.log('📝 Sessão inicial:', session?.user ? 'Usuário logado' : 'Sem usuário');
      setUser(session?.user ?? null);
      setLoading(false);
    });

  const { data: { subscription } } = apiClient.auth.onAuthStateChange(
    async (_event, session) => {
      console.log('🔄 Mudança de auth state:', _event, session?.user ? 'Usuário logado' : 'Sem usuário');
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

  const authState = {
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
    hasAccessTasks: hasPermission('access_tasks'),
    hasManageTasks: hasPermission('manage_tasks'),
    profile: profile
  };

  console.log('🔐 Auth state detalhado:', authState);

  return {
    user,
    profile,
    loading: loading || profileLoading || permissionsLoading || clientPermissionsLoading,
    signIn,
    signUp,
    signOut,
    isAdmin,
    isRootAdmin: profile?.is_root_admin ?? false,
    isCliente,
    permissions: allPermissions,
    hasPermission,
  };
}
