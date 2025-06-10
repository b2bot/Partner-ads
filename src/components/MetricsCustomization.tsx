
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

interface Metric {
  id: string;
  name: string;
  key: string;
  enabled: boolean;
  order: number;
}

interface PageMetrics {
  dashboard: Metric[];
  campaigns: Metric[];
  adsets: Metric[];
  ads: Metric[];
}

export function MetricsCustomization() {
  const [pageMetrics, setPageMetrics] = useState<PageMetrics>({
    dashboard: [
      { id: '1', name: 'Gasto Total', key: 'spend', enabled: true, order: 1 },
      { id: '2', name: 'ROAS', key: 'roas', enabled: true, order: 2 },
      { id: '3', name: 'Alcance', key: 'reach', enabled: true, order: 3 },
      { id: '4', name: 'CTR', key: 'ctr', enabled: true, order: 4 },
      { id: '5', name: 'CPC', key: 'cpc', enabled: false, order: 5 },
      { id: '6', name: 'CPM', key: 'cpm', enabled: false, order: 6 }
    ],
    campaigns: [
      { id: '7', name: 'Nome', key: 'name', enabled: true, order: 1 },
      { id: '8', name: 'Status', key: 'status', enabled: true, order: 2 },
      { id: '9', name: 'Orçamento', key: 'budget', enabled: true, order: 3 },
      { id: '10', name: 'Gasto', key: 'spend', enabled: true, order: 4 },
      { id: '11', name: 'ROAS', key: 'roas', enabled: true, order: 5 },
      { id: '12', name: 'CTR', key: 'ctr', enabled: true, order: 6 },
      { id: '13', name: 'CPC', key: 'cpc', enabled: true, order: 7 },
      { id: '14', name: 'Conversões', key: 'conversions', enabled: true, order: 8 },
      { id: '15', name: 'CPM', key: 'cpm', enabled: false, order: 9 },
      { id: '16', name: 'Impressões', key: 'impressions', enabled: false, order: 10 },
      { id: '17', name: 'Cliques', key: 'clicks', enabled: false, order: 11 }
    ],
    adsets: [
      { id: '18', name: 'Nome', key: 'name', enabled: true, order: 1 },
      { id: '19', name: 'Status', key: 'status', enabled: true, order: 2 },
      { id: '20', name: 'Orçamento', key: 'budget', enabled: true, order: 3 },
      { id: '21', name: 'Gasto', key: 'spend', enabled: true, order: 4 },
      { id: '22', name: 'CTR', key: 'ctr', enabled: true, order: 5 },
      { id: '23', name: 'CPC', key: 'cpc', enabled: true, order: 6 },
      { id: '24', name: 'CPM', key: 'cpm', enabled: false, order: 7 }
    ],
    ads: [
      { id: '25', name: 'Nome', key: 'name', enabled: true, order: 1 },
      { id: '26', name: 'Status', key: 'status', enabled: true, order: 2 },
      { id: '27', name: 'CTR', key: 'ctr', enabled: true, order: 3 },
      { id: '28', name: 'CPC', key: 'cpc', enabled: true, order: 4 },
      { id: '29', name: 'Impressões', key: 'impressions', enabled: true, order: 5 },
      { id: '30', name: 'Cliques', key: 'clicks', enabled: false, order: 6 }
    ]
  });

  const [selectedPage, setSelectedPage] = useState<keyof PageMetrics>('dashboard');
  const { toast } = useToast();

  const toggleMetric = (metricId: string) => {
    setPageMetrics(prev => ({
      ...prev,
      [selectedPage]: prev[selectedPage].map(metric =>
        metric.id === metricId 
          ? { ...metric, enabled: !metric.enabled }
          : metric
      )
    }));
  };

  const saveMetricsConfiguration = () => {
    // Aqui você salvaria a configuração no localStorage ou backend
    localStorage.setItem('metricsConfiguration', JSON.stringify(pageMetrics));
    
    toast({
      title: "Configuração salva",
      description: "Personalização de métricas salva com sucesso.",
    });
  };

  const resetToDefault = () => {
    // Reset para configuração padrão
    setPageMetrics({
      dashboard: [
        { id: '1', name: 'Gasto Total', key: 'spend', enabled: true, order: 1 },
        { id: '2', name: 'ROAS', key: 'roas', enabled: true, order: 2 },
        { id: '3', name: 'Alcance', key: 'reach', enabled: true, order: 3 },
        { id: '4', name: 'CTR', key: 'ctr', enabled: true, order: 4 },
        { id: '5', name: 'CPC', key: 'cpc', enabled: false, order: 5 },
        { id: '6', name: 'CPM', key: 'cpm', enabled: false, order: 6 }
      ],
      campaigns: [
        { id: '7', name: 'Nome', key: 'name', enabled: true, order: 1 },
        { id: '8', name: 'Status', key: 'status', enabled: true, order: 2 },
        { id: '9', name: 'Orçamento', key: 'budget', enabled: true, order: 3 },
        { id: '10', name: 'Gasto', key: 'spend', enabled: true, order: 4 },
        { id: '11', name: 'ROAS', key: 'roas', enabled: true, order: 5 },
        { id: '12', name: 'CTR', key: 'ctr', enabled: true, order: 6 },
        { id: '13', name: 'CPC', key: 'cpc', enabled: true, order: 7 },
        { id: '14', name: 'Conversões', key: 'conversions', enabled: true, order: 8 },
        { id: '15', name: 'CPM', key: 'cpm', enabled: false, order: 9 },
        { id: '16', name: 'Impressões', key: 'impressions', enabled: false, order: 10 },
        { id: '17', name: 'Cliques', key: 'clicks', enabled: false, order: 11 }
      ],
      adsets: [
        { id: '18', name: 'Nome', key: 'name', enabled: true, order: 1 },
        { id: '19', name: 'Status', key: 'status', enabled: true, order: 2 },
        { id: '20', name: 'Orçamento', key: 'budget', enabled: true, order: 3 },
        { id: '21', name: 'Gasto', key: 'spend', enabled: true, order: 4 },
        { id: '22', name: 'CTR', key: 'ctr', enabled: true, order: 5 },
        { id: '23', name: 'CPC', key: 'cpc', enabled: true, order: 6 },
        { id: '24', name: 'CPM', key: 'cpm', enabled: false, order: 7 }
      ],
      ads: [
        { id: '25', name: 'Nome', key: 'name', enabled: true, order: 1 },
        { id: '26', name: 'Status', key: 'status', enabled: true, order: 2 },
        { id: '27', name: 'CTR', key: 'ctr', enabled: true, order: 3 },
        { id: '28', name: 'CPC', key: 'cpc', enabled: true, order: 4 },
        { id: '29', name: 'Impressões', key: 'impressions', enabled: true, order: 5 },
        { id: '30', name: 'Cliques', key: 'clicks', enabled: false, order: 6 }
      ]
    });
    
    toast({
      title: "Configuração restaurada",
      description: "Métricas restauradas para o padrão.",
    });
  };

  const pageOptions = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'campaigns', label: 'Campanhas' },
    { key: 'adsets', label: 'Conjuntos de Anúncios' },
    { key: 'ads', label: 'Anúncios' }
  ];

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
            Escolha quais métricas exibir em cada página e a ordem em que devem aparecer.
          </p>
          
          {/* Seletor de Página */}
          <div className="flex gap-2 mb-6">
            {pageOptions.map((option) => (
              <Button
                key={option.key}
                variant={selectedPage === option.key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPage(option.key as keyof PageMetrics)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Lista de Métricas */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-slate-700">
              Métricas da página: {pageOptions.find(p => p.key === selectedPage)?.label}
            </h4>
            <div className="text-sm text-slate-500">
              {pageMetrics[selectedPage].filter(m => m.enabled).length} de {pageMetrics[selectedPage].length} ativas
            </div>
          </div>
          
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {pageMetrics[selectedPage]
              .sort((a, b) => a.order - b.order)
              .map((metric) => (
                <div
                  key={metric.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50"
                >
                  <div className="flex items-center gap-3">
                    <GripVertical className="w-4 h-4 text-slate-400 cursor-move" />
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
                    onCheckedChange={() => toggleMetric(metric.id)}
                  />
                </div>
              ))}
          </div>
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
