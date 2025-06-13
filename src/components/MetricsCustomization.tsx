
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  BarChart3,
  Eye,
  EyeOff,
  RotateCcw,
  Save
} from 'lucide-react';
import { toast } from 'sonner';
import { useMetricsConfig, MetricsConfig } from '@/hooks/useMetricsConfig';
import { AVAILABLE_METRICS, getMetricDisplayName } from '@/lib/metaInsights';

interface Metric {
  key: string;
  name: string;
  enabled: boolean;
  category: string;
}

export function MetricsCustomization() {
  const { config, updateConfig, isLoading } = useMetricsConfig();
  const [selectedPage, setSelectedPage] = useState<'dashboard' | 'campaigns' | 'adsets' | 'ads'>('campaigns');

  const getAllMetrics = () => {
    const allMetrics: Metric[] = [];
    
    Object.entries(AVAILABLE_METRICS).forEach(([category, metrics]) => {
      metrics.forEach(metric => {
        const currentConfig = config as MetricsConfig;
        allMetrics.push({
          key: metric,
          name: getMetricDisplayName(metric),
          enabled: currentConfig[selectedPage]?.includes(metric) || false,
          category
        });
      });
    });
    
    return allMetrics;
  };

  const toggleMetric = (metricKey: string) => {
    const currentConfig = config as MetricsConfig;
    const currentMetrics = currentConfig[selectedPage] || [];
    const newMetrics = currentMetrics.includes(metricKey)
      ? currentMetrics.filter(m => m !== metricKey)
      : [...currentMetrics, metricKey];

    const newConfig: MetricsConfig = {
      ...currentConfig,
      [selectedPage]: newMetrics
    };

    updateConfig(newConfig);
  };

  const saveMetricsConfiguration = async () => {
    toast.success('Configuração de métricas aplicada com sucesso!');
    
    // Force refresh of tables by dispatching a custom event
    window.dispatchEvent(new CustomEvent('metricsConfigChanged', { 
      detail: { config, selectedPage } 
    }));
  };

  const resetToDefault = () => {
    const defaultConfig: MetricsConfig = {
      dashboard: ['impressions', 'clicks', 'spend', 'ctr', 'cpc'],
      campaigns: ['impressions', 'clicks', 'spend', 'ctr', 'cpc', 'reach'],
      adsets: ['impressions', 'clicks', 'spend', 'ctr', 'cpc'],
      ads: ['impressions', 'clicks', 'spend', 'ctr', 'cpc']
    };
    
    updateConfig(defaultConfig);
    
    toast.success('Configuração restaurada para o padrão.');
  };

  const selectAllMetrics = () => {
    const allMetricKeys = Object.values(AVAILABLE_METRICS).flat();
    const currentConfig = config as MetricsConfig;
    const newConfig: MetricsConfig = {
      ...currentConfig,
      [selectedPage]: allMetricKeys
    };
    updateConfig(newConfig);
  };

  const deselectAllMetrics = () => {
    const currentConfig = config as MetricsConfig;
    const newConfig: MetricsConfig = {
      ...currentConfig,
      [selectedPage]: []
    };
    updateConfig(newConfig);
  };

  const pageOptions = [
    { key: 'dashboard' as const, label: 'Dashboard', icon: '📊' },
    { key: 'campaigns' as const, label: 'Campanhas', icon: '📢' },
    { key: 'adsets' as const, label: 'Conjuntos', icon: '🎯' },
    { key: 'ads' as const, label: 'Anúncios', icon: '👥' }
  ];

  const allMetrics = getAllMetrics();
  const enabledCount = allMetrics.filter(m => m.enabled).length;
  const categoryMetrics = Object.entries(AVAILABLE_METRICS);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <CardTitle>Personalização de Métricas</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            <div className="space-y-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-12 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="container-responsive space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <CardTitle>Personalização de Métricas</CardTitle>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Configure quais métricas da Meta Ads API exibir em cada página. 
            As alterações são aplicadas em tempo real nas tabelas.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Page Selector */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {pageOptions.map((option) => (
              <Button
                key={option.key}
                variant={selectedPage === option.key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPage(option.key)}
                className="flex items-center gap-2 text-sm"
              >
                <span>{option.icon}</span>
                {option.label}
              </Button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-sm">
                {enabledCount} métricas ativas
              </Badge>
              <span className="text-xs text-slate-500">
                de {allMetrics.length} disponíveis
              </span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={selectAllMetrics}>
                Todas
              </Button>
              <Button variant="outline" size="sm" onClick={deselectAllMetrics}>
                Nenhuma
              </Button>
            </div>
          </div>

          {/* Metrics List */}
          <ScrollArea className="h-80 border rounded-lg">
            <div className="p-4 space-y-4">
              {categoryMetrics.map(([category, metrics]) => (
                <div key={category} className="space-y-2">
                  <h5 className="font-medium text-slate-700 dark:text-slate-300 text-sm border-b pb-1">
                    {category === 'basic' ? '📊 Métricas Básicas' : 
                     category === 'engagement' ? '👥 Engajamento' :
                     category === 'video' ? '🎥 Vídeo' :
                     category === 'conversions' ? '🎯 Conversões' :
                     category === 'traffic' ? '🚗 Tráfego' : category}
                  </h5>
                  <div className="grid gap-2">
                    {metrics.map((metricKey) => {
                      const currentConfig = config as MetricsConfig;
                      const isEnabled = currentConfig[selectedPage]?.includes(metricKey) || false;
                      
                      return (
                        <div
                          key={metricKey}
                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-smooth"
                        >
                          <div className="flex items-center gap-3">
                            {isEnabled ? (
                              <Eye className="w-4 h-4 text-green-600" />
                            ) : (
                              <EyeOff className="w-4 h-4 text-slate-400" />
                            )}
                            <div>
                              <Label className="font-medium text-sm">
                                {getMetricDisplayName(metricKey)}
                              </Label>
                              <Badge variant="outline" className="text-xs ml-2">
                                {metricKey}
                              </Badge>
                            </div>
                          </div>
                          
                          <Switch
                            checked={isEnabled}
                            onCheckedChange={() => toggleMetric(metricKey)}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Actions */}
          <div className="flex justify-between pt-4 border-t">
            <Button
              variant="outline"
              onClick={resetToDefault}
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Restaurar Padrão
            </Button>
            <Button 
              onClick={saveMetricsConfiguration}
              className="flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Salvar Configuração
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
