
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Inbox, 
  Send, 
  Star, 
  Trash2, 
  FileText,
  Settings,
  Plus
} from 'lucide-react';
import { MailboxFolderType } from '@/types/mailbox';
import { useMailboxFolderCounts } from '@/hooks/mailbox/useMailboxMessages';
import { cn } from '@/lib/utils';

interface MailboxSidebarProps {
  activeFolder: MailboxFolderType;
  onFolderChange: (folder: MailboxFolderType) => void;
  onNewMessage: () => void;
  onSettings: () => void;
}

export const MailboxSidebar = ({ 
  activeFolder, 
  onFolderChange, 
  onNewMessage,
  onSettings 
}: MailboxSidebarProps) => {
  const { data: folderCounts = [] } = useMailboxFolderCounts();

  const folders = [
    { 
      key: 'inbox' as MailboxFolderType, 
      label: 'Caixa de Entrada', 
      icon: Inbox,
      color: 'text-blue-600'
    },
    { 
      key: 'sent' as MailboxFolderType, 
      label: 'Enviados', 
      icon: Send,
      color: 'text-green-600'
    },
    { 
      key: 'starred' as MailboxFolderType, 
      label: 'Marcados', 
      icon: Star,
      color: 'text-yellow-600'
    },
    { 
      key: 'draft' as MailboxFolderType, 
      label: 'Rascunhos', 
      icon: FileText,
      color: 'text-gray-600'
    },
    { 
      key: 'trash' as MailboxFolderType, 
      label: 'Lixeira', 
      icon: Trash2,
      color: 'text-red-600'
    },
  ];

  const getFolderCount = (folder: string) => {
    const folderData = folderCounts.find(f => f.folder === folder);
    return folderData?.unread_count || 0;
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <Button 
          onClick={onNewMessage}
          className="w-full premium-button"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nova Mensagem
        </Button>
      </div>

      <div className="flex-1 p-4">
        <nav className="space-y-1">
          {folders.map((folder) => {
            const Icon = folder.icon;
            const count = getFolderCount(folder.key);
            const isActive = activeFolder === folder.key;

            return (
              <Button
                key={folder.key}
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start h-10",
                  isActive && "bg-blue-50 text-blue-700 border-blue-200"
                )}
                onClick={() => onFolderChange(folder.key)}
              >
                <Icon className={cn("h-4 w-4 mr-3", folder.color)} />
                <span className="flex-1 text-left">{folder.label}</span>
                {count > 0 && (
                  <Badge variant="secondary" className="ml-auto">
                    {count}
                  </Badge>
                )}
              </Button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={onSettings}
        >
          <Settings className="h-4 w-4 mr-3" />
          Configurações
        </Button>
      </div>
    </div>
  );
};
