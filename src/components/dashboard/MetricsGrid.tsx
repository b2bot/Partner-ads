import React from 'react';
import { formatCurrency, formatNumber, formatPercentage } from '@/lib/dashboard_lib/formatters';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, MousePointer, Users, DollarSign, Target, Zap, TrendingUp, Clock } from 'lucide-react';

interface MetricsGridProps {
  data: any[];
  section?: string;
}

const MetricsGrid = ({ data, section }: MetricsGridProps) => {
  const calculateMetrics = () => {
    const totalImpressions = data.reduce((acc, item) => acc + (item.impressions || 0), 0);
    const totalClicks = data.reduce((acc, item) => acc + (item.clicks || 0), 0);
    const totalSpent = data.reduce((acc, item) => acc + (item.amountSpent || 0), 0);
    const totalConversions = data.reduce((acc, item) => acc + (item.actionMessagingConversationsStarted || 0), 0);
    const totalActionLinkClicks = data.reduce((acc, item) => acc + (item.actionLinkClicks || 0), 0);
    const totalReach = data.reduce((acc, item) => acc + (item.reach || 0), 0);

    const calculateCTR = () => {
      if (totalImpressions === 0) return 0;
      return (totalClicks / totalImpressions) * 100;
    };

    const calculateCVR = () => {
      if (totalActionLinkClicks === 0) return 0;
      return (totalConversions / totalActionLinkClicks) * 100;
    };

    const calculateCPC = () => {
      if (totalClicks === 0) return 0;
      return totalSpent / totalClicks;
    };

    const calculateCPM = () => {
      if (totalImpressions === 0) return 0;
      return (totalSpent / totalImpressions) * 1000;
    };

    const calculateCostPerConversion = () => {
      if (totalConversions === 0) return 0;
      return totalSpent / totalConversions;
    };

    return {
      totalImpressions,
      totalClicks,
      totalSpent,
      totalConversions,
      totalActionLinkClicks,
      CTR: calculateCTR(),
      CVR: calculateCVR(),
      CPC: calculateCPC(),
      CPM: calculateCPM(),
      costPerConversion: calculateCostPerConversion(),
      totalReach
    };
  };

  const getMetrics = () => {
    const {
      totalImpressions,
      totalClicks,
      totalSpent,
      totalConversions,
      CTR,
      CVR,
      CPC,
      CPM,
      costPerConversion,
      totalReach
    } = calculateMetrics();

    const metricsConfig = [
      {
        label: 'Impressões',
        value: formatNumber(totalImpressions),
        icon: Eye,
        color: 'text-blue-500',
      },
      {
        label: 'Cliques',
        value: formatNumber(totalClicks),
        icon: MousePointer,
        color: 'text-green-500',
      },
      {
        label: 'Gasto Total',
        value: formatCurrency(totalSpent),
        icon: DollarSign,
        color: 'text-red-500',
      },
      {
        label: 'Conversões',
        value: formatNumber(totalConversions),
        icon: Users,
        color: 'text-purple-500',
      },
      {
        label: 'CTR',
        value: formatPercentage(CTR),
        icon: Target,
        color: 'text-orange-500',
        badge: 'Taxa de Cliques',
      },
      {
        label: 'CVR',
        value: formatPercentage(CVR),
        icon: Zap,
        color: 'text-teal-500',
        badge: 'Taxa de Conversão',
      },
      {
        label: 'CPC',
        value: formatCurrency(CPC),
        icon: Clock,
        color: 'text-yellow-500',
        badge: 'Custo por Clique',
      },
      {
        label: 'CPM',
        value: formatCurrency(CPM),
        icon: TrendingUp,
        color: 'text-pink-500',
        badge: 'Custo por Mil',
      },
      {
        label: 'Custo/Conv.',
        value: formatCurrency(costPerConversion),
        icon: DollarSign,
        color: 'text-indigo-500',
        badge: 'Custo por Conversão',
      },
      {
        label: 'Alcance',
        value: formatNumber(totalReach),
        icon: Eye,
        color: 'text-blue-500',
      },
    ];

    return metricsConfig;
  };

  const metrics = getMetrics();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
      {metrics.map((metric, index) => (
        <Card key={index} className="border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-lg transition-all duration-200">
          <CardContent className="p-3">
            <div className="flex items-center justify-between mb-2">
              <metric.icon className={`w-4 h-4 ${metric.color}`} />
              {metric.badge && (
                <Badge variant="outline" className="text-xs px-1 py-0">
                  {metric.badge}
                </Badge>
              )}
            </div>
            <div className="space-y-1">
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {metric.value}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight">
                {metric.label}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MetricsGrid;
