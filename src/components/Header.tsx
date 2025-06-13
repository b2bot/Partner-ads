
import { Button } from '@/components/ui/button';
import { 
  Table, 
  LayoutGrid, 
  RefreshCw, 
  Download,
  Moon,
  Sun
} from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { DateRangeFilter } from './DateRangeFilter';
import { GlobalSearch } from './GlobalSearch';
import { QuickCreateButton } from './QuickCreateButton';
import { useState, useEffect } from 'react';

interface HeaderProps {
  activeTab: string;
  viewMode: 'table' | 'cards';
  setViewMode: (mode: 'table' | 'cards') => void;
}

export function Header({ activeTab, viewMode, setViewMode }: HeaderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if dark mode is enabled
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

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
      default:
        return 'Meta Ads Pro';
    }
  };

  const showViewModeControls = ['campaigns', 'adsets', 'ads'].includes(activeTab);
  const showDateFilter = ['dashboard', 'campaigns', 'adsets', 'ads'].includes(activeTab);

  return (
    <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
      <div className="container-responsive py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Left side - Title and Trigger */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <SidebarTrigger className="lg:hidden" />
            <div className="min-w-0 flex-1">
              <h1 className="font-semibold text-slate-800 dark:text-slate-200 truncate">
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
            {showDateFilter && <DateRangeFilter />}
            
            <QuickCreateButton />
            
            {/* Dark mode toggle */}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleDarkMode}
              className="hidden sm:flex"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            
            {activeTab !== 'settings' && activeTab !== 'whatsapp-reports' && activeTab !== 'metrics-objectives' && (
              <>
                <Button variant="outline" size="sm" className="hidden md:flex btn-compact">
                  <RefreshCw className="w-3 h-3 mr-1" />
                  <span className="hidden lg:inline">Atualizar</span>
                </Button>
                
                <Button variant="outline" size="sm" className="hidden md:flex btn-compact">
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
                  className="h-7 w-7 p-0"
                >
                  <LayoutGrid className="w-3 h-3" />
                </Button>
                <Button
                  variant={viewMode === 'table' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('table')}
                  className="h-7 w-7 p-0"
                >
                  <Table className="w-3 h-3" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile search */}
        <div className="lg:hidden mt-3">
          <GlobalSearch />
        </div>
      </div>
    </header>
  );
}
