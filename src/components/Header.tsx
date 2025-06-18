
import { Button } from '@/components/ui/button';
import { 
  RefreshCw, 
  Download
} from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { GlobalSearch } from './GlobalSearch';
import { ClientGreeting } from './ClientGreeting';
import { useAuth } from '@/hooks/useAuth';

interface HeaderProps {
  activeTab: string;
  viewMode: 'table' | 'cards';
  setViewMode: (mode: 'table' | 'cards') => void;
}

export function Header({ activeTab, viewMode, setViewMode }: HeaderProps) {
  const { isCliente, isAdmin } = useAuth();

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

  console.log('Header render - isCliente:', isCliente, 'isAdmin:', isAdmin);

  return (
    <header className="premium-header">
      <div className="premium-container py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Left side - Title and Trigger */}
          <div className="flex items-center gap-4 min-w-0 flex-1">
            <SidebarTrigger className="lg:hidden" />
            <div className="min-w-0 flex-1">
              <h1 className="text-heading-4 text-slate-800 dark:text-slate-200 truncate">
                {getTabTitle()}
              </h1>
              <p className="text-caption text-slate-500 dark:text-slate-400 truncate">
                {isCliente ? 'Área do Cliente' : 'Gerencie suas campanhas do Facebook Ads'}
              </p>
            </div>
          </div>

          {/* Center - Global Search (only for admin) */}
          {isAdmin && !isCliente && (
            <div className="hidden lg:flex flex-1 justify-center max-w-md">
              <GlobalSearch />
            </div>
          )}

          {/* Right side - Controls */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Client greeting and logout - Always show for clients */}
            {isCliente && <ClientGreeting />}
            
            {/* Admin controls - Only show for admins */}
            {isAdmin && !isCliente && activeTab !== 'settings' && activeTab !== 'whatsapp-reports' && activeTab !== 'metrics-objectives' && (
              <>
                <Button variant="outline" size="sm" className="premium-button hidden md:flex text-xs h-9 px-4 font-semibold">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  <span className="hidden lg:inline">Atualizar</span>
                </Button>
                
                <Button variant="outline" size="sm" className="premium-button hidden md:flex text-xs h-9 px-4 font-semibold">
                  <Download className="w-4 h-4 mr-2" />
                  <span className="hidden lg:inline">Exportar</span>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile search - Only for admin */}
        {isAdmin && !isCliente && (
          <div className="lg:hidden mt-4">
            <GlobalSearch />
          </div>
        )}
      </div>
    </header>
  );
}
