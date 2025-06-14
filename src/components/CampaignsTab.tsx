
import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Edit, Eye, Pause, Play, MoreHorizontal, Plus, Filter } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useMetaData } from '@/hooks/useMetaData';
import { useCampaignInsights } from '@/hooks/useInsights';
import { useMetricsConfig } from '@/hooks/useMetricsConfig';
import { formatMetricValue } from '@/lib/metaInsights';
import { toast } from 'sonner';
import { updateCampaignWithRateLimit } from '@/lib/metaApiWithRateLimit';
import { CreateCampaignModal } from '@/components/CreateCampaignModal';
import { EditCampaignModal } from '@/components/EditCampaignModal';
import { MetricsCustomization } from '@/components/MetricsCustomization';
import { DynamicFilters } from '@/components/DynamicFilters';
import { DateRangeFilter } from '@/components/DateRangeFilter';
import { useDateRange } from '@/hooks/useDateRange';
import type { Campaign } from '@/lib/metaApi';

export function CampaignsTab() {
  const { campaigns, loading, credentials, refetch } = useMetaData();
  const { config, getVisibleMetrics } = useMetricsConfig();
  const { dateRange, setDateRange, getApiDateRange } = useDateRange();
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [showMetricsConfig, setShowMetricsConfig] = useState(false);
  const [filters, setFilters] = useState<any>({});
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  // Hook para insights de campanhas com range de data
  const { data: campaignInsights = [], isLoading: insightsLoading } = useCampaignInsights(getApiDateRange());

  const filteredCampaigns = useMemo(() => {
    let filtered = campaigns || [];

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(campaign =>
        campaign.name.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.account) {
      filtered = filtered.filter(campaign => campaign.account_id === filters.account);
    }

    if (filters.status) {
      filtered = filtered.filter(campaign => campaign.status === filters.status);
    }

    return filtered;
  }, [campaigns, filters]);

  const sortedCampaigns = useMemo(() => {
    if (!sortConfig) return filteredCampaigns;

    return [...filteredCampaigns].sort((a, b) => {
      const direction = sortConfig.direction === 'asc' ? 1 : -1;
      const key = sortConfig.key;

      const valueA = (a as any)[key];
      const valueB = (b as any)[key];

      if (valueA < valueB) return -1 * direction;
      if (valueA > valueB) return 1 * direction;
      return 0;
    });
  }, [filteredCampaigns, sortConfig]);

  const handleStatusUpdate = async (campaignId: string, newStatus: string) => {
    if (!credentials?.access_token) {
      toast.error('Credenciais da Meta não encontradas.');
      return;
    }

    try {
      await updateCampaignWithRateLimit(credentials.access_token, campaignId, { status: newStatus });
      toast.success(`Campanha ${campaignId} ${newStatus === 'PAUSED' ? 'pausada' : 'ativada'} com sucesso!`);
      refetch.campaigns();
    } catch (error: any) {
      console.error('Erro ao atualizar status da campanha:', error);
      toast.error(`Erro ao atualizar status da campanha ${campaignId}: ${error.message || 'Erro desconhecido'}`);
    }
  };

  const handleSort = (key: string) => {
    setSortConfig(prevConfig => {
      if (prevConfig?.key === key) {
        return {
          key,
          direction: prevConfig.direction === 'asc' ? 'desc' : 'asc',
        };
      } else {
        return { key, direction: 'asc' };
      }
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Campanhas</h1>
          <p className="text-slate-600 mt-2">Gerencie suas campanhas do Facebook Ads</p>
        </div>
        <div className="flex gap-2">
          <DateRangeFilter onDateChange={setDateRange} />
          <Button
            variant="outline"
            onClick={() => setShowMetricsConfig(!showMetricsConfig)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Métricas
          </Button>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Campanha
          </Button>
        </div>
      </div>

      <DynamicFilters
        type="campaigns"
        onFiltersChange={setFilters}
      />

      {showMetricsConfig && (
        <MetricsCustomization
          onClose={() => setShowMetricsConfig(false)}
        />
      )}

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead onClick={() => handleSort('name')} className="cursor-pointer">
                Nome
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Objetivo</TableHead>
              {getVisibleMetrics('campaigns').map(metric => (
                <TableHead key={metric}>{metric}</TableHead>
              ))}
              <TableHead>Criada em</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCampaigns.map(campaign => {
              const campaignData = campaignInsights.find(item => item?.id === campaign.id);
              
              return (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell>
                    <Badge variant={campaign.status === 'ACTIVE' ? 'outline' : 'secondary'}>
                      {campaign.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{campaign.objective}</TableCell>
                  {getVisibleMetrics('campaigns').map(metric => (
                    <TableCell key={metric}>
                      {formatMetricValue(campaignData, metric)}
                    </TableCell>
                  ))}
                  <TableCell>{new Date(campaign.created_time).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setEditingCampaign(campaign)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        {campaign.status === 'ACTIVE' ? (
                          <DropdownMenuItem onClick={() => handleStatusUpdate(campaign.id, 'PAUSED')}>
                            <Pause className="h-4 w-4 mr-2" />
                            Pausar
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => handleStatusUpdate(campaign.id, 'ACTIVE')}>
                            <Play className="h-4 w-4 mr-2" />
                            Ativar
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>

      <CreateCampaignModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={() => setShowCreateModal(false)}
      />

      {editingCampaign && (
        <EditCampaignModal
          campaign={editingCampaign}
          isOpen={!!editingCampaign}
          onClose={() => setEditingCampaign(null)}
          onSuccess={() => {
            setEditingCampaign(null);
            refetch.campaigns();
          }}
        />
      )}
    </div>
  );
}
