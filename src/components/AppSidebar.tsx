
import React from 'react';
import { cn } from '@/lib/utils';
import {
  BarChart3,
  Target,
  Image,
  MessageSquare,
  Users,
  Settings,
  Home,
  Zap,
  Kanban,
  Phone,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

interface AppSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function AppSidebar({ activeTab, onTabChange }: AppSidebarProps) {
  const { isAdmin } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'campaigns', label: 'Campanhas', icon: Target },
    { id: 'adsets', label: 'Conjuntos de Anúncios', icon: Zap },
    { id: 'ads', label: 'Anúncios', icon: BarChart3 },
    { id: 'creatives', label: 'Criativos', icon: Image },
    { id: 'tasks', label: 'Tarefas', icon: Kanban },
    { id: 'tickets', label: 'Chamados', icon: MessageSquare },
    { id: 'whatsapp', label: 'WhatsApp', icon: Phone },
  ];

  // Adicionar itens apenas para admins
  if (isAdmin) {
    menuItems.push(
      { id: 'clients', label: 'Clientes', icon: Users },
      { id: 'settings', label: 'Configurações', icon: Settings }
    );
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      isActive={activeTab === item.id}
                      onClick={() => onTabChange(item.id)}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
