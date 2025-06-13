
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronUp, Building2 } from 'lucide-react';
import { useMetaData } from '@/hooks/useMetaData';

interface CollapsibleAccountFilterProps {
  selectedAccount: string;
  onAccountChange: (accountId: string) => void;
}

export function CollapsibleAccountFilter({ selectedAccount, onAccountChange }: CollapsibleAccountFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { adAccounts, loading } = useMetaData();

  const selectedAccountData = adAccounts.find(acc => acc.id === selectedAccount);
  const displayedAccounts = isExpanded ? adAccounts : adAccounts.slice(0, 3);

  if (loading.adAccounts) {
    return (
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="animate-pulse">
            <div className="h-4 bg-slate-200 rounded w-32 mb-2"></div>
            <div className="h-8 bg-slate-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-4 border-slate-200 dark:border-slate-700">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Conta Selecionada
              </span>
            </div>
            {adAccounts.length > 3 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs p-1 h-auto"
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="w-3 h-3 mr-1" />
                    Menos
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3 h-3 mr-1" />
                    Ver todas ({adAccounts.length})
                  </>
                )}
              </Button>
            )}
          </div>

          <Select value={selectedAccount} onValueChange={onAccountChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione uma conta">
                {selectedAccountData && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium truncate">{selectedAccountData.name}</span>
                    <span className="text-xs text-slate-500">
                      ({selectedAccountData.currency})
                    </span>
                  </div>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {displayedAccounts.map((account) => (
                <SelectItem key={account.id} value={account.id}>
                  <div className="flex items-center justify-between w-full">
                    <span className="font-medium truncate">{account.name}</span>
                    <div className="flex items-center gap-2 ml-2">
                      <span className="text-xs text-slate-500">
                        {account.currency}
                      </span>
                      <span className={`status-badge text-xs ${
                        account.account_status === 1 ? 'status-active' : 'status-paused'
                      }`}>
                        {account.account_status === 1 ? 'Ativa' : 'Inativa'}
                      </span>
                    </div>
                  </div>
                </SelectItem>
              ))}
              {!isExpanded && adAccounts.length > 3 && (
                <SelectItem value="" disabled>
                  <span className="text-xs text-slate-500">
                    +{adAccounts.length - 3} contas a mais...
                  </span>
                </SelectItem>
              )}
            </SelectContent>
          </Select>

          {selectedAccountData && (
            <div className="text-xs text-slate-500 dark:text-slate-400">
              ID: {selectedAccountData.id}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
