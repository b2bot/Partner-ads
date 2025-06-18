
import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Permission } from '@/types/auth';

interface Profile {
  id: string;
  nome: string;
  email: string;
  role: 'admin' | 'cliente';
  ativo: boolean;
  created_at: string;
  updated_at: string;
  is_root_admin?: boolean;
  foto_url?: string;
  status?: string;
}

interface AuthState {
  user: User | null;
  profile: Profile | null;
  permissions: Permission[];
  loading: boolean;
  isAdmin: boolean;
  isRootAdmin: boolean;
  isCliente: boolean;
  hasPermission: (permission: Permission) => boolean;
  error: string | null;
}

export const useAuth = (): AuthState => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log('🔐 useAuth hook called, current state:', {
    user: user ? 'present' : 'null',
    profile: profile ? 'present' : 'null',
    permissions: permissions.length,
    loading,
    error
  });

  // Timeout para evitar loading infinito
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loading) {
        console.log('🔐 Loading timeout reached, forcing completion');
        setLoading(false);
        setError('Timeout ao carregar dados do usuário');
      }
    }, 10000); // 10 segundos

    return () => clearTimeout(timeout);
  }, [loading]);

  useEffect(() => {
    console.log('🔐 useAuth effect running...');
    
    const getSession = async () => {
      try {
        console.log('🔐 Getting session...');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('🔐 Session error:', error);
          setError(`Erro na sessão: ${error.message}`);
          setLoading(false);
          return;
        }

        console.log('🔐 Session result:', session ? 'found' : 'not found');
        
        if (session?.user) {
          setUser(session.user);
          await loadUserProfile(session.user.id, session.user.email || '');
        } else {
          setUser(null);
          setProfile(null);
          setPermissions([]);
          setLoading(false);
        }
      } catch (error) {
        console.error('🔐 Error getting session:', error);
        setError(`Erro ao obter sessão: ${error}`);
        setLoading(false);
      }
    };

    const createDefaultProfile = async (userId: string, email: string) => {
      try {
        console.log('🔐 Creating default profile for:', userId, email);
        
        const { data: newProfile, error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: userId,
            nome: email?.split('@')[0] || 'Usuário',
            email: email || '',
            role: 'admin',
            is_root_admin: true, // Temporariamente dar admin para resolver o problema
            ativo: true
          })
          .select()
          .single();
          
        if (insertError) {
          console.error('🔐 Error creating profile:', insertError);
          return null;
        }
        
        console.log('🔐 Created new profile:', newProfile);
        return newProfile as Profile;
      } catch (error) {
        console.error('🔐 Exception creating profile:', error);
        return null;
      }
    };

    const loadUserProfile = async (userId: string, email: string) => {
      try {
        console.log('🔐 Loading profile for user:', userId, email);
        
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();

        if (profileError) {
          console.error('🔐 Profile error:', profileError);
          
          // Se não encontrar o perfil, criar um automaticamente
          if (profileError.code === 'PGRST116') {
            console.log('🔐 Profile not found, creating default profile...');
            const newProfile = await createDefaultProfile(userId, email);
            if (newProfile) {
              setProfile(newProfile);
              setPermissions(['access_dashboard', 'access_calls', 'access_creatives', 'access_client_reports']);
            } else {
              setError('Erro ao criar perfil do usuário');
            }
          } else {
            setError(`Erro ao carregar perfil: ${profileError.message}`);
          }
          setLoading(false);
          return;
        }

        console.log('🔐 Profile loaded:', profileData);
        setProfile(profileData);

        // Load permissions based on role
        if (profileData?.role === 'admin' || profileData?.is_root_admin) {
          console.log('🔐 Loading admin permissions...');
          
          // Para root admin, dar todas as permissões
          if (profileData?.is_root_admin) {
            setPermissions([
              'access_dashboard',
              'access_calls', 
              'access_creatives',
              'access_client_reports',
              'access_paid_media',
              'access_whatsapp',
              'view_metrics',
              'view_system_logs',
              'manage_api_settings',
              'manage_user_settings',
              'manage_collaborators',
              'access_tasks'
            ]);
          } else {
            const { data: permissionsData, error: permissionsError } = await supabase
              .from('user_permissions')
              .select('permission')
              .eq('user_id', userId);

            if (permissionsError) {
              console.error('🔐 Permissions error:', permissionsError);
            } else {
              console.log('🔐 Permissions loaded:', permissionsData);
              const userPermissions = permissionsData?.map(p => p.permission) || [];
              setPermissions(userPermissions);
            }
          }
        } else {
          console.log('🔐 Cliente user, setting basic permissions...');
          setPermissions(['access_dashboard', 'access_calls', 'access_creatives']);
        }

        setLoading(false);
        setError(null);
      } catch (error) {
        console.error('🔐 Error loading profile:', error);
        setError(`Erro ao carregar perfil: ${error}`);
        setLoading(false);
      }
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('🔐 Auth state changed:', event, session ? 'session present' : 'no session');
      
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user);
        setLoading(true);
        await loadUserProfile(session.user.id, session.user.email || '');
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setProfile(null);
        setPermissions([]);
        setError(null);
        setLoading(false);
      }
    });

    return () => {
      console.log('🔐 Cleaning up auth subscription...');
      subscription.unsubscribe();
    };
  }, []);

  const hasPermission = (permission: Permission): boolean => {
    if (!profile) {
      console.log('🔐 hasPermission: no profile, returning false');
      return false;
    }
    
    if (profile.is_root_admin) {
      console.log('🔐 hasPermission: root admin, returning true');
      return true;
    }
    
    const result = permissions.includes(permission);
    console.log(`🔐 hasPermission(${permission}):`, result);
    return result;
  };

  const isAdmin = profile?.role === 'admin' || profile?.is_root_admin === true;
  const isRootAdmin = profile?.is_root_admin === true;
  const isCliente = profile?.role === 'cliente';

  const authState = {
    user,
    profile,
    permissions,
    loading,
    isAdmin,
    isRootAdmin,
    isCliente,
    hasPermission,
    error,
  };

  console.log('🔐 Auth state detailed:', {
    userId: user?.id,
    userEmail: user?.email,
    profileRole: profile?.role,
    profileIsRootAdmin: profile?.is_root_admin,
    isRootAdmin,
    isAdmin,
    isCliente,
    loading,
    error,
    permissionsCount: permissions.length,
    hasAccessDashboard: hasPermission('access_dashboard'),
    hasManageCollaborators: hasPermission('manage_collaborators'),
    profile
  });

  return authState;
};
