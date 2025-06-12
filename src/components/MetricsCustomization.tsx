
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  BarChart3,
  GripVertical,
  Eye,
  EyeOff
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useMetricsConfig } from '@/hooks/useMetricsConfig';
import { AVAILABLE_METRICS, getMetricDisplayName } from '@/lib/metaInsights';

interface Metric {
  key: string;
  name: string;
  enabled: boolean;
  category: string;
}

export function MetricsCustomization() {
  const { config, saveConfig, loading } = useMetricsConfig();
  const [selectedPage, setSelectedPage] = useState<'dashboard' | 'campaigns' | 'adsets' | 'ads'>('campaigns');
  const { toast } = useToast();

  // Criar lista de todas as métricas disponíveis organizadas por categoria
  const getAllMetrics = () => {
    const allMetrics: Metric[] = [];
    
    Object.entries(AVAILABLE_METRICS).forEach(([category, metrics]) => {
      metrics.forEach(metric => {
        allMetrics.push({
          key: metric,
          name: getMetricDisplayName(metric),
          enabled: config[selectedPage].includes(metric),
          category
        });
      });
    });
    
    return allMetrics;
  };

  const toggleMetric = (metricKey: string) => {
    const currentMetrics = config[selectedPage];
    const newMetrics = currentMetrics.includes(metricKey)
      ? currentMetrics.filter(m => m !== metricKey)
      : [...currentMetrics, metricKey];

    const newConfig = {
      ...config,
      [selectedPage]: newMetrics
    };

    saveConfig(newConfig);
  };

  const saveMetricsConfiguration = async () => {
    const success = await saveConfig(config);
    
    if (success) {
      toast({
        title: "Configuração salva",
        description: "Personalização de métricas salva com sucesso.",
      });
    } else {
      toast({
        title: "Erro",
        description: "Erro ao salvar configuração de métricas.",
        variant: "destructive",
      });
    }
  };

  const resetToDefault = () => {
    const defaultConfig = {
      dashboard: ['impressions', 'clicks', 'spend', 'ctr', 'cpc'],
      campaigns: ['impressions', 'clicks', 'spend', 'ctr', 'cpc', 'reach'],
      adsets: ['impressions', 'clicks', 'spend', 'ctr', 'cpc'],
      ads: ['impressions', 'clicks', 'spend', 'ctr', 'cpc']
    };
    
    saveConfig(defaultConfig);
    
    toast({
      title: "Configuração restaurada",
      description: "Métricas restauradas para o padrão.",
    });
  };

  const selectAllMetrics = () => {
    const allMetricKeys = Object.values(AVAILABLE_METRICS).flat();
    const newConfig = {
      ...config,
      [selectedPage]: allMetricKeys
    };
    saveConfig(newConfig);
  };

  const deselectAllMetrics = () => {
    const newConfig = {
      ...config,
      [selectedPage]: []
    };
    saveConfig(newConfig);
  };

  const pageOptions = [
    { key: 'dashboard' as const, label: 'Dashboard' },
    { key: 'campaigns' as const, label: 'Campanhas' },
    { key: 'adsets' as const, label: 'Conjuntos de Anúncios' },
    { key: 'ads' as const, label: 'Anúncios' }
  ];

  const allMetrics = getAllMetrics();
  const enabledCount = allMetrics.filter(m => m.enabled).length;

  if (loading) {
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
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <CardTitle>Personalização de Métricas</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <p className="text-sm text-slate-600 mb-4">
            Escolha quais métricas da Meta Ads API exibir em cada página. Todas as métricas disponíveis estão listadas abaixo.
          </p>
          
          {/* Seletor de Página */}
          <div className="flex gap-2 mb-6">
            {pageOptions.map((option) => (
              <Button
                key={option.key}
                variant={selectedPage === option.key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPage(option.key)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Controles de Seleção */}
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-slate-700">
            Métricas da página: {pageOptions.find(p => p.key === selectedPage)?.label}
          </h4>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={selectAllMetrics}>
              Selecionar Todas
            </Button>
            <Button variant="outline" size="sm" onClick={deselectAllMetrics}>
              Desmarcar Todas
            </Button>
          </div>
        </div>

        <div className="text-sm text-slate-500">
          {enabledCount} de {allMetrics.length} métricas ativas
        </div>

        {/* Lista de Métricas por Categoria */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {Object.entries(AVAILABLE_METRICS).map(([category, metrics]) => (
            <div key={category} className="space-y-2">
              <h5 className="font-medium text-slate-600 capitalize border-b pb-1">
                {category === 'basic' ? 'Métricas Básicas' : 
                 category === 'engagement' ? 'Engajamento' :
                 category === 'video' ? 'Vídeo' :
                 category === 'conversions' ? 'Conversões' :
                 category === 'traffic' ? 'Tráfego' : category}
              </h5>
              {metrics.map((metricKey) => {
                const metric = allMetrics.find(m => m.key === metricKey);
                if (!metric) return null;
                
                return (
                  <div
                    key={metricKey}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50"
                  >
                    <div className="flex items-center gap-3">
                      <GripVertical className="w-4 h-4 text-slate-400" />
                      <div className="flex items-center gap-2">
                        {metric.enabled ? (
                          <Eye className="w-4 h-4 text-green-600" />
                        ) : (
                          <EyeOff className="w-4 h-4 text-slate-400" />
                        )}
                        <Label className="font-medium">{metric.name}</Label>
                        <Badge variant="outline" className="text-xs">
                          {metric.key}
                        </Badge>
                      </div>
                    </div>
                    
                    <Switch
                      checked={metric.enabled}
                      onCheckedChange={() => toggleMetric(metric.key)}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Ações */}
        <div className="flex justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={resetToDefault}
          >
            Restaurar Padrão
          </Button>
          <Button onClick={saveMetricsConfiguration}>
            Salvar Configuração
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
