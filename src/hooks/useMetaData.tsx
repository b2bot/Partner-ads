
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  getMetaCredentials, 
  getAdAccounts, 
  getCampaigns, 
  getAdSets, 
  getAds,
  getCampaignInsights,
  Campaign,
  AdSet,
  Ad,
  CampaignInsights
} from '@/lib/metaApi';

export function useMetaData() {
  const [selectedAdAccount, setSelectedAdAccount] = useState<string>('');
  
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

  // Auto-select first ad account if available
  useEffect(() => {
    if (adAccounts && adAccounts.length > 0 && !selectedAdAccount) {
      setSelectedAdAccount(adAccounts[0].id);
    }
  }, [adAccounts, selectedAdAccount]);

  return {
    credentials,
    adAccounts,
    selectedAdAccount,
    setSelectedAdAccount,
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
