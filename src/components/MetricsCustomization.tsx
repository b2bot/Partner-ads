
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useMetricsConfig } from '@/hooks/useMetricsConfig';
import { X } from 'lucide-react';

interface MetricsCustomizationProps {
  onClose: () => void;
}

const availableMetrics = {
  dashboard: ['impressions', 'clicks', 'spend', 'ctr', 'cpc', 'reach', 'frequency', 'cpm'],
  campaigns: ['impressions', 'clicks', 'spend', 'ctr', 'cpc', 'reach', 'frequency', 'cpm'],
  adsets: ['impressions', 'clicks', 'spend', 'ctr', 'cpc', 'reach', 'frequency', 'cpm'],
  ads: ['impressions', 'clicks', 'spend', 'ctr', 'cpc', 'reach', 'frequency', 'cpm']
};

export function MetricsCustomization({ onClose }: MetricsCustomizationProps) {
  const { config, updateConfig, isLoading } = useMetricsConfig();
  const [localConfig, setLocalConfig] = useState(config || {
    dashboard: ['impressions', 'clicks', 'spend', 'ctr', 'cpc'],
    campaigns: ['impressions', 'clicks', 'spend', 'ctr', 'cpc', 'reach'],
    adsets: ['impressions', 'clicks', 'spend', 'ctr', 'cpc'],
    ads: ['impressions', 'clicks', 'spend', 'ctr', 'cpc']
  });

  const handleMetricToggle = (page: keyof typeof availableMetrics, metric: string) => {
    setLocalConfig(prev => ({
      ...prev,
      [page]: prev[page].includes(metric)
        ? prev[page].filter(m => m !== metric)
        : [...prev[page], metric]
    }));
  };

  const handleSave = () => {
    updateConfig(localConfig);
    onClose();
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Personalizar Métricas</CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(availableMetrics).map(([page, metrics]) => (
            <div key={page} className="space-y-3">
              <h4 className="font-medium capitalize">{page}</h4>
              <div className="space-y-2">
                {metrics.map(metric => (
                  <div key={metric} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${page}-${metric}`}
                      checked={localConfig[page as keyof typeof localConfig]?.includes(metric)}
                      onCheckedChange={() => handleMetricToggle(page as keyof typeof availableMetrics, metric)}
                    />
                    <label htmlFor={`${page}-${metric}`} className="text-sm capitalize">
                      {metric}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            Salvar Configurações
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
