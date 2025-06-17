
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CampaignChartsProps {
  data: any[];
}

const CampaignCharts = ({ data }: CampaignChartsProps) => {
  // Process data for charts
  const chartData = data.slice(0, 10).map(item => ({
    name: item.campaignName?.substring(0, 20) + '...' || 'Sem nome',
    impressions: item.impressions || 0,
    clicks: item.clicks || 0,
    spent: item.amountSpent || 0
  }));

  return (
    <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Performance das Campanhas</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="impressions" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CampaignCharts;
