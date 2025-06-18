
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Eye, 
  MousePointer, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Calendar,
  Target,
  Phone
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

  // Métricas para relatórios diários
  if (isRelatorios) {
    const relatoriosMetrics = [
      {
        title: 'Contatos',
        value: data.contatos || 0,
        icon: Users,
        change: '+12.3%',
        changeType: 'positive' as const,
        format: 'number'
      },
      {
        title: 'Agendado',
        value: data.agendado || 0,
        icon: Calendar,
        change: '+8.1%',
        changeType: 'positive' as const,
        format: 'number'
      },
      {
        title: 'Atendimento',
        value: data.atendimento || 0,
        icon: Phone,
        change: '+15.2%',
        changeType: 'positive' as const,
        format: 'number'
      },
      {
        title: 'Orçamentos',
        value: data.orcamentos || 0,
        icon: Target,
        change: '+6.7%',
        changeType: 'positive' as const,
        format: 'number'
      },
      {
        title: 'Vendas',
        value: data.vendas || 0,
        icon: TrendingUp,
        change: '+18.5%',
        changeType: 'positive' as const,
        format: 'number'
      },
      {
        title: 'Faturado',
        value: data.faturado || 0,
        icon: DollarSign,
        change: '+22.1%',
        changeType: 'positive' as const,
        format: 'currency'
      }
    ];

    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {relatoriosMetrics.map((metric, index) => (
          <Card key={index} className="premium-card hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    {metric.title}
                  </p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    {metric.format === 'currency' 
                      ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(metric.value)
                      : metric.value.toLocaleString('pt-BR')
                    }
                  </p>
                  <Badge 
                    variant={metric.changeType === 'positive' ? 'default' : 'destructive'}
                    className="text-xs"
                  >
                    {metric.change}
                  </Badge>
                </div>
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                  <metric.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Métricas para outras plataformas
  const standardMetrics = [
    {
      title: 'Impressões',
      value: data.impressions || 0,
      icon: Eye,
      change: '+12.3%',
      changeType: 'positive' as const,
      format: 'number'
    },
    {
      title: 'Cliques',
      value: data.clicks || 0,
      icon: MousePointer,
      change: '+8.1%',
      changeType: 'positive' as const,
      format: 'number'
    },
    {
      title: 'Investimento',
      value: data.spend || 0,
      icon: DollarSign,
      change: '+15.2%',
      changeType: 'positive' as const,
      format: 'currency'
    },
    {
      title: 'Conversões',
      value: data.conversions || 0,
      icon: TrendingUp,
      change: '+18.5%',
      changeType: 'positive' as const,
      format: 'number'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {standardMetrics.map((metric, index) => (
        <Card key={index} className="premium-card hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {metric.title}
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {metric.format === 'currency' 
                    ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(metric.value)
                    : metric.value.toLocaleString('pt-BR')
                  }
                </p>
                <Badge 
                  variant={metric.changeType === 'positive' ? 'default' : 'destructive'}
                  className="text-xs"
                >
                  {metric.change}
                </Badge>
              </div>
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <metric.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Métricas secundárias para plataformas padrão */}
      <Card className="premium-card hover:shadow-lg transition-all duration-300 lg:col-span-2">
        <CardContent className="p-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">CTR</p>
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {data.ctr?.toFixed(2)}%
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">CPC</p>
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                R$ {data.cpc?.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">CPM</p>
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                R$ {data.cpm?.toFixed(2)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
