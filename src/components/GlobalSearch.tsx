
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, X, Target, Users, Megaphone, Building2 } from 'lucide-react';
import { useMetaData } from '@/hooks/useMetaData';

interface SearchResult {
  id: string;
  name: string;
  type: 'campaign' | 'adset' | 'ad' | 'account';
  status?: string;
  account?: string;
}

interface GlobalSearchProps {
  onResultClick?: (result: SearchResult) => void;
}

export function GlobalSearch({ onResultClick }: GlobalSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const { campaigns, adSets, ads, adAccounts } = useMetaData();

  useEffect(() => {
    if (searchTerm.length < 2) {
      setResults([]);
      return;
    }

    const searchResults: SearchResult[] = [];
    const term = searchTerm.toLowerCase();

    // Search accounts
    adAccounts.forEach(account => {
      if (account.name.toLowerCase().includes(term)) {
        searchResults.push({
          id: account.id,
          name: account.name,
          type: 'account',
          status: account.account_status === 1 ? 'ACTIVE' : 'INACTIVE',
        });
      }
    });

    // Search campaigns
    campaigns.forEach(campaign => {
      if (campaign.name.toLowerCase().includes(term)) {
        const account = adAccounts.find(acc => acc.id === campaign.account_id);
        searchResults.push({
          id: campaign.id,
          name: campaign.name,
          type: 'campaign',
          status: campaign.status,
          account: account?.name,
        });
      }
    });

    // Search ad sets
    adSets.forEach(adset => {
      if (adset.name.toLowerCase().includes(term)) {
        const account = adAccounts.find(acc => acc.id === adset.account_id);
        searchResults.push({
          id: adset.id,
          name: adset.name,
          type: 'adset',
          status: adset.status,
          account: account?.name,
        });
      }
    });

    // Search ads
    ads.forEach(ad => {
      if (ad.name.toLowerCase().includes(term)) {
        const adset = adSets.find(as => as.id === ad.adset_id);
        const account = adAccounts.find(acc => acc.id === adset?.account_id);
        searchResults.push({
          id: ad.id,
          name: ad.name,
          type: 'ad',
          status: ad.status,
          account: account?.name,
        });
      }
    });

    setResults(searchResults.slice(0, 10));
  }, [searchTerm, campaigns, adSets, ads, adAccounts]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'account':
        return <Building2 className="h-4 w-4 text-indigo-500" />;
      case 'campaign':
        return <Megaphone className="h-4 w-4 text-blue-500" />;
      case 'adset':
        return <Target className="h-4 w-4 text-green-500" />;
      case 'ad':
        return <Users className="h-4 w-4 text-purple-500" />;
      default:
        return <Search className="h-4 w-4 text-slate-500" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'account':
        return 'Conta';
      case 'campaign':
        return 'Campanha';
      case 'adset':
        return 'Conjunto';
      case 'ad':
        return 'Anúncio';
      default:
        return type;
    }
  };

  const getStatusBadge = (status?: string) => {
    if (!status) return null;
    
    const statusClasses = {
      ACTIVE: 'status-active',
      PAUSED: 'status-paused',
      ARCHIVED: 'status-archived',
      INACTIVE: 'status-archived'
    };
    
    const statusLabels = {
      ACTIVE: 'Ativo',
      PAUSED: 'Pausado', 
      ARCHIVED: 'Arquivado',
      INACTIVE: 'Inativo'
    };

    return (
      <span className={`status-badge ${statusClasses[status as keyof typeof statusClasses] || 'status-archived'}`}>
        {statusLabels[status as keyof typeof statusLabels] || status}
      </span>
    );
  };

  const handleResultClick = (result: SearchResult) => {
    onResultClick?.(result);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Buscar contas, campanhas, conjuntos..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="pl-10 pr-10 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 focus:border-blue-500 text-sm"
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchTerm('');
              setIsOpen(false);
            }}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {/* Search Results */}
      {isOpen && searchTerm.length >= 2 && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 shadow-lg border-slate-200 dark:border-slate-600 max-h-80 overflow-auto">
          <CardContent className="p-0">
            {results.length > 0 ? (
              <div className="divide-y divide-slate-100 dark:divide-slate-700">
                {results.map((result) => (
                  <button
                    key={`${result.type}-${result.id}`}
                    onClick={() => handleResultClick(result)}
                    className="w-full p-3 text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-3"
                  >
                    {getTypeIcon(result.type)}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-slate-900 dark:text-slate-100 truncate text-sm">
                        {result.name}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-1">
                        <span>{getTypeLabel(result.type)}</span>
                        {result.account && (
                          <span className="truncate">• {result.account}</span>
                        )}
                        {result.status && getStatusBadge(result.status)}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-slate-500 dark:text-slate-400">
                <Search className="h-8 w-8 mx-auto mb-2 text-slate-300" />
                <p className="text-sm">Nenhum resultado encontrado</p>
                <p className="text-xs mt-1">Tente buscar por nome da conta, campanha, conjunto ou anúncio</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
