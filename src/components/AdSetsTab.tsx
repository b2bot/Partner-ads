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
import { useDateRange } from '@/hooks/useDateRange';

interface AdSet {
  id: string;
  name: string;
  status: string;
  campaign_id: string;
  account_id: string;
  created_time: string;
  targeting?: any;
  updated_time?: string;
}

export function AdSetsTab() {
  const { adSets, loading, credentials, campaigns, refetch } = useMetaData();
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

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(adset =>
        adset.name.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.account) {
      filtered = filtered.filter(adset => adset.account_id === filters.account);
    }

    if (filters.campaign) {
      filtered = filtered.filter(adset => adset.campaign_id === filters.campaign);
    }

    if (filters.status) {
      filtered = filtered.filter(adset => adset.status === filters.status);
    }

    return filtered;
  }, [adSets, filters]);

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
        refetch.adSets(); // Corrige o erro "not callable"
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

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Conjuntos de Anúncios</h1>
          <p className="text-slate-600 mt-2">Gerencie seus conjuntos de anúncios do Facebook Ads</p>
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
            Novo Conjunto
          </Button>
        </div>
      </div>

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
            <TableRow>
              <TableHead onClick={() => handleSort('name')} className="cursor-pointer">
                Nome
              </TableHead>
              <TableHead onClick={() => handleSort('status')} className="cursor-pointer">
                Status
              </TableHead>
              <TableHead onClick={() => handleSort('campaign_name')} className="cursor-pointer">
                Campanha
              </TableHead>
              {getVisibleMetrics('adsets').map(metric => (
                <TableHead key={metric}>{metric}</TableHead>
              ))}
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedAdSets.map(adSet => {
              const adSetData = adSetInsights.find(insight => insight.id === adSet.id);

              // Garantir que targeting e updated_time existam para tipagem correta
              const safeAdSet = {
                ...adSet,
                targeting: adSet.targeting ?? {},
                updated_time: adSet.updated_time ?? "",
              };

              return (
                <TableRow key={adSet.id}>
                  <TableCell className="font-medium">{adSet.name}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(adSet.status)}>
                      {adSet.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {(() => {
                      const campaign = campaigns?.find(c => c.id === adSet.campaign_id);
                      return campaign?.name || '-';
                    })()}
                  </TableCell>
                  {getVisibleMetrics('adsets').map(metric => (
                    <TableCell key={metric}>
                      {formatMetricValue(adSetData, metric)}
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
                        <DropdownMenuItem onClick={() => setEditingAdSet(safeAdSet)}>
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

      {showCreateModal && (
        <CreateAdSetModal 
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => setShowCreateModal(false)}
        />
      )}

      {editingAdSet && (
        <EditAdSetModal
          onClose={() => setEditingAdSet(null)}
          adSet={editingAdSet}
        />
      )}
    </div>
  );
}
