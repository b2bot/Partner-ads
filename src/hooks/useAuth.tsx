
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
}

export const useAuth = (): AuthState => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);

  console.log('🔐 useAuth hook called, current state:', {
    user: user ? 'present' : 'null',
    profile: profile ? 'present' : 'null',
    permissions: permissions.length,
    loading
  });

  useEffect(() => {
    console.log('🔐 useAuth effect running...');
    
    const getSession = async () => {
      try {
        console.log('🔐 Getting session...');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('🔐 Session error:', error);
          setLoading(false);
          return;
        }

        console.log('🔐 Session result:', session ? 'found' : 'not found');
        
        if (session?.user) {
          setUser(session.user);
          await loadUserProfile(session.user.id);
        } else {
          setUser(null);
          setProfile(null);
          setPermissions([]);
          setLoading(false);
        }
      } catch (error) {
        console.error('🔐 Error getting session:', error);
        setLoading(false);
      }
    };

    const loadUserProfile = async (userId: string) => {
      try {
        console.log('🔐 Loading profile for user:', userId);
        
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();

        if (profileError) {
          console.error('🔐 Profile error:', profileError);
          setLoading(false);
          return;
        }

        console.log('🔐 Profile loaded:', profileData);
        setProfile(profileData);

        // Load permissions based on role
        if (profileData?.role === 'admin' || profileData?.is_root_admin) {
          console.log('🔐 Loading admin permissions...');
          
          const { data: permissionsData, error: permissionsError } = await supabase
            .from('user_permissions')
            .select('permission_type')
            .eq('user_id', userId);

          if (permissionsError) {
            console.error('🔐 Permissions error:', permissionsError);
          } else {
            console.log('🔐 Permissions loaded:', permissionsData);
            const userPermissions = permissionsData?.map(p => p.permission_type) || [];
            setPermissions(userPermissions);
          }
        } else {
          console.log('🔐 Cliente user, setting basic permissions...');
          setPermissions(['access_dashboard', 'access_calls', 'access_creatives']);
        }

        setLoading(false);
      } catch (error) {
        console.error('🔐 Error loading profile:', error);
        setLoading(false);
      }
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('🔐 Auth state changed:', event, session ? 'session present' : 'no session');
      
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user);
        await loadUserProfile(session.user.id);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setProfile(null);
        setPermissions([]);
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
    permissionsCount: permissions.length,
    hasAccessDashboard: hasPermission('access_dashboard'),
    hasManageCollaborators: hasPermission('manage_collaborators'),
    profile
  });

  return authState;
};
