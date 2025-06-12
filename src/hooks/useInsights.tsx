
import { useQuery } from '@tanstack/react-query';
import { getCampaignInsights, getAdSetInsights, getAdInsights } from '@/lib/metaInsights';
import { useMetaData } from './useMetaData';
import { useMetricsConfig } from './useMetricsConfig';

export function useCampaignInsights(dateRange?: { since: string; until: string }) {
  const { credentials, campaigns } = useMetaData();
  const { config } = useMetricsConfig();

  const defaultDateRange = {
    since: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    until: new Date().toISOString().split('T')[0]
  };

  return useQuery({
    queryKey: ['campaign-insights', campaigns.map(c => c.id), dateRange || defaultDateRange, config.campaigns],
    queryFn: () => getCampaignInsights(
      credentials!.access_token,
      campaigns.map(c => c.id),
      dateRange || defaultDateRange,
      config.campaigns
    ),
    enabled: !!credentials?.access_token && campaigns.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
}

export function useAdSetInsights(dateRange?: { since: string; until: string }) {
  const { credentials, adSets } = useMetaData();
  const { config } = useMetricsConfig();

  const defaultDateRange = {
    since: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    until: new Date().toISOString().split('T')[0]
  };

  return useQuery({
    queryKey: ['adset-insights', adSets.map(a => a.id), dateRange || defaultDateRange, config.adsets],
    queryFn: () => getAdSetInsights(
      credentials!.access_token,
      adSets.map(a => a.id),
      dateRange || defaultDateRange,
      config.adsets
    ),
    enabled: !!credentials?.access_token && adSets.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
}

export function useAdInsights(dateRange?: { since: string; until: string }) {
  const { credentials, ads } = useMetaData();
  const { config } = useMetricsConfig();

  const defaultDateRange = {
    since: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    until: new Date().toISOString().split('T')[0]
  };

  return useQuery({
    queryKey: ['ad-insights', ads.map(a => a.id), dateRange || defaultDateRange, config.ads],
    queryFn: () => getAdInsights(
      credentials!.access_token,
      ads.map(a => a.id),
      dateRange || defaultDateRange,
      config.ads
    ),
    enabled: !!credentials?.access_token && ads.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
}
