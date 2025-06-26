import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Eye, MousePointer, DollarSign, TrendingUp, Users,
  Calendar, Target, Phone
} from 'lucide-react';

interface MetricsData {
  impressions?: number;
  clicks?: number;
  spend?: number;
  conversions?: number;
  ctr?: number;
  cpc?: number;
  cpm?: number;
  contatos?: number;
  agendado?: number;
  atendimento?: number;
  orcamentos?: number;
  vendas?: number;
  faturado?: number;
}

interface ReportsMetricsCardsProps {
  data?: MetricsData;
  platform: string;
}

export function ReportsMetricsCards({ data, platform }: ReportsMetricsCardsProps) {
  if (!data) return null;

  const isRelatorios = platform === 'relatorios';

  const formatNumber = (value: number | undefined, type: 'currency' | 'number') => {
    if (!value && value !== 0) return '-';
    return type === 'currency'
      ? new Intl.NumberFormat('pt-BR', { style: 'number', currency: 'BRL' }).format(value)
      : value.toLocaleString('pt-BR');
  };

  const relatoriosMetrics = [
    { title: 'Contatos', value: data.contatos, icon: Users, change: '+12.3%', format: 'number' },
    { title: 'Agendado', value: data.agendado, icon: Calendar, change: '+8.1%', format: 'number' },
    { title: 'Atendimento', value: data.atendimento, icon: Phone, change: '+15.2%', format: 'number' },
    { title: 'Orçamentos', value: data.orcamentos, icon: Target, change: '+6.7%', format: 'number' },
    { title: 'Vendas', value: data.vendas, icon: TrendingUp, change: '+18.5%', format: 'number' },
    { title: 'Faturado', value: data.faturado, icon: DollarSign, change: '+22.1%', format: 'number' }
  ];

  const standardMetrics = [
    { title: 'Impressões', value: data.impressions, icon: Eye, change: '+12.3%', format: 'number' },
    { title: 'Cliques', value: data.clicks, icon: MousePointer, change: '+8.1%', format: 'number' },
    { title: 'Investimento', value: data.spend, icon: DollarSign, change: '+15.2%', format: 'number' },
    { title: 'Conversões', value: data.conversions, icon: TrendingUp, change: '+18.5%', format: 'number' }
  ];

  const renderCard = (metric: any, index: number) => (
    <Card key={index} className="premium-card">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-caption text-muted-foreground">{metric.title}</p>
            <p className="text-h4 text-foreground font-bold">
              {formatNumber(metric.value, metric.format)}
            </p>
            <Badge variant="secondary" className="text-[0.7rem] font-medium">
              {metric.change}
            </Badge>
          </div>
          <div className="p-2 bg-muted rounded-lg text-muted-foreground">
            <metric.icon className="h-4 w-4" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className={`grid gap-4 ${isRelatorios ? 'grid-cols-2 lg:grid-cols-3 xl:grid-cols-6' : 'grid-cols-2 lg:grid-cols-4'}`}>
      {(isRelatorios ? relatoriosMetrics : standardMetrics).map(renderCard)}

      {!isRelatorios && (
        <Card className="premium-card lg:col-span-2">
          <CardContent className="p-5">
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { label: 'CTR', value: data.ctr, suffix: '%' },
                { label: 'CPC', value: data.cpc, prefix: 'R$' },
                { label: 'CPM', value: data.cpm, prefix: 'R$' }
              ].map((metric, i) => (
                <div key={i}>
                  <p className="text-caption text-muted-foreground">{metric.label}</p>
                  <p className="text-h4 text-foreground font-bold">
                    {metric.prefix || ''}{metric.value?.toFixed(2)}{metric.suffix || ''}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}