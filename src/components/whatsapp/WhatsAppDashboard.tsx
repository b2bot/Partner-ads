import { Card, CardContent } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  CheckCircle2, 
  XCircle, 
  Eye,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { apiClient } from '@/integrations/apiClient';

interface DashboardMetrics {
  totalSent: number;
  totalDelivered: number;
  totalFailed: number;
  totalRead: number;
  todaySent: number;
  activeCampaigns: number;
}

export function WhatsAppDashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalSent: 0,
    totalDelivered: 0,
    totalFailed: 0,
    totalRead: 0,
    todaySent: 0,
    activeCampaigns: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const { data: messages, error: messagesError } = await apiClient
        .from('whatsapp_messages')
        .select('status, sent_at');
      if (messagesError) throw messagesError;

      const { data: campaigns, error: campaignsError } = await apiClient
        .from('whatsapp_campaigns')
        .select('id')
        .eq('is_active', true);
      if (campaignsError) throw campaignsError;

      const today = new Date().toDateString();

      const totalSent = messages?.filter(m => m.status !== 'pending').length || 0;
      const totalDelivered = messages?.filter(m => m.status === 'delivered').length || 0;
      const totalFailed = messages?.filter(m => m.status === 'failed').length || 0;
      const totalRead = messages?.filter(m => m.status === 'read').length || 0;
      const todaySent = messages?.filter(m => m.sent_at && new Date(m.sent_at).toDateString() === today).length || 0;

      setMetrics({
        totalSent,
        totalDelivered,
        totalFailed,
        totalRead,
        todaySent,
        activeCampaigns: campaigns?.length || 0,
      });
    } catch (error) {
      console.error('Error fetching metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    { title: 'Enviadas Hoje', value: metrics.todaySent, icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Total Enviadas', value: metrics.totalSent, icon: MessageSquare, color: 'text-muted-foreground', bg: 'bg-muted' },
    { title: 'Entregues', value: metrics.totalDelivered, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'Falharam', value: metrics.totalFailed, icon: XCircle, color: 'text-red-600', bg: 'bg-red-50' },
    { title: 'Visualizadas', value: metrics.totalRead, icon: Eye, color: 'text-purple-600', bg: 'bg-purple-50' },
    { title: 'Campanhas Ativas', value: metrics.activeCampaigns, icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {(loading ? Array(6).fill(null) : cards).map((card, i) => (
        <Card key={i} className="rounded-xl">
          <CardContent className="p-3">
            {loading ? (
              <div className="animate-pulse space-y-2">
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-6 bg-muted rounded w-1/3"></div>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="flex items-center justify-between mb-1">
                  <div className={`p-1.5 rounded-lg ${card.bg}`}>
                    <card.icon className={`size-4 ${card.color}`} />
                  </div>
                </div>
                <p className="text-caption text-muted-foreground font-medium">{card.title}</p>
                <p className="text-xl font-bold">{card.value.toLocaleString()}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
