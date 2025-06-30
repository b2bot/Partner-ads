
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { apiClient } from '@/integrations/apiClient';

export function useUserAccess() {
  const { user, isAdmin } = useAuth();

  const { data: clienteData } = useQuery({
    queryKey: ['user-cliente', user?.id],
    queryFn: async () => {
      if (!user?.id || isAdmin) return null;
      
      try {
        const data = await apiClient.get(
          `/api/clientes.php?user_id=${user.id}`
        );
        return data as any;
      } catch (err) {
        console.error('Error loading cliente:', err);
        return null;
      }
    },
    enabled: !!user?.id && !isAdmin,
  });

  const { data: userAccounts } = useQuery({
    queryKey: ['user-accounts', clienteData?.id],
    queryFn: async () => {
      if (!clienteData?.id) return [];
      
      try {
        const data = await apiClient.get(
          `/api/contas.php?cliente_id=${clienteData.id}`
        );
        return data as any[];
      } catch (err) {
        console.error('Error loading accounts:', err);
        return [];
      }
    },
    enabled: !!clienteData?.id,
  });

  const getAccessibleMetaAccounts = () => {
    if (isAdmin) return null; // Admin tem acesso a todas as contas
    return userAccounts?.filter(account => account.tipo === 'meta').map(account => account.identificador) || [];
  };

  const hasAccessToAccount = (accountId: string) => {
    if (isAdmin) return true;
    const accessibleAccounts = getAccessibleMetaAccounts();
    return accessibleAccounts.includes(accountId);
  };

  return {
    clienteData,
    userAccounts: userAccounts || [],
    getAccessibleMetaAccounts,
    hasAccessToAccount,
    isAdmin,
  };
}
