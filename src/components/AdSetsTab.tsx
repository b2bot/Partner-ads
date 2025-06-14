import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Edit, Eye, Pause, Play, MoreHorizontal, Plus, Filter } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useMetaData } from '@/hooks/useMetaData';
import { useAdSetInsights } from '@/hooks/useInsights';
import { useMetricsConfig } from '@/hooks/useMetricsConfig';
import { formatMetricValue } from '@/lib/metaInsights';
import { toast } from 'sonner';
import { updateAdSetWithRateLimit } from '@/lib/metaApiWithRateLimit';
import { CreateAdSetModal } from '@/components/CreateAdSetModal';
import { EditAdSetModal } from '@/components/EditAdSetModal';
import { MetricsCustomization } from '@/components/MetricsCustomization';
import { DynamicFilters } from '@/components/DynamicFilters';
import { DateRangeFilter } from '@/components/DateRangeFilter';
import { SelectedAccountDisplay } from '@/components/SelectedAccountDisplay';
import { useDateRange } from '@/hooks/useDateRange';
import type { AdSet } from '@/lib/metaApi';

export function AdSetsTab() {
  const { adSets, loading, credentials, campaigns, refetch, selectedAdAccount } = useMetaData();
  const { config, getVisibleMetrics } = useMetricsConfig();
  const { dateRange, setDateRange, getApiDateRange } = useDateRange();
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingAdSet, setEditingAdSet] = useState<AdSet | null>(null);
  const [showMetricsConfig, setShowMetricsConfig] = useState(false);
  const [filters, setFilters] = useState<any>({});
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  // Hook para insights de adsets com range de data
  const { data: adSetInsights = [], isLoading: insightsLoading } = useAdSetInsights(getApiDateRange());

  const filteredAdSets = useMemo(() => {
    let filtered = adSets || [];

    // Filtrar por conta selecionada
    if (selectedAdAccount) {
      filtered = filtered.filter(adset => adset.account_id === selectedAdAccount);
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(adset =>
        adset.name.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.campaign && filters.campaign !== 'all') {
      filtered = filtered.filter(adset => adset.campaign_id === filters.campaign);
    }

    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(adset => adset.status === filters.status);
    }

    return filtered;
  }, [adSets, filters, selectedAdAccount]);

  const sortedAdSets = useMemo(() => {
    if (!sortConfig) return filteredAdSets;

    return [...filteredAdSets].sort((a, b) => {
      const key = sortConfig.key as keyof AdSet;
      const direction = sortConfig.direction;

      const valueA = a[key];
      const valueB = b[key];

      if (valueA === undefined || valueB === undefined) {
        return 0;
      }

      let comparison = 0;
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        comparison = valueA.localeCompare(valueB);
      } else if (typeof valueA === 'number' && typeof valueB === 'number') {
        comparison = valueA - valueB;
      }

      return direction === 'asc' ? comparison : -comparison;
    });
  }, [filteredAdSets, sortConfig]);

  const handleStatusUpdate = async (adSetId: string, newStatus: string) => {
    if (!credentials?.access_token) {
      toast.error('Credenciais da Meta não encontradas.');
      return;
    }

    try {
      await updateAdSetWithRateLimit(credentials.access_token, adSetId, { status: newStatus });
      toast.success('Status do conjunto de anúncios atualizado com sucesso!');
      if (refetch && typeof refetch.adSets === 'function') {
        refetch.adSets();
      }
    } catch (error: any) {
      console.error('Erro ao atualizar status do conjunto de anúncios:', error);
      toast.error(`Erro ao atualizar status: ${error.message || 'Erro desconhecido'}`);
    }
  };

  const handleSort = (key: string) => {
    setSortConfig(currentConfig => {
      if (currentConfig?.key === key) {
        return {
          key,
          direction: currentConfig.direction === 'asc' ? 'desc' : 'asc',
        };
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

  const getMetricDisplayName = (metric: string) => {
    switch (metric) {
      case 'impressions':
        return 'Impressões';
      case 'clicks':
        return 'Cliques';
      case 'ctr':
        return 'CTR';
      case 'spend':
        return 'Gastos';
      case 'conversions':
        return 'Conversões';
      default:
        return metric;
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Conjuntos de Anúncios</h1>
          <p className="text-slate-600 mt-1 text-sm">Gerencie seus conjuntos de anúncios do Facebook Ads</p>
        </div>
        <div className="flex gap-2">
          <DateRangeFilter onDateChange={setDateRange} />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowMetricsConfig(!showMetricsConfig)}
            className="text-xs h-8"
          >
            <Filter className="h-3 w-3 mr-1" />
            Métricas
          </Button>
          <Button onClick={() => setShowCreateModal(true)} size="sm" className="text-xs h-8">
            <Plus className="h-3 w-3 mr-1" />
            Novo Conjunto
          </Button>
        </div>
      </div>

      <SelectedAccountDisplay />

      <DynamicFilters
        type="adsets"
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
            <TableRow className="text-xs">
              <TableHead onClick={() => handleSort('name')} className="cursor-pointer text-xs h-8">
                Nome
              </TableHead>
              <TableHead onClick={() => handleSort('status')} className="cursor-pointer text-xs h-8">
                Status
              </TableHead>
              <TableHead onClick={() => handleSort('campaign_name')} className="cursor-pointer text-xs h-8">
                Campanha
              </TableHead>
              {getVisibleMetrics('adsets').map(metric => (
                <TableHead key={metric} className="text-xs h-8">{getMetricDisplayName(metric)}</TableHead>
              ))}
              <TableHead className="text-right text-xs h-8">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedAdSets.map(adSet => {
              const adSetData = adSetInsights.find(insight => insight.id === adSet.id);

              return (
                <TableRow key={adSet.id} className="text-xs h-10">
                  <TableCell className="font-medium text-xs p-2">{adSet.name}</TableCell>
                  <TableCell className="p-2">
                    <Badge className={getStatusColor(adSet.status) + " text-xs"}>
                      {adSet.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs p-2">
                    {(() => {
                      const campaign = campaigns?.find(c => c.id === adSet.campaign_id);
                      return campaign?.name || '-';
                    })()}
                  </TableCell>
                  {getVisibleMetrics('adsets').map(metric => (
                    <TableCell key={metric} className="text-xs p-2">
                      {formatMetricValue(adSetData, metric)}
                    </TableCell>
                  ))}
                  <TableCell className="text-right p-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setEditingAdSet(adSet)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        {adSet.status === 'ACTIVE' ? (
                          <DropdownMenuItem onClick={() => handleStatusUpdate(adSet.id, 'PAUSED')}>
                            <Pause className="h-4 w-4 mr-2" />
                            Pausar
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => handleStatusUpdate(adSet.id, 'ACTIVE')}>
                            <Play className="h-4 w-4 mr-2" />
                            Ativar
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => {
                          if (window.confirm(`Deseja realmente arquivar o conjunto de anúncios "${adSet.name}"?`)) {
                            handleStatusUpdate(adSet.id, 'ARCHIVED');
                          }
                        }}>
                          <Eye className="h-4 w-4 mr-2" />
                          Arquivar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>

      <CreateAdSetModal 
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={() => setShowCreateModal(false)}
      />

      {editingAdSet && (
        <EditAdSetModal
          adSet={editingAdSet}
          isOpen={!!editingAdSet}
          onClose={() => setEditingAdSet(null)}
          onSuccess={() => {
            setEditingAdSet(null);
            if (refetch && typeof refetch.adSets === 'function') {
              refetch.adSets();
            }
          }}
        />
      )}
    </div>
  );
}
