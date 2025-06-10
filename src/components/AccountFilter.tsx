
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useMetaData } from '@/hooks/useMetaData';
import { Building2 } from 'lucide-react';

export function AccountFilter() {
  const { adAccounts, selectedAdAccount, setSelectedAdAccount, selectedAdAccountName } = useMetaData();

  if (!adAccounts || adAccounts.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <Building2 className="w-4 h-4 text-slate-600" />
        <Label className="text-sm font-medium text-slate-700">Conta de Anúncios:</Label>
      </div>
      <Select value={selectedAdAccount} onValueChange={setSelectedAdAccount}>
        <SelectTrigger className="w-[300px]">
          <SelectValue placeholder="Selecione uma conta">
            {selectedAdAccountName && (
              <div className="flex items-center gap-2">
                <span className="font-medium">{selectedAdAccountName}</span>
                <span className="text-xs text-slate-500">({selectedAdAccount.replace('act_', '')})</span>
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {adAccounts.map((account) => (
            <SelectItem key={account.id} value={account.id}>
              <div className="flex flex-col">
                <span className="font-medium">{account.name}</span>
                <span className="text-xs text-slate-500">{account.id.replace('act_', '')}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
