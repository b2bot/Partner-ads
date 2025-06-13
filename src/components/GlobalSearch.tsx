
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, X, Target, Users, Megaphone } from 'lucide-react';
import { useMetaData } from '@/hooks/useMetaData';

interface SearchResult {
  id: string;
  name: string;
  type: 'campaign' | 'adset' | 'ad' | 'client';
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
  const { campaigns, adSets, ads } = useMetaData();

  useEffect(() => {
    if (searchTerm.length < 2) {
      setResults([]);
      return;
    }

    const searchResults: SearchResult[] = [];
    const term = searchTerm.toLowerCase();

    // Buscar campanhas
    campaigns.forEach(campaign => {
      if (campaign.name.toLowerCase().includes(term)) {
        searchResults.push({
          id: campaign.id,
          name: campaign.name,
          type: 'campaign',
          status: campaign.status,
        });
      }
    });

    // Buscar conjuntos de anúncios
    adSets.forEach(adset => {
      if (adset.name.toLowerCase().includes(term)) {
        searchResults.push({
          id: adset.id,
          name: adset.name,
          type: 'adset',
          status: adset.status,
        });
      }
    });

    // Buscar anúncios
    ads.forEach(ad => {
      if (ad.name.toLowerCase().includes(term)) {
        searchResults.push({
          id: ad.id,
          name: ad.name,
          type: 'ad',
          status: ad.status,
        });
      }
    });

    setResults(searchResults.slice(0, 10)); // Limitar a 10 resultados
  }, [searchTerm, campaigns, adSets, ads]);

  const getTypeIcon = (type: string) => {
    switch (type) {
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

  const handleResultClick = (result: SearchResult) => {
    onResultClick?.(result);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Buscar campanhas, conjuntos, anúncios..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="pl-10 pr-10 w-80 bg-white border-slate-200 focus:border-blue-500"
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchTerm('');
              setIsOpen(false);
            }}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-slate-100"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {/* Resultados da busca */}
      {isOpen && searchTerm.length >= 2 && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 shadow-lg border-slate-200 max-h-80 overflow-auto">
          <CardContent className="p-0">
            {results.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {results.map((result) => (
                  <button
                    key={`${result.type}-${result.id}`}
                    onClick={() => handleResultClick(result)}
                    className="w-full p-3 text-left hover:bg-slate-50 transition-colors flex items-center gap-3"
                  >
                    {getTypeIcon(result.type)}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-slate-900 truncate">{result.name}</div>
                      <div className="text-xs text-slate-500 flex items-center gap-2">
                        <span>{getTypeLabel(result.type)}</span>
                        {result.status && (
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            result.status === 'ACTIVE' 
                              ? 'bg-green-100 text-green-700' 
                              : result.status === 'PAUSED'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {result.status === 'ACTIVE' ? 'Ativo' : result.status === 'PAUSED' ? 'Pausado' : result.status}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-slate-500">
                <Search className="h-8 w-8 mx-auto mb-2 text-slate-300" />
                <p className="text-sm">Nenhum resultado encontrado</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Overlay para fechar */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
