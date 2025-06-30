
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Paperclip, 
  Star, 
  Trash2, 
  Archive,
  RefreshCw,
  MoreHorizontal,
  Inbox
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MailboxFolderType } from '@/types/mailbox';
import { useMailboxMessages, useUpdateMessageStatus, useDeleteMessage } from '@/hooks/mailbox/useMailboxMessages';
import { formatMessageDate, truncateText } from '@/utils/mailbox/formatters';
import { cn } from '@/lib/utils';

interface MailboxListProps {
  folder: MailboxFolderType;
  onMessageSelect: (messageId: string) => void;
  selectedMessageId?: string;
}

export const MailboxList = ({ 
  folder, 
  onMessageSelect, 
  selectedMessageId 
}: MailboxListProps) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);

  const { 
    data: messages = [], 
    isLoading, 
    refetch 
  } = useMailboxMessages(folder, page, 20, search);

  const updateStatusMutation = useUpdateMessageStatus();
  const deleteMutation = useDeleteMessage();

  const handleSelectMessage = (messageId: string, checked: boolean) => {
    setSelectedMessages(prev => 
      checked 
        ? [...prev, messageId]
        : prev.filter(id => id !== messageId)
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedMessages(checked ? messages.map(m => m.id) : []);
  };

  const handleMarkAsRead = (messageId: string) => {
    updateStatusMutation.mutate({
      id: messageId,
      status: 'read'
    });
  };

  const handleMarkAsStarred = (messageId: string) => {
    updateStatusMutation.mutate({
      id: messageId,
      status: 'starred',
      folder: 'starred'
    });
  };

  const handleDeleteMessage = (messageId: string) => {
    if (folder === 'trash') {
      deleteMutation.mutate(messageId);
    } else {
      updateStatusMutation.mutate({
        id: messageId,
        status: 'trash',
        folder: 'trash'
      });
    }
  };

  const handleBulkAction = (action: string) => {
    selectedMessages.forEach(messageId => {
      switch (action) {
        case 'read':
          handleMarkAsRead(messageId);
          break;
        case 'starred':
          handleMarkAsStarred(messageId);
          break;
        case 'delete':
          handleDeleteMessage(messageId);
          break;
      }
    });
    setSelectedMessages([]);
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <RefreshCw className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header com busca e ações */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Buscar mensagens..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" onClick={() => refetch()}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        {selectedMessages.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              {selectedMessages.length} selecionadas
            </span>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => handleBulkAction('read')}
            >
              Marcar como lida
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => handleBulkAction('starred')}
            >
              <Star className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => handleBulkAction('delete')}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Lista de mensagens */}
      <div className="flex-1 overflow-auto">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <Inbox className="h-12 w-12 mb-4" />
            <p>Nenhuma mensagem encontrada</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {/* Header da tabela */}
            <div className="p-4 bg-gray-50 flex items-center gap-4 font-medium text-sm text-gray-700">
              <Checkbox
                checked={selectedMessages.length === messages.length}
                onCheckedChange={(checked) => handleSelectAll(!!checked)}
              />
              <div className="flex-1">Remetente</div>
              <div className="w-96">Assunto</div>
              <div className="w-24 text-center">Anexos</div>
              <div className="w-32 text-center">Data</div>
              <div className="w-10"></div>
            </div>

            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "p-4 flex items-center gap-4 hover:bg-gray-50 cursor-pointer transition-colors",
                  selectedMessageId === message.id && "bg-blue-50",
                  message.status === 'read' ? "text-gray-600" : "font-semibold"
                )}
                onClick={() => onMessageSelect(message.id)}
              >
                <Checkbox
                  checked={selectedMessages.includes(message.id)}
                  onCheckedChange={(checked) => handleSelectMessage(message.id, !!checked)}
                  onClick={(e) => e.stopPropagation()}
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="truncate">
                      {message.from_name || message.from_email}
                    </span>
                    {message.status === 'starred' && (
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    )}
                  </div>
                  <div className="text-sm text-gray-500 truncate">
                    {message.from_email}
                  </div>
                </div>

                <div className="w-96 min-w-0">
                  <div className="truncate">
                    {message.subject}
                  </div>
                </div>

                <div className="w-24 text-center">
                  {message.has_attachments && (
                    <Paperclip className="h-4 w-4 text-gray-400 mx-auto" />
                  )}
                </div>

                <div className="w-32 text-center text-sm text-gray-500">
                  {formatMessageDate(message.created_at)}
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="sm" className="w-10 h-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleMarkAsRead(message.id)}>
                      Marcar como lida
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleMarkAsStarred(message.id)}>
                      <Star className="h-4 w-4 mr-2" />
                      Marcar como favorita
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleDeleteMessage(message.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
