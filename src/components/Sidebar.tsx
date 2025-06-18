import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { 
  BarChart3, 
  Settings, 
  MessageSquare,
  Target,
  Palette,
  Users,
  FileText,
  Activity,
  Moon,
  Sun,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Permission } from '@/types/auth';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { hasPermission, isRootAdmin, isCliente, profile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    setIsDarkMode(theme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      window.location.reload();
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };

  const isItemActive = (itemTab: string) => location.pathname.includes(itemTab);

  const mainMenuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: BarChart3,
      permission: 'access_dashboard' as Permission
    },
    { 
      id: 'relatorios', 
      label: 'Relatórios', 
      icon: FileText,
      permission: 'access_client_reports' as Permission
    },
  ];

  const whatsappItems = [
    { 
      id: 'whatsapp-reports', 
      label: 'Relatórios WhatsApp', 
      icon: MessageSquare,
      permission: 'access_whatsapp' as Permission
    },
  ];

  const mediaItems = [
    { 
      id: 'campaigns', 
      label: 'Campanhas', 
      icon: Target,
      permission: 'access_paid_media' as Permission
    },
    { 
      id: 'adsets', 
      label: 'Conjuntos de Anúncios', 
      icon: Target,
      permission: 'access_paid_media' as Permission
    },
    { 
      id: 'ads', 
      label: 'Anúncios', 
      icon: Target,
      permission: 'access_paid_media' as Permission
    },
    {
      id: 'resultados',
      label: 'Resultados',
      icon: BarChart3,
      permission: 'access_paid_media' as Permission
    },
  ];

  const managementItems = [
    { 
      id: 'tickets', 
      label: hasPermission('access_tasks') ? 'Gerenciar Chamados' : 'Meus Chamados', 
      icon: FileText,
      permission: 'access_calls' as Permission
    },
    { 
      id: 'creatives', 
      label: hasPermission('access_creatives') ? 'Gerenciar Criativos' : 'Meus Criativos', 
      icon: Palette,
      permission: 'access_creatives' as Permission
    },
    { 
      id: 'metrics-objectives', 
      label: 'Métricas e Objetivos', 
      icon: Target,
      permission: 'view_metrics' as Permission
    },
  ];

  const systemItems = [
    { 
      id: 'activity-log', 
      label: 'Log de Atividades', 
      icon: Activity,
      permission: 'view_system_logs' as Permission
    },
    { 
      id: 'settings', 
      label: 'Configurações', 
      icon: Settings,
      permission: null
    },
  ];

  const canAccessSettings = hasPermission('manage_api_settings') || 
                           hasPermission('manage_user_settings') || 
                           hasPermission('manage_collaborators') || 
                           isRootAdmin;

  const renderMenuItems = (items: any[], showBadge = false) => {
    return items
      .filter(item => {
        if (item.id === 'settings') {
          return canAccessSettings;
        }
        return item.permission ? hasPermission(item.permission) : true;
      })
      .map((item) => (
        <div key={item.id} className="mb-1">
          <button
            onClick={() => setActiveTab(item.id)}
            className={`group w-full flex items-center gap-3 px-4 py-3 text-sm rounded-xl transition-all duration-300 relative overflow-hidden ${
              isItemActive(item.id) 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 transform scale-[1.02]' 
                : 'hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50 dark:hover:from-slate-800 dark:hover:to-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:scale-[1.01]'
            }`}
          >
            <div className={`p-2 rounded-lg ${
              isItemActive(item.id) 
                ? 'bg-white/20' 
                : 'bg-slate-100 dark:bg-slate-800 group-hover:bg-white group-hover:shadow-sm'
            }`}>
              <item.icon className="h-4 w-4 flex-shrink-0" />
            </div>
            <span className="flex-1 text-left font-medium">{item.label}</span>
            {showBadge && item.id === 'tickets' && (
              <Badge variant="secondary" className={`text-xs px-2 py-1 ${
                isItemActive(item.id) 
                  ? 'bg-white/20 text-white' 
                  : 'bg-blue-100 text-blue-700'
              }`}>
                {Math.floor(Math.random() * 5) + 1}
              </Badge>
            )}
            {isItemActive(item.id) && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-xl" />
            )}
          </button>
        </div>
      ));
  };

  return (
    <div className="w-72 h-full bg-white dark:bg-slate-900 border-r border-slate-200/60 dark:border-slate-700/60 flex flex-col shadow-xl">
      {/* Header */}
      <div className="p-6 border-b border-slate-200/60 dark:border-slate-700/60 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">PM</span>
          </div>
          <div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
              Partner Manager
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {isCliente ? 'Área do Cliente' : 'Área Administrativa'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-6 space-y-8 overflow-y-auto custom-scrollbar">
        <div>
          <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 px-2">
            Principal
          </h3>
          <div className="space-y-1">
            {renderMenuItems(mainMenuItems)}
          </div>
        </div>

        {whatsappItems.some(item => hasPermission(item.permission)) && (
          <div>
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 px-2">
              WhatsApp
            </h3>
            <div className="space-y-1">
              {renderMenuItems(whatsappItems)}
            </div>
          </div>
        )}

        {mediaItems.some(item => hasPermission(item.permission)) && (
          <div>
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 px-2">
              Mídia Paga
            </h3>
            <div className="space-y-1">
              {renderMenuItems(mediaItems)}
            </div>
          </div>
        )}

        <div>
          <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 px-2">
            Gestão
          </h3>
          <div className="space-y-1">
            {renderMenuItems(managementItems, true)}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 px-2">
            Sistema
          </h3>
          <div className="space-y-1">
            {renderMenuItems(systemItems)}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-slate-200/60 dark:border-slate-700/60 space-y-4 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className="w-full justify-start text-sm hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl py-3 px-4 transition-all duration-300"
        >
          <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 mr-3">
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </div>
          <span className="font-medium">{isDarkMode ? 'Modo Claro' : 'Modo Escuro'}</span>
        </Button>
        
        {profile && (
          <div className="p-4 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-700 border border-slate-200/60 dark:border-slate-600/60">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                {profile.nome}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {profile.email}
              </p>
              <Badge variant="outline" className="text-xs font-medium bg-white/50 dark:bg-slate-700/50">
                {isRootAdmin ? 'Root Admin' : profile.role === 'admin' ? 'Admin' : 'Cliente'}
              </Badge>
            </div>
          </div>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="w-full justify-start text-sm text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl py-3 px-4 transition-all duration-300"
        >
          <div className="p-2 rounded-lg bg-red-50 dark:bg-red-900/20 mr-3">
            <LogOut className="h-4 w-4" />
          </div>
          <span className="font-medium">Sair</span>
        </Button>
      </div>
    </div>
  );
}
