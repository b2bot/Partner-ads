
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useSystemLog } from '@/hooks/useSystemLog';

export interface MetricsConfig {
  dashboard: string[];
  campaigns: string[];
  adsets: string[];
  ads: string[];
}

const defaultConfig: MetricsConfig = {
  dashboard: ['impressions', 'clicks', 'spend', 'ctr', 'cpc'],
  campaigns: ['impressions', 'clicks', 'spend', 'ctr', 'cpc', 'reach'],
  adsets: ['impressions', 'clicks', 'spend', 'ctr', 'cpc'],
  ads: ['impressions', 'clicks', 'spend', 'ctr', 'cpc']
};

export function useMetricsConfig() {
  const { logActivity } = useSystemLog();
  const queryClient = useQueryClient();

  const { data: config = defaultConfig, isLoading } = useQuery({
    queryKey: ['metrics-config'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('metrics_config')
        .select('config')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching metrics config:', error);
        return defaultConfig;
      }

      return data?.config || defaultConfig;
    },
  });

  const updateConfigMutation = useMutation({
    mutationFn: async (newConfig: MetricsConfig) => {
      const { error } = await supabase
        .from('metrics_config')
        .upsert([{ config: newConfig }], { onConflict: 'id' });

      if (error) throw error;
      
      await logActivity('metrics_config_updated', 'configuracoes', newConfig);
      return newConfig;
    },
    onSuccess: (newConfig) => {
      queryClient.setQueryData(['metrics-config'], newConfig);
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      queryClient.invalidateQueries({ queryKey: ['adsets'] });
      queryClient.invalidateQueries({ queryKey: ['ads'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-data'] });
      toast.success('Configuração de métricas atualizada com sucesso!');
    },
    onError: (error) => {
      console.error('Error updating metrics config:', error);
      toast.error('Erro ao atualizar configuração de métricas');
    },
  });

  const getVisibleMetrics = (page: keyof MetricsConfig) => {
    return config[page] || defaultConfig[page];
  };

  const isMetricVisible = (page: keyof MetricsConfig, metric: string) => {
    return getVisibleMetrics(page).includes(metric);
  };

  const updateConfig = (newConfig: MetricsConfig) => {
    updateConfigMutation.mutate(newConfig);
  };

  return {
    config,
    isLoading,
    updateConfig,
    getVisibleMetrics,
    isMetricVisible,
    isUpdating: updateConfigMutation.isPending,
  };
}
