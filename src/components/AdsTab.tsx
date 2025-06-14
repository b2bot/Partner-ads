import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Edit, Eye, Pause, Play, MoreHorizontal, Plus, Filter } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useMetaData } from '@/hooks/useMetaData';
import { useAdInsights } from '@/hooks/useInsights';
import { useMetricsConfig } from '@/hooks/useMetricsConfig';
import { formatMetricValue } from '@/lib/metaInsights';
import { toast } from 'sonner';
import { updateAdWithRateLimit } from '@/lib/metaApiWithRateLimit';
import { CreateAdModal } from '@/components/CreateAdModal';
import { EditAdModal } from '@/components/EditAdModal';
import { MetricsCustomization } from '@/components/MetricsCustomization';
import { DynamicFilters } from '@/components/DynamicFilters';
import { DateRangeFilter } from '@/components/DateRangeFilter';
import { useDateRange } from '@/hooks/useDateRange';

interface Ad {
  id: string;
  name: string;
  status: string;
  adset_id: string;
  adset_name?: string;
  campaign_id?: string;
  campaign_name?: string;
  account_id: string;
  created_time: string;
}

export function AdsTab() {
  const { ads, loading, credentials, campaigns, adSets, refetch } = useMetaData();
  const { config, getVisibleMetrics } = useMetricsConfig();
  const { dateRange, setDateRange, getApiDateRange } = useDateRange();
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingAd, setEditingAd] = useState<Ad | null>(null);
  const [showMetricsConfig, setShowMetricsConfig] = useState(false);
  const [filters, setFilters] = useState<any>({});
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  // Hook para insights de ads com range de data
  const { data: adInsights = [], isLoading: insightsLoading } = useAdInsights(getApiDateRange());

  const filteredAds = useMemo(() => {
    let filtered = ads || [];

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(ad =>
        ad.name.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.account) {
      filtered = filtered.filter(ad => ad.account_id === filters.account);
    }

    if (filters.campaign) {
      filtered = filtered.filter(ad => ad.campaign_id === filters.campaign);
    }

    if (filters.adset) {
      filtered = filtered.filter(ad => ad.adset_id === filters.adset);
    }

    if (filters.status) {
      filtered = filtered.filter(ad => ad.status === filters.status);
    }

    return filtered;
  }, [ads, filters]);

  const sortedAds = useMemo(() => {
    if (!sortConfig) return filteredAds;

    return [...filteredAds].sort((a, b) => {
      const key = sortConfig.key as keyof Ad;
      const direction = sortConfig.direction;

      const valueA = a[key];
      const valueB = b[key];

      if (valueA === undefined || valueA === null) return direction === 'asc' ? -1 : 1;
      if (valueB === undefined || valueB === null) return direction === 'asc' ? 1 : -1;

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return direction === 'asc' ? valueA - valueB : valueB - valueA;
      }

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return direction === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      }

      return 0;
    });
  }, [filteredAds, sortConfig]);

  const handleStatusUpdate = async (ad: Ad, newStatus: string) => {
    if (!credentials?.access_token) {
      toast.error('Credenciais da Meta não encontradas.');
      return;
    }

    try {
      await updateAdWithRateLimit(credentials.access_token, ad.id, { status: newStatus });
      toast.success(`Anúncio "${ad.name}" ${newStatus === 'PAUSED' ? 'pausado' : 'ativado'} com sucesso.`);
      refetch.ads();
    } catch (error: any) {
      console.error('Erro ao atualizar status do anúncio:', error);
      toast.error(`Erro ao atualizar o anúncio "${ad.name}": ${error.message || 'Erro desconhecido'}`);
    }
  };

  const handleSort = (key: string) => {
    setSortConfig(currentConfig => {
      if (currentConfig?.key === key) {
        return { key, direction: currentConfig.direction === 'asc' ? 'desc' : 'asc' };
      } else {
        return { key, direction: 'asc' };
      }
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'PAUSED':
        return 'bg-yellow-100 text-yellow-800';
      case 'ARCHIVED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Anúncios</h1>
          <p className="text-slate-600 mt-2">Gerencie seus anúncios do Facebook Ads</p>
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
            Novo Anúncio
          </Button>
        </div>
      </div>

      <DynamicFilters
        type="ads"
        onFiltersChange={setFilters}
      />

      {showMetricsConfig && (
        <MetricsCustomization
          type="ads"
          onClose={() => setShowMetricsConfig(false)}
        />
      )}

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead onClick={() => handleSort('name')} className="cursor-pointer">
                Nome
                {sortConfig?.key === 'name' && (sortConfig.direction === 'asc' ? ' ▲' : ' ▼')}
              </TableHead>
              <TableHead onClick={() => handleSort('status')} className="cursor-pointer">
                Status
                {sortConfig?.key === 'status' && (sortConfig.direction === 'asc' ? ' ▲' : ' ▼')}
              </TableHead>
              <TableHead>Conjunto</TableHead>
              <TableHead>Campanha</TableHead>
              {config?.ads?.map((metric) => (
                <TableHead key={metric}>{metric}</TableHead>
              ))}
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedAds.map((ad) => {
              const adInsightsData = adInsights.find(insight => insight.id === ad.id);

              return (
                <TableRow key={ad.id}>
                  <TableCell className="font-medium">{ad.name}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(ad.status)}>
                      {ad.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{ad.adset_name}</TableCell>
                  <TableCell>{ad.campaign_name}</TableCell>
                  {config?.ads?.map((metric) => (
                    <TableCell key={metric}>
                      {formatMetricValue(adInsightsData, metric)}
                    </TableCell>
                  ))}
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setEditingAd(ad)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        {ad.status === 'ACTIVE' ? (
                          <DropdownMenuItem onClick={() => handleStatusUpdate(ad, 'PAUSED')}>
                            <Pause className="h-4 w-4 mr-2" />
                            Pausar
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => handleStatusUpdate(ad, 'ACTIVE')}>
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

      <CreateAdModal open={showCreateModal} onClose={() => setShowCreateModal(false)} />
      <EditAdModal ad={editingAd} open={!!editingAd} onClose={() => setEditingAd(null)} />
    </div>
  );
}
