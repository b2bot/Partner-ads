
import { Button } from '@/components/ui/button';
import { 
  Table, 
  LayoutGrid, 
  RefreshCw, 
  Download
} from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { DateRangeFilter } from './DateRangeFilter';
import { GlobalSearch } from './GlobalSearch';
import { QuickCreateButton } from './QuickCreateButton';

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
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 p-4">
      <div className="flex items-center justify-between gap-4">
        {/* Lado esquerdo - Título e Trigger */}
        <div className="flex items-center gap-4 min-w-0">
          <SidebarTrigger className="lg:hidden" />
          <div className="min-w-0">
            <h1 className="text-2xl font-bold text-slate-800 truncate">{getTabTitle()}</h1>
            <p className="text-sm text-slate-500 truncate">Gerencie suas campanhas do Facebook Ads</p>
          </div>
        </div>

        {/* Centro - Busca Global (apenas para admins) */}
        <div className="hidden lg:flex flex-1 justify-center max-w-md">
          <GlobalSearch />
        </div>

        {/* Lado direito - Controles */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {showDateFilter && <DateRangeFilter />}
          
          <QuickCreateButton />
          
          {activeTab !== 'settings' && activeTab !== 'whatsapp-reports' && activeTab !== 'metrics-objectives' && (
            <>
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <RefreshCw className="w-4 h-4 mr-2" />
                Atualizar
              </Button>
              
              <Button variant="outline" size="sm" className="hidden sm:flex">
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

      {/* Busca mobile */}
      <div className="lg:hidden mt-4">
        <GlobalSearch />
      </div>
    </header>
  );
}
