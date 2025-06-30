
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Badge } from '@/components/ui/badge';
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
  ChevronRight,
  Layers,
  Image,
  ClipboardList } from 'lucide-react'; 

import { Button } from '@/components/ui/button';
import { apiClient } from '@/integrations/apiClient';
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

  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
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
      id: 'relatorios', 
      label: 'Relatórios', 
      icon: FileText,
      permission: 'access_client_reports' as Permission
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
      id: 'tasks', 
      label: 'Tarefas', 
      icon: ClipboardList,
      permission: 'access_tasks' as Permission
    },
    { 
      id: 'creatives', 
      label: hasPermission('access_creatives') ? 'Gerenciar Criativos' : 'Meus Criativos', 
      icon: Palette,
      permission: 'access_creatives' as Permission
    },
    { 
      id: 'mailbox', 
      label: 'Caixa de E-mail', 
      icon: Target,
      permission: 'access_dashboard' as Permission
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
      <div className="space-y-1">
        {filteredItems.map((item) => (
          <div key={item.id} className="px-2">
            <button
              onClick={() => setActiveTab(item.id)}
              className={`premium-sidebar-item text-xs font-regular px-3 py-2 ${
                isItemActive(item.id) 
                  ? 'premium-sidebar-item-active' 
                  : 'premium-sidebar-item-inactive'
              }`}
            >
              <div className="transition-all duration-300">
                <item.icon className="h-3.5 w-3.5 flex-shrink-0" />
              </div>
              <span className="flex-1 text-left font-regular truncate">{item.label}</span>
              {showBadge && item.id === 'tickets' && (
                <Badge className={`text-[10px] px-2 py-0.5 rounded-full ${
                  isItemActive(item.id) 
                    ? 'bg-white/20 text-white border-white/30' 
                    : 'bg-blue-0 text-blue-700 border-blue-200'
                }`}>
                  {Math.floor(Math.random() * 5) + 1}
                </Badge>
              )}
              {isItemActive(item.id) && (
                <>
                  <ChevronRight className="h-3.5 w-3.5 text-white/80" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-indigo-400/10 rounded-xl" />
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-54 lg:w-50 h-full border-r border-slate-200 dark:border-slate-700 flex flex-col text-sm bg-white dark:bg-slate-900">
      {/* Header */}
      <div className="p-5 border-b border-slate-200/60 dark:border-slate-700/60">
        <div className="flex items-center gap-3 mb-0">
          <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-md shadow-blue-500/20">
            <span className="text-white font-bold text-base"></span>
          </div>
          <div className="min-w-0">
            <h2 className="text-base font-semi-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 dark:from-slate-200 dark:via-slate-300 dark:to-slate-400 bg-clip-text text-transparent">
              Partner Manager
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-regular tracking-wide">
              {isCliente ? 'Área do Cliente' : 'Área Administrativa'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-4 space-y-2 overflow-y-auto custom-scrollbar">
        {renderMenuItems(mainMenuItems)}
        {whatsappItems.some(item => hasPermission(item.permission)) && 
          renderMenuItems(whatsappItems)}
        {mediaItems.some(item => hasPermission(item.permission)) && 
          renderMenuItems(mediaItems)}
        {renderMenuItems(managementItems, true)}
        {renderMenuItems(systemItems)}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200/60 dark:border-slate-700/60 space-y-3">
        <Button
          variant="ghost"
          size="xs"
          onClick={toggleTheme}
          className="text-xs font-thin text-slate-800 dark:text-slate-200 truncate"
        >
          <div className="p-1.5 transition-all duration-300">
            {isDarkMode ? <Sun className="h-3 w-3" /> : <Moon className="h-3 w-3" />}
          </div>
          <span>{isDarkMode ? 'Modo Claro' : 'Modo Escuro'}</span>
        </Button>
        
        {profile && (
          <div className="p-4 border border-slate-200/60 dark:border-slate-600/60">
            <div className="space-y-2">
              <p className="text-sm font-regular text-slate-800 dark:text-slate-200 truncate">
                {profile.nome}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {profile.email}
              </p>
              <Badge className="text-[11px] font-r bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-slate-700/50 dark:to-slate-600/50 border-blue-200 dark:border-slate-600">
                {isRootAdmin ? 'Root Admin' : profile.role === 'admin' ? 'Admin' : 'Cliente'}
              </Badge>
            </div>
          </div>
        )}
        
        <Button
          variant="ghost"
          size="xs"
          onClick={handleLogout}
          className="w-full justify-start text-sm text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl py-2.5 px-3 transition-all duration-300 font-medium"
        >
          <div className="transition-all duration-300">
            <LogOut className="h-3 w-3" />
          </div>
          <span>Sair</span>
        </Button>
      </div>
    </div>
  );
  
  
}
