
import { 
  BarChart3, 
  Target, 
  Zap, 
  MessageSquare, 
  Settings,
  LayoutDashboard,
  MessageCircle,
  Image,
  Users,
  Crown,
  User,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { ThemeToggle } from './ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useState } from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const { isAdmin, isRootAdmin, hasPermission, profile, signOut } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    await signOut();
    setLoading(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Definir itens do menu baseado nas permissões
  const menuItems = [
    // Dashboard - sempre visível para admins com permissão
    ...(hasPermission('access_dashboard') ? [{ 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: LayoutDashboard 
    }] : []),
    
    // Campanhas Meta Ads
    ...(hasPermission('access_paid_media') || hasPermission('create_campaigns_media') ? [
      { id: 'campaigns', label: 'Campanhas', icon: Target },
      { id: 'adsets', label: 'Conjuntos de Anúncios', icon: BarChart3 },
      { id: 'ads', label: 'Anúncios', icon: Zap },
    ] : []),
    
    // WhatsApp
    ...(hasPermission('access_whatsapp') ? [
      { id: 'whatsapp-reports', label: 'Relatórios WhatsApp', icon: MessageSquare },
    ] : []),
    
    // Métricas
    ...(hasPermission('view_metrics') ? [
      { id: 'metrics-objectives', label: 'Métricas e Objetivos', icon: BarChart3 },
    ] : []),
    
    // Chamados - todos podem ver seus próprios
    { 
      id: 'tickets', 
      label: hasPermission('access_tasks') ? 'Gerenciar Chamados' : 'Meus Chamados', 
      icon: MessageCircle 
    },
    
    // Criativos - todos podem ver seus próprios
    { 
      id: 'creatives', 
      label: hasPermission('access_creatives') ? 'Gerenciar Criativos' : 'Meus Criativos', 
      icon: Image 
    },
    
    // Gestão de clientes - só admins
    ...(hasPermission('manage_collaborators') ? [
      { id: 'clients-management', label: 'Gerenciar Clientes', icon: Users }
    ] : []),
    
    // Configurações - só admins
    ...(hasPermission('manage_api_settings') || hasPermission('manage_user_settings') ? [
      { id: 'settings', label: 'Configurações', icon: Settings }
    ] : []),
  ];

  return (
    <div className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Meta Ads Pro</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">Gerenciador de Campanhas</p>
      </div>
      
      {/* Menu Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? 'default' : 'ghost'}
              className={cn(
                "w-full justify-start text-left text-sm",
                activeTab === item.id 
                  ? "bg-blue-600 text-white hover:bg-blue-700" 
                  : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              )}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon className="mr-3 h-4 w-4" />
              {item.label}
            </Button>
          );
        })}
      </nav>

      {/* User Profile Section */}
      {profile && (
        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start p-2">
                <Avatar className="h-8 w-8 mr-3">
                  <AvatarFallback className="bg-blue-600 text-white text-xs">
                    {getInitials(profile.nome)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium truncate">
                      {profile.nome.split(' ')[0]}
                    </span>
                    {isRootAdmin && <Crown className="h-3 w-3 text-yellow-500" />}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {isRootAdmin ? 'Root Admin' : profile.role}
                  </span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none flex items-center gap-2">
                    {profile.nome}
                    {isRootAdmin && <Crown className="h-3 w-3 text-yellow-500" />}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {profile.email}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground capitalize">
                    {isRootAdmin ? '👑 Root Admin' : profile.role}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled>
                <User className="mr-2 h-4 w-4" />
                <span>Editar Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} disabled={loading}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>{loading ? 'Saindo...' : 'Sair'}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Theme Toggle */}
          <div className="mt-2">
            <ThemeToggle />
          </div>
        </div>
      )}
    </div>
  );
}
