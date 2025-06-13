
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  getMetaCredentials, 
  getAdAccounts, 
  getCampaigns, 
  getAdSets, 
  getAds,
  getCampaignInsights,
  AdAccount,
  Campaign,
  AdSet,
  Ad,
  CampaignInsights
} from '@/lib/metaApi';
import { useGlobalAdAccount } from './useGlobalAdAccount';
import { useUserAccess } from './useUserAccess';

export function useMetaData() {
  const { selectedAdAccount, selectedAdAccountName, setSelectedAdAccount } = useGlobalAdAccount();
  const { getAccessibleMetaAccounts, isAdmin } = useUserAccess();
  
  const { data: credentials, isLoading: credentialsLoading } = useQuery({
    queryKey: ['meta-credentials'],
    queryFn: getMetaCredentials,
    retry: 3,
    retryDelay: 1000,
  });

  const { data: adAccounts, isLoading: loadingAdAccounts } = useQuery({
    queryKey: ['ad-accounts', credentials?.access_token],
    queryFn: () => getAdAccounts(credentials!.access_token),
    enabled: !!credentials?.access_token,
    retry: 3,
    retryDelay: 1000,
  });

  // Filtrar contas baseado no acesso do usuário
  const accessibleAccounts = isAdmin 
    ? adAccounts 
    : adAccounts?.filter(account => {
        const userMetaAccounts = getAccessibleMetaAccounts();
        return userMetaAccounts.includes(account.id);
      });

  const { data: campaigns, isLoading: loadingCampaigns, refetch: refetchCampaigns } = useQuery({
    queryKey: ['campaigns', credentials?.access_token, selectedAdAccount],
    queryFn: () => getCampaigns(credentials!.access_token, selectedAdAccount),
    enabled: !!credentials?.access_token && !!selectedAdAccount,
    retry: 2,
    retryDelay: 1000,
  });

  const { data: adSets, isLoading: loadingAdSets, refetch: refetchAdSets } = useQuery({
    queryKey: ['adsets', credentials?.access_token, selectedAdAccount],
    queryFn: () => getAdSets(credentials!.access_token, selectedAdAccount),
    enabled: !!credentials?.access_token && !!selectedAdAccount,
    retry: 2,
    retryDelay: 1000,
  });

  const { data: ads, isLoading: loadingAds, refetch: refetchAds } = useQuery({
    queryKey: ['ads', credentials?.access_token, selectedAdAccount],
    queryFn: () => getAds(credentials!.access_token, selectedAdAccount),
    enabled: !!credentials?.access_token && !!selectedAdAccount,
    retry: 2,
    retryDelay: 1000,
  });

  // Auto-select first accessible ad account if available and none is selected
  useEffect(() => {
    if (accessibleAccounts && accessibleAccounts.length > 0 && !selectedAdAccount) {
      setSelectedAdAccount(accessibleAccounts[0].id, accessibleAccounts[0].name);
    }
  }, [accessibleAccounts, selectedAdAccount, setSelectedAdAccount]);

  const handleSetSelectedAdAccount = (accountId: string) => {
    const account = accessibleAccounts?.find(acc => acc.id === accountId);
    if (account) {
      setSelectedAdAccount(accountId, account.name);
    }
  };

  return {
    credentials,
    adAccounts: accessibleAccounts || [],
    selectedAdAccount,
    selectedAdAccountName,
    setSelectedAdAccount: handleSetSelectedAdAccount,
    campaigns: campaigns || [],
    adSets: adSets || [],
    ads: ads || [],
    loading: {
      credentials: credentialsLoading,
      adAccounts: loadingAdAccounts,
      campaigns: loadingCampaigns,
      adSets: loadingAdSets,
      ads: loadingAds,
    },
    refetch: {
      campaigns: refetchCampaigns,
      adSets: refetchAdSets,
      ads: refetchAds,
    }
  };
}

export function useCampaignInsights(campaignId: string, dateRange: { since: string; until: string }) {
  const { credentials } = useMetaData();
  
  return useQuery({
    queryKey: ['campaign-insights', campaignId, dateRange, credentials?.access_token],
    queryFn: () => getCampaignInsights(credentials!.access_token, campaignId, dateRange),
    enabled: !!credentials?.access_token && !!campaignId,
    retry: 2,
    retryDelay: 1000,
  });
}
