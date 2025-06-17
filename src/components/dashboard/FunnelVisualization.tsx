
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, TrendingDown, Eye, MousePointer, DollarSign } from 'lucide-react';

interface FunnelData {
  impressions?: number;
  clicks?: number;
  amountSpent?: number;
  actionMessagingConversationsStarted?: number;
  costPerActionMessagingConversations?: number;
  actionLinkClicks?: number;
  reach?: number;
  frequency?: number;
  cpm?: number;
  cpc?: number;
  [key: string]: any;
}

interface FunnelVisualizationProps {
  data: FunnelData[];
}

const FunnelVisualization: React.FC<FunnelVisualizationProps> = ({ data }) => {
  const funnelData = useMemo(() => {
    if (!data || data.length === 0) {
      return {
        impressions: 0,
        clicks: 0,
        conversions: 0,
        ctr: 0,
        conversionRate: 0,
        spend: 0,
        cpc: 0,
        cpm: 0
      };
    }

    const totals = data.reduce((acc, item) => {
      acc.impressions += item.impressions || 0;
      acc.clicks += item.clicks || 0;
      acc.conversions += item.actionMessagingConversationsStarted || 0;
      acc.spend += item.amountSpent || 0;
      acc.cpc += item.cpc || 0;
      acc.cpm += item.cpm || 0;
      return acc;
    }, {
      impressions: 0,
      clicks: 0,
      conversions: 0,
      spend: 0,
      cpc: 0,
      cpm: 0
    });

    const ctr = totals.impressions > 0 ? (totals.clicks / totals.impressions) * 100 : 0;
    const conversionRate = totals.clicks > 0 ? (totals.conversions / totals.clicks) * 100 : 0;
    const avgCpc = data.length > 0 ? totals.cpc / data.length : 0;
    const avgCpm = data.length > 0 ? totals.cpm / data.length : 0;

    return {
      impressions: totals.impressions,
      clicks: totals.clicks,
      conversions: totals.conversions,
      ctr,
      conversionRate,
      spend: totals.spend,
      cpc: avgCpc,
      cpm: avgCpm
    };
  }, [data]);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('pt-BR').format(num);
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(num);
  };

  const formatPercentage = (num: number) => {
    return `${num.toFixed(2)}%`;
  };

  const FunnelStep = ({ 
    icon: Icon, 
    label, 
    value, 
    percentage, 
    width, 
    color 
  }: {
    icon: React.ElementType;
    label: string;
    value: string;
    percentage?: string;
    width: string;
    color: string;
  }) => (
    <div className="flex flex-col items-center space-y-2">
      <div className={`${color} text-white p-3 rounded-full`}>
        <Icon className="w-5 h-5" />
      </div>
      <div 
        className={`${color} text-white py-2 px-4 rounded-lg text-center ${width} transition-all duration-300`}
        style={{ minHeight: '60px' }}
      >
        <div className="font-semibold text-sm">{label}</div>
        <div className="text-lg font-bold">{value}</div>
        {percentage && (
          <div className="text-xs opacity-90">{percentage}</div>
        )}
      </div>
      {/* Connector line */}
      <div className="w-0.5 h-8 bg-gray-300 dark:bg-gray-600"></div>
    </div>
  );

  if (!data || data.length === 0) {
    return (
      <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm h-96">
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Funil sem dados
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              O funil será exibido quando houver dados disponíveis.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Funil de Conversão
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Funil Visual */}
        <div className="flex flex-col items-center space-y-1">
          <FunnelStep
            icon={Eye}
            label="Impressões"
            value={formatNumber(funnelData.impressions)}
            width="w-full"
            color="bg-blue-500"
          />
          
          <FunnelStep
            icon={MousePointer}
            label="Cliques"
            value={formatNumber(funnelData.clicks)}
            percentage={`CTR: ${formatPercentage(funnelData.ctr)}`}
            width="w-4/5"
            color="bg-green-500"
          />
          
          <FunnelStep
            icon={DollarSign}
            label="Conversões"
            value={formatNumber(funnelData.conversions)}
            percentage={`Taxa: ${formatPercentage(funnelData.conversionRate)}`}
            width="w-3/5"
            color="bg-purple-500"
          />
        </div>

        {/* Métricas Resumo */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-sm text-gray-500">Gasto Total</div>
            <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {formatCurrency(funnelData.spend)}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500">CPC Médio</div>
            <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {formatCurrency(funnelData.cpc)}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500">CPM Médio</div>
            <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {formatCurrency(funnelData.cpm)}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500">Taxa de Conversão</div>
            <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {formatPercentage(funnelData.conversionRate)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FunnelVisualization;
