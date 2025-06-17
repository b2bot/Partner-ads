
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';

interface ChartData {
  day?: string;
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

interface CampaignChartsProps {
  data: ChartData[];
}

const CampaignCharts: React.FC<CampaignChartsProps> = ({ data }) => {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    // Group data by day and aggregate
    const groupedByDay = data.reduce((acc, item) => {
      const day = item.day || 'Sem data';
      if (!acc[day]) {
        acc[day] = {
          day,
          impressions: 0,
          clicks: 0,
          amountSpent: 0,
          reach: 0,
          cpm: 0,
          cpc: 0,
        };
      }
      
      acc[day].impressions += item.impressions || 0;
      acc[day].clicks += item.clicks || 0;
      acc[day].amountSpent += item.amountSpent || 0;
      acc[day].reach += item.reach || 0;
      acc[day].cpm += item.cpm || 0;
      acc[day].cpc += item.cpc || 0;
      
      return acc;
    }, {} as Record<string, any>);

    return Object.values(groupedByDay)
      .sort((a: any, b: any) => {
        if (a.day === 'Sem data') return 1;
        if (b.day === 'Sem data') return -1;
        return new Date(a.day).getTime() - new Date(b.day).getTime();
      })
      .slice(-7); // Last 7 days
  }, [data]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('pt-BR').format(value);
  };

  const formatDate = (dateString: string) => {
    if (dateString === 'Sem data') return dateString;
    try {
      return new Date(dateString).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  if (!data || data.length === 0) {
    return (
      <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm h-96">
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Sem dados para gráficos
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Os gráficos serão exibidos quando houver dados disponíveis.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Impressões e Cliques ao longo do tempo */}
      <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Performance ao Longo do Tempo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorImpressions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="day" 
                stroke="#6b7280"
                fontSize={12}
                tickFormatter={formatDate}
              />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip 
                labelFormatter={formatDate}
                formatter={(value: number, name: string) => [
                  formatNumber(value),
                  name === 'impressions' ? 'Impressões' : 'Cliques'
                ]}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area
                type="monotone"
                dataKey="impressions"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#colorImpressions)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="clicks"
                stroke="#10b981"
                fillOpacity={1}
                fill="url(#colorClicks)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Gastos por Dia */}
      <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Gastos por Dia
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="day" 
                stroke="#6b7280"
                fontSize={12}
                tickFormatter={formatDate}
              />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip 
                labelFormatter={formatDate}
                formatter={(value: number) => [formatCurrency(value), 'Gasto']}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar 
                dataKey="amountSpent" 
                fill="#f59e0b"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignCharts;
