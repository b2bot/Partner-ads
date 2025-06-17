import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, MousePointer, Users, Zap } from 'lucide-react';

interface FunnelVisualizationProps {
  data: any[];
  platform?: string;
}

const FunnelVisualization = ({ data, platform }: FunnelVisualizationProps) => {
  const [metric, setMetric] = React.useState('impressions');

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  const metricsMap: { [key: string]: { label: string; icon: any } } = {
    impressions: { label: 'Impressões', icon: Eye },
    clicks: { label: 'Cliques', icon: MousePointer },
    conversions: { label: 'Conversões', icon: Users },
    ctr: { label: 'CTR', icon: Zap },
  };

  const formatNumber = (num: number) => num ? new Intl.NumberFormat('pt-BR').format(num) : '0';
  const formatPercentage = (num: number) => num ? new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num) : '0%';

  const getFunnelData = () => {
    if (!data || data.length === 0) return [];

    let impressions = data.reduce((acc, item) => acc + (item.impressions || 0), 0);
    let clicks = data.reduce((acc, item) => acc + (item.clicks || 0), 0);
    let conversions = data.reduce((acc, item) => acc + (item.actionMessagingConversationsStarted || 0), 0);

    if (metric === 'ctr') {
      impressions = 1;
      clicks = data.reduce((acc, item) => acc + (item.actionLinkClicks || 0), 0);
      conversions = clicks > 0 ? conversions / clicks : 0;
    }

    const funnelData = [
      { name: 'Impressões', value: impressions },
      { name: 'Cliques', value: clicks },
      { name: 'Conversões', value: conversions },
    ];

    return funnelData;
  };

  const funnelData = getFunnelData();

  const renderCustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      let formattedValue = formatNumber(dataPoint.value);

      if (metric === 'ctr') {
        formattedValue = formatPercentage(dataPoint.value);
      }

      return (
        <div className="bg-white border rounded-md p-2 shadow-md">
          <p className="text-sm font-semibold text-gray-800">{`${dataPoint.name}: ${formattedValue}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <Card className="border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Funil de Conversão</CardTitle>
          <Select value={metric} onValueChange={setMetric}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione a métrica" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(metricsMap).map(([key, { label }]) => (
                <SelectItem key={key} value={key}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={funnelData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {
                funnelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))
              }
            </Pie>
            <Tooltip content={renderCustomTooltip} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default FunnelVisualization;
