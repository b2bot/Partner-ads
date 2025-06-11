
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

export function useMetaData() {
  const { selectedAdAccount, selectedAdAccountName, setSelectedAdAccount } = useGlobalAdAccount();
  
  const { data: credentials } = useQuery({
    queryKey: ['meta-credentials'],
    queryFn: getMetaCredentials,
  });

  const { data: adAccounts, isLoading: loadingAdAccounts } = useQuery({
    queryKey: ['ad-accounts', credentials?.access_token],
    queryFn: () => getAdAccounts(credentials!.access_token),
    enabled: !!credentials?.access_token,
  });

  const { data: campaigns, isLoading: loadingCampaigns, refetch: refetchCampaigns } = useQuery({
    queryKey: ['campaigns', credentials?.access_token, selectedAdAccount],
    queryFn: () => getCampaigns(credentials!.access_token, selectedAdAccount),
    enabled: !!credentials?.access_token && !!selectedAdAccount,
  });

  const { data: adSets, isLoading: loadingAdSets, refetch: refetchAdSets } = useQuery({
    queryKey: ['adsets', credentials?.access_token, selectedAdAccount],
    queryFn: () => getAdSets(credentials!.access_token, selectedAdAccount),
    enabled: !!credentials?.access_token && !!selectedAdAccount,
  });

  const { data: ads, isLoading: loadingAds, refetch: refetchAds } = useQuery({
    queryKey: ['ads', credentials?.access_token, selectedAdAccount],
    queryFn: () => getAds(credentials!.access_token, selectedAdAccount),
    enabled: !!credentials?.access_token && !!selectedAdAccount,
  });

  // Auto-select first ad account if available and none is selected
  useEffect(() => {
    if (adAccounts && adAccounts.length > 0 && !selectedAdAccount) {
      setSelectedAdAccount(adAccounts[0].id, adAccounts[0].name);
    }
  }, [adAccounts, selectedAdAccount, setSelectedAdAccount]);

  const handleSetSelectedAdAccount = (accountId: string) => {
    const account = adAccounts?.find(acc => acc.id === accountId);
    if (account) {
      setSelectedAdAccount(accountId, account.name);
    }
  };

  return {
    credentials,
    adAccounts: adAccounts || [],
    selectedAdAccount,
    selectedAdAccountName,
    setSelectedAdAccount: handleSetSelectedAdAccount,
    campaigns: campaigns || [],
    adSets: adSets || [],
    ads: ads || [],
    loading: {
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
  });
}
