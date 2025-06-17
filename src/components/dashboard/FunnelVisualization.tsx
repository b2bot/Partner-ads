
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FunnelVisualizationProps {
  data: any[];
}

const FunnelVisualization = ({ data }: FunnelVisualizationProps) => {
  // Calculate funnel metrics
  const totals = data.reduce((acc, row) => {
    acc.impressions += row.impressions || 0;
    acc.clicks += row.clicks || 0;
    acc.conversions += row.actionMessagingConversationsStarted || 0;
    return acc;
  }, { impressions: 0, clicks: 0, conversions: 0 });

  const funnelSteps = [
    { label: 'Impressões', value: totals.impressions, percentage: 100 },
    { label: 'Cliques', value: totals.clicks, percentage: totals.impressions > 0 ? (totals.clicks / totals.impressions * 100) : 0 },
    { label: 'Conversões', value: totals.conversions, percentage: totals.clicks > 0 ? (totals.conversions / totals.clicks * 100) : 0 }
  ];

  return (
    <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Funil de Conversão</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {funnelSteps.map((step, index) => (
            <div key={step.label} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{step.label}</span>
                <span>{step.value.toLocaleString()} ({step.percentage.toFixed(1)}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${step.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FunnelVisualization;
