
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, MousePointer, Users, DollarSign } from 'lucide-react';

interface MetricsOverviewProps {
  data: any[];
}

const MetricsOverview = ({ data }: MetricsOverviewProps) => {
  const totalImpressions = data.reduce((acc, item) => acc + (item.impressions || 0), 0);
  const totalClicks = data.reduce((acc, item) => acc + (item.clicks || 0), 0);
  const totalSpent = data.reduce((acc, item) => acc + (item.amountSpent || 0), 0);
  const totalConversions = data.reduce((acc, item) => acc + (item.actionMessagingConversationsStarted || 0), 0);

  const formatNumber = (num: number) => new Intl.NumberFormat('pt-BR').format(num);
  const formatCurrency = (num: number) => new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(num);

  const metrics = [
    {
      title: 'Impressões',
      value: formatNumber(totalImpressions),
      icon: Eye,
      color: 'text-blue-500'
    },
    {
      title: 'Cliques',
      value: formatNumber(totalClicks),
      icon: MousePointer,
      color: 'text-green-500'
    },
    {
      title: 'Gasto Total',
      value: formatCurrency(totalSpent),
      icon: DollarSign,
      color: 'text-red-500'
    },
    {
      title: 'Conversões',
      value: formatNumber(totalConversions),
      icon: Users,
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index} className="border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {metric.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {metric.value}
                </p>
              </div>
              <metric.icon className={`w-8 h-8 ${metric.color}`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MetricsOverview;
