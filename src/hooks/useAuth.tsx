
import { useEffect, useState } from 'react';
import { User } from '@apiClient/apiClient-js';
import { apiClient, setAuthToken } from '@/integrations/apiClient';
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
  const { signIn: rawSignIn, signUp: rawSignUp, signOut: rawSignOut } = useAuthActions();

  const signIn = async (email: string, password: string) => {
    const result = await rawSignIn(email, password);
    if (result.data?.user) {
      setUser(result.data.user);
    }
    return result;
  };

  const signUp = async (
    email: string,
    password: string,
    nome: string,
    role: 'admin' | 'cliente' = 'cliente'
  ) => {
    const result = await rawSignUp(email, password, nome, role);
    if (result.data?.user) {
      setUser(result.data.user);
    }
    return result;
  };

  const signOut = async () => {
    const result = await rawSignOut();
    setUser(null);
    return result;
  };

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
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthToken(token);
      apiClient
        .get<User>('/api/me.php')
        .then((u) => setUser(u))
        .catch(() => setUser(null))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
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
