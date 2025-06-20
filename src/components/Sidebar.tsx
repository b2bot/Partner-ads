
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useClientPermissions } from '@/hooks/useClientPermissions';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  BarChart3,
  Target,
  Layers,
  FileText,
  MessageSquare,
  Image,
  Settings,
  Activity,
  ClipboardList
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

interface NavigationItem {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  permission?: string;
  clientModule?: string;
  adminOnly?: boolean;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const { hasPermission, isAdmin, isRootAdmin, isCliente, user } = useAuth();
  const { hasModulePermission } = useClientPermissions(user, isCliente);

  const navigationItems: NavigationItem[] = [
    { 
      id: 'dashboard', 
      title: 'Dashboard', 
      icon: BarChart3,
      permission: 'access_dashboard',
      clientModule: 'dashboard'
    },
    { 
      id: 'campaigns', 
      title: 'Campanhas', 
      icon: Target,
      permission: 'access_paid_media',
      adminOnly: true
    },
    { 
      id: 'adsets', 
      title: 'Conjuntos', 
      icon: Layers,
      permission: 'access_paid_media',
      adminOnly: true
    },
    { 
      id: 'ads', 
      title: 'Anúncios', 
      icon: FileText,
      permission: 'access_paid_media',
      adminOnly: true
    },
    { 
      id: 'relatorios', 
      title: 'Relatórios', 
      icon: BarChart3,
      permission: 'access_client_reports',
      clientModule: 'relatorios'
    },
    { 
      id: 'tickets', 
      title: 'Chamados', 
      icon: MessageSquare,
      clientModule: 'chamados'
    },
    { 
      id: 'tasks', 
      title: 'Tarefas', 
      icon: ClipboardList,
      permission: 'access_tasks',
      adminOnly: true
    },
    { 
      id: 'creatives', 
      title: 'Criativos', 
      icon: Image,
      permission: 'access_creatives',
      clientModule: 'criativos'
    }
  ];

  const adminItems: NavigationItem[] = [
    { 
      id: 'activity-log', 
      title: 'Log de Atividades', 
      icon: Activity,
      permission: 'view_system_logs',
      adminOnly: true
    },
    { 
      id: 'settings', 
      title: 'Configurações', 
      icon: Settings,
      adminOnly: true
    }
  ];

  const canAccessItem = (item: NavigationItem): boolean => {
    if (isRootAdmin) return true;
    
    if (item.adminOnly && !isAdmin) return false;
    
    if (isCliente) {
      return item.clientModule ? hasModulePermission(item.clientModule as any) : false;
    }
    
    return item.permission ? hasPermission(item.permission as any) : true;
  };

  const filteredNavigationItems = navigationItems.filter(canAccessItem);
  const filteredAdminItems = adminItems.filter(canAccessItem);

  const isActive = (itemId: string) => activeTab === itemId;

  return (
    <Sidebar className={cn(collapsed ? "w-14" : "w-60", "border-r border-slate-200/60 dark:border-slate-700/60")}>
      <SidebarTrigger className="m-2 self-end" />

      <SidebarContent>
        {filteredNavigationItems.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>Navegação</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredNavigationItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => setActiveTab(item.id)}
                      className={cn(
                        isActive(item.id) && "bg-muted text-primary font-medium"
                      )}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {filteredAdminItems.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>Administração</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredAdminItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => setActiveTab(item.id)}
                      className={cn(
                        isActive(item.id) && "bg-muted text-primary font-medium"
                      )}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
