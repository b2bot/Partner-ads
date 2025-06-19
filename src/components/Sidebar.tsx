
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
  LogOut,
  ChevronRight
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

  const renderMenuItems = (items: any[], showBadge = false, sectionTitle?: string) => {
    const filteredItems = items.filter(item => {
      if (item.id === 'settings') {
        return canAccessSettings;
      }
      return item.permission ? hasPermission(item.permission) : true;
    });

    if (filteredItems.length === 0) return null;

    return (
      <div className="space-y-2">
        {sectionTitle && (
          <div className="px-6 py-2">
            <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {sectionTitle}
            </h4>
          </div>
        )}
        {filteredItems.map((item) => (
          <div key={item.id} className="px-3">
            <button
              onClick={() => setActiveTab(item.id)}
              className={`premium-sidebar-item ${
                isItemActive(item.id) 
                  ? 'premium-sidebar-item-active' 
                  : 'premium-sidebar-item-inactive'
              }`}
            >
              <div className={`p-2.5 rounded-xl transition-all duration-300 ${
                isItemActive(item.id) 
                  ? 'bg-white/20 shadow-lg' 
                  : 'bg-slate-100 dark:bg-slate-800 group-hover:bg-white group-hover:shadow-md'
              }`}>
                <item.icon className="h-5 w-5 flex-shrink-0" />
              </div>
              <span className="flex-1 text-left font-semibold">{item.label}</span>
              {showBadge && item.id === 'tickets' && (
                <Badge className={`text-xs px-2.5 py-1 rounded-full ${
                  isItemActive(item.id) 
                    ? 'bg-white/20 text-white border-white/30' 
                    : 'bg-blue-100 text-blue-700 border-blue-200'
                }`}>
                  {Math.floor(Math.random() * 5) + 1}
                </Badge>
              )}
              {isItemActive(item.id) && (
                <>
                  <ChevronRight className="h-4 w-4 text-white/80" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-indigo-400/10 rounded-2xl" />
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-80 h-full premium-card border-r-0 rounded-l-none shadow-2xl flex flex-col">
      {/* Header */}
      <div className="p-8 border-b border-slate-200/60 dark:border-slate-700/60 gradient-card">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/30">
            <span className="text-white font-bold text-xl">PM</span>
          </div>
          <div className="min-w-0">
            <h2 className="text-xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 dark:from-slate-200 dark:via-slate-300 dark:to-slate-400 bg-clip-text text-transparent">
              Partner Manager
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold tracking-wide">
              {isCliente ? 'Área do Cliente' : 'Área Administrativa'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6 space-y-8 overflow-y-auto custom-scrollbar">
        {renderMenuItems(mainMenuItems, false, "Principal")}
        {whatsappItems.some(item => hasPermission(item.permission)) && 
          renderMenuItems(whatsappItems, false, "WhatsApp")}
        {mediaItems.some(item => hasPermission(item.permission)) && 
          renderMenuItems(mediaItems, false, "Mídia Paga")}
        {renderMenuItems(managementItems, true, "Gestão")}
        {renderMenuItems(systemItems, false, "Sistema")}
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-slate-200/60 dark:border-slate-700/60 space-y-4 gradient-card">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className="w-full justify-start text-sm hover:bg-slate-100/80 dark:hover:bg-slate-800/80 rounded-xl py-3 px-4 transition-all duration-300 font-semibold"
        >
          <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 mr-3 transition-all duration-300">
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </div>
          <span>{isDarkMode ? 'Modo Claro' : 'Modo Escuro'}</span>
        </Button>
        
        {profile && (
          <div className="p-5 rounded-2xl gradient-card border border-slate-200/60 dark:border-slate-600/60 shadow-lg">
            <div className="space-y-3">
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">
                {profile.nome}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {profile.email}
              </p>
              <Badge className="text-xs font-semibold bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-slate-700/50 dark:to-slate-600/50 border-blue-200 dark:border-slate-600">
                {isRootAdmin ? 'Root Admin' : profile.role === 'admin' ? 'Admin' : 'Cliente'}
              </Badge>
            </div>
          </div>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="w-full justify-start text-sm text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl py-3 px-4 transition-all duration-300 font-semibold"
        >
          <div className="p-2 rounded-xl bg-red-50 dark:bg-red-900/20 mr-3 transition-colors duration-300">
            <LogOut className="h-4 w-4" />
          </div>
          <span>Sair</span>
        </Button>
      </div>
    </div>
  );
}
