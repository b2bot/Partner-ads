
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

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
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
    <aside className="w-64 bg-white shadow-sm border-r">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors',
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : 'text-gray-600 hover:bg-gray-50'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
