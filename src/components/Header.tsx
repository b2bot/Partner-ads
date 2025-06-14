
import { Button } from '@/components/ui/button';
import { 
  Table, 
  LayoutGrid, 
  RefreshCw, 
  Download
} from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { GlobalSearch } from './GlobalSearch';

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
        return 'Relatórios WhatsApp';
      case 'metrics-objectives':
        return 'Métricas';
      case 'settings':
        return 'Configurações';
      case 'tickets':
        return 'Chamados';
      case 'creatives':
        return 'Criativos';
      case 'clients-management':
        return 'Gerenciar Clientes';
      default:
        return 'Meta Ads Pro';
    }
  };

  const showViewModeControls = ['campaigns', 'adsets', 'ads'].includes(activeTab);

  return (
    <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
      <div className="container-responsive py-2">
        <div className="flex items-center justify-between gap-4">
          {/* Left side - Title and Trigger */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <SidebarTrigger className="lg:hidden" />
            <div className="min-w-0 flex-1">
              <h1 className="text-base font-semibold text-slate-800 dark:text-slate-200 truncate">
                {getTabTitle()}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                Gerencie suas campanhas do Facebook Ads
              </p>
            </div>
          </div>

          {/* Center - Global Search */}
          <div className="hidden lg:flex flex-1 justify-center max-w-sm">
            <GlobalSearch />
          </div>

          {/* Right side - Controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {activeTab !== 'settings' && activeTab !== 'whatsapp-reports' && activeTab !== 'metrics-objectives' && (
              <>
                <Button variant="outline" size="sm" className="hidden md:flex text-xs h-8 px-3">
                  <RefreshCw className="w-3 h-3 mr-1" />
                  <span className="hidden lg:inline">Atualizar</span>
                </Button>
                
                <Button variant="outline" size="sm" className="hidden md:flex text-xs h-8 px-3">
                  <Download className="w-3 h-3 mr-1" />
                  <span className="hidden lg:inline">Exportar</span>
                </Button>
              </>
            )}

            {showViewModeControls && (
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                <Button
                  variant={viewMode === 'cards' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('cards')}
                  className="h-6 w-6 p-0"
                >
                  <LayoutGrid className="w-3 h-3" />
                </Button>
                <Button
                  variant={viewMode === 'table' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('table')}
                  className="h-6 w-6 p-0"
                >
                  <Table className="w-3 h-3" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile search */}
        <div className="lg:hidden mt-2">
          <GlobalSearch />
        </div>
      </div>
    </header>
  );
}
