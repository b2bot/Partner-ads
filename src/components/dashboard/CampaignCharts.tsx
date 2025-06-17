import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, AreaChart, Area } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { isWithinInterval, parseISO } from 'date-fns';

interface CampaignChartsProps {
  data: any[];
  dateRange?: { from: Date; to: Date };
}

const CampaignCharts = ({ data, dateRange }: CampaignChartsProps) => {
  const filteredData = useMemo(() => {
    if (!dateRange?.from || !dateRange?.to) return data;
    
    return data.filter(row => {
      if (!row.day) return true;
      try {
        const rowDate = parseISO(row.day);
        return isWithinInterval(rowDate, {
          start: dateRange.from,
          end: dateRange.to
        });
      } catch {
        return true;
      }
    });
  }, [data, dateRange]);

  const dailyData = useMemo(() => {
    const groups = filteredData.reduce((acc, row) => {
      const day = row.day || 'Unknown';
      if (!acc[day]) {
        acc[day] = { day, impressions: 0, clicks: 0, spent: 0, conversions: 0 };
      }
      acc[day].impressions += Number(row.impressions) || 0;
      acc[day].clicks += Number(row.clicks) || 0;
      acc[day].spent += Number(row.amountSpent) || 0;
      acc[day].conversions += Number(row.actionMessagingConversationsStarted) || 0;
      return acc;
    }, {} as Record<string, any>);

    return Object.values(groups).sort((a: any, b: any) => 
      new Date(a.day).getTime() - new Date(b.day).getTime()
    );
  }, [filteredData]);

  const campaignData = useMemo(() => {
    const groups = filteredData.reduce((acc, row) => {
      const campaign = row.campaignName || 'Unknown';
      if (!acc[campaign]) {
        acc[campaign] = { campaignName: campaign, impressions: 0, clicks: 0, spent: 0, conversions: 0 };
      }
      acc[campaign].impressions += Number(row.impressions) || 0;
      acc[campaign].clicks += Number(row.clicks) || 0;
      acc[campaign].spent += Number(row.amountSpent) || 0;
      acc[campaign].conversions += Number(row.actionMessagingConversationsStarted) || 0;
      return acc;
    }, {} as Record<string, any>);

    return Object.values(groups).slice(0, 10);
  }, [filteredData]);

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  const formatNumber = (value: number) => 
    new Intl.NumberFormat('pt-BR').format(value);

  const renderCustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border rounded-md p-2 shadow-md">
          <p className="text-sm font-semibold text-gray-800">{`Data: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.name.includes('Gasto') ? formatCurrency(entry.value) : formatNumber(entry.value)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Performance Diária
            <Badge variant="outline">{dailyData.length} dias</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={dailyData}>
              <XAxis 
                dataKey="day" 
                tickFormatter={(value) => {
                  try {
                    return new Date(value).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
                  } catch {
                    return value;
                  }
                }}
              />
              <YAxis />
              <Tooltip content={renderCustomTooltip} />
              <Area 
                type="monotone" 
                dataKey="impressions" 
                stackId="1" 
                stroke="#8884d8" 
                fill="#8884d8" 
                name="Impressões" 
              />
              <Area 
                type="monotone" 
                dataKey="clicks" 
                stackId="1" 
                stroke="#82ca9d" 
                fill="#82ca9d" 
                name="Cliques" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Performance por Campanha
            <Badge variant="outline">{campaignData.length} campanhas</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={campaignData} layout="horizontal">
              <XAxis type="number" />
              <YAxis 
                dataKey="campaignName" 
                type="category" 
                width={120}
                tickFormatter={(value) => value.length > 15 ? `${value.substring(0, 15)}...` : value}
              />
              <Tooltip content={renderCustomTooltip} />
              <Bar dataKey="impressions" fill="#8884d8" name="Impressões" />
              <Bar dataKey="clicks" fill="#82ca9d" name="Cliques" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignCharts;
