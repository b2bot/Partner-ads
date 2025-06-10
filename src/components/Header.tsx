
import { Button } from '@/components/ui/button';
import { 
  Table, 
  LayoutGrid, 
  RefreshCw, 
  Download
} from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { DateRangeFilter } from './DateRangeFilter';

interface HeaderProps {
  activeTab: string;
  viewMode: 'table' | 'cards';
  setViewMode: (mode: 'table' | 'cards') => void;
}

export function Header({ activeTab, viewMode, setViewMode }: HeaderProps) {
  const getTabTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Dashboard';
      case 'campaigns':
        return 'Campanhas';
      case 'adsets':
        return 'Conjuntos de Anúncios';
      case 'ads':
        return 'Anúncios';
      case 'whatsapp-reports':
        return 'Relatórios via WhatsApp';
      case 'metrics-objectives':
        return 'Objetivos de Métricas';
      case 'settings':
        return 'Configurações';
      default:
        return 'Meta Ads Pro';
    }
  };

  const showViewModeControls = ['campaigns', 'adsets', 'ads'].includes(activeTab);
  const showDateFilter = ['dashboard', 'campaigns', 'adsets', 'ads'].includes(activeTab);

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="lg:hidden" />
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{getTabTitle()}</h1>
            <p className="text-sm text-slate-500">Gerencie suas campanhas do Facebook Ads</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {showDateFilter && <DateRangeFilter />}
          
          {activeTab !== 'settings' && activeTab !== 'whatsapp-reports' && activeTab !== 'metrics-objectives' && (
            <>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Atualizar
              </Button>
              
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </>
          )}

          {showViewModeControls && (
            <div className="flex items-center bg-slate-100 rounded-lg p-1">
              <Button
                variant={viewMode === 'cards' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('cards')}
                className="h-8"
              >
                <LayoutGrid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'table' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('table')}
                className="h-8"
              >
                <Table className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
