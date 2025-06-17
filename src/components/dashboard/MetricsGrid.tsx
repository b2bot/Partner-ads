
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Eye, MousePointer, DollarSign, MessageCircle } from 'lucide-react';

interface MetricsGridProps {
  data: any[];
  section: string;
}

const MetricsGrid = ({ data }: MetricsGridProps) => {
  // Calculate totals from data
  const totals = data.reduce((acc, row) => {
    acc.impressions += row.impressions || 0;
    acc.clicks += row.clicks || 0;
    acc.amountSpent += row.amountSpent || 0;
    acc.conversions += row.actionMessagingConversationsStarted || 0;
    return acc;
  }, { impressions: 0, clicks: 0, amountSpent: 0, conversions: 0 });

  const ctr = totals.impressions > 0 ? (totals.clicks / totals.impressions * 100) : 0;
  const cpc = totals.clicks > 0 ? (totals.amountSpent / totals.clicks) : 0;

  const metrics = [
    {
      title: 'Impressões',
      value: totals.impressions.toLocaleString(),
      icon: Eye,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      title: 'Cliques',
      value: totals.clicks.toLocaleString(),
      icon: MousePointer,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      title: 'Valor Gasto',
      value: `R$ ${totals.amountSpent.toFixed(2)}`,
      icon: DollarSign,
      color: 'text-red-600',
      bgColor: 'bg-red-100 dark:bg-red-900/30',
    },
    {
      title: 'CTR',
      value: `${ctr.toFixed(2)}%`,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    },
    {
      title: 'CPC Médio',
      value: `R$ ${cpc.toFixed(2)}`,
      icon: TrendingDown,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    },
    {
      title: 'Conversões',
      value: totals.conversions.toLocaleString(),
      icon: MessageCircle,
      color: 'text-teal-600',
      bgColor: 'bg-teal-100 dark:bg-teal-900/30',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <Card key={metric.title} className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {metric.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {metric.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${metric.bgColor}`}>
                  <Icon className={`h-6 w-6 ${metric.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default MetricsGrid;
