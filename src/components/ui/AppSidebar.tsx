
import React from 'react';
import { BarChart3, Settings, MessageSquare, Target, Palette, Users, FileText, Activity, Moon, Sun, LogOut } from 'lucide-react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter
} from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function AppSidebar() {
  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: BarChart3,
      href: '/dashboard'
    },
    { 
      id: 'campaigns', 
      label: 'Campanhas', 
      icon: Target,
      href: '/campaigns'
    },
    { 
      id: 'whatsapp', 
      label: 'WhatsApp', 
      icon: MessageSquare,
      href: '/whatsapp'
    },
    { 
      id: 'creatives', 
      label: 'Criativos', 
      icon: Palette,
      href: '/creatives'
    },
    { 
      id: 'tickets', 
      label: 'Chamados', 
      icon: FileText,
      href: '/tickets'
    },
    { 
      id: 'activity', 
      label: 'Atividades', 
      icon: Activity,
      href: '/activity'
    },
    { 
      id: 'settings', 
      label: 'Configurações', 
      icon: Settings,
      href: '/settings'
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <h2 className="text-lg font-bold">Partner Manager</h2>
        <Badge variant="secondary" className="text-xs">Multi-plataforma</Badge>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild>
                    <a href={item.href} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <LogOut className="h-4 w-4 mr-2" />
          Sair
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
