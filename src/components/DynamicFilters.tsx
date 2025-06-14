
import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, X, Megaphone, Target, Users } from 'lucide-react';
import { useMetaData } from '@/hooks/useMetaData';

interface DynamicFiltersProps {
  type: 'campaigns' | 'adsets' | 'ads';
  onFiltersChange: (filters: any) => void;
}

export function DynamicFilters({ type, onFiltersChange }: DynamicFiltersProps) {
  const { campaigns, adSets, selectedAdAccount } = useMetaData();
  const [filters, setFilters] = useState({
    search: '',
    campaign: 'all',
    adset: 'all',
    status: 'all',
    dateRange: 'last_7_days',
  });

  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => {
      const newFilters = { ...prev, [key]: value };
      
      // Clear dependent filters when parent changes
      if (key === 'campaign') {
        newFilters.adset = 'all';
      }
      
      return newFilters;
    });
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      campaign: 'all',
      adset: 'all',
      status: 'all',
      dateRange: 'last_7_days',
    });
  };

  const getFilteredCampaigns = () => {
    if (!selectedAdAccount) return campaigns;
    return campaigns.filter(campaign => campaign.account_id === selectedAdAccount);
  };

  const getFilteredAdSets = () => {
    let filtered = adSets;
    if (selectedAdAccount) {
      filtered = filtered.filter(adset => adset.account_id === selectedAdAccount);
    }
    if (filters.campaign && filters.campaign !== 'all') {
      filtered = filtered.filter(adset => adset.campaign_id === filters.campaign);
    }
    return filtered;
  };

  const getIcon = () => {
    switch (type) {
      case 'campaigns': return Megaphone;
      case 'adsets': return Target;
      case 'ads': return Users;
      default: return Search;
    }
  };

  const Icon = getIcon();
  const typeLabel = type === 'campaigns' ? 'campanhas' : type === 'adsets' ? 'conjuntos' : 'anúncios';

  return (
    <div className="space-y-3">
      {/* Main Filters */}
      <Card className="border-slate-200 dark:border-slate-700">
        <CardContent className="p-3 space-y-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-slate-400" />
            <Input
              placeholder={`Buscar ${typeLabel}...`}
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="pl-8 text-xs h-8"
            />
          </div>

          {/* Specific Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {/* Campaign Filter (for adsets and ads) */}
            {(type === 'adsets' || type === 'ads') && (
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1">
                  <Megaphone className="w-3 h-3" />
                  Filtrar por Campanha
                </label>
                <Select value={filters.campaign} onValueChange={(value) => handleFilterChange('campaign', value)}>
                  <SelectTrigger className="text-xs h-8">
                    <SelectValue placeholder="Todas as campanhas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as campanhas</SelectItem>
                    {getFilteredCampaigns().map((campaign) => (
                      <SelectItem key={campaign.id} value={campaign.id}>
                        <span className="truncate text-xs">{campaign.name}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* AdSet Filter (only for ads) */}
            {type === 'ads' && (
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1">
                  <Target className="w-3 h-3" />
                  Filtrar por Conjunto
                </label>
                <Select value={filters.adset} onValueChange={(value) => handleFilterChange('adset', value)}>
                  <SelectTrigger className="text-xs h-8">
                    <SelectValue placeholder="Todos os conjuntos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os conjuntos</SelectItem>
                    {getFilteredAdSets().map((adset) => (
                      <SelectItem key={adset.id} value={adset.id}>
                        <span className="truncate text-xs">{adset.name}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Status Filter */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-600 dark:text-slate-400">
                Status
              </label>
              <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
                <SelectTrigger className="text-xs h-8">
                  <SelectValue placeholder="Todos os status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="ACTIVE">Ativo</SelectItem>
                  <SelectItem value="PAUSED">Pausado</SelectItem>
                  <SelectItem value="ARCHIVED">Arquivado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Clear filters button */}
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="text-xs h-7 px-2"
            >
              <X className="h-3 w-3 mr-1" />
              Limpar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
