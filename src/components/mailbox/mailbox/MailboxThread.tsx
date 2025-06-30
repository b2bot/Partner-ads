
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Reply, 
  ReplyAll, 
  Forward, 
  Star, 
  Trash2,
  Paperclip,
  Download
} from 'lucide-react';
import { useMailboxThread } from '@/hooks/mailbox/useMailboxThread';
import { formatRelativeDate, formatFileSize } from '@/utils/mailbox/formatters';
import { MailboxMessage } from '@/types/mailbox';

interface MailboxThreadProps {
  threadId?: string;
  messageId?: string;
  onReply?: (message: MailboxMessage) => void;
  onReplyAll?: (message: MailboxMessage) => void;
  onForward?: (message: MailboxMessage) => void;
}

export const MailboxThread = ({ 
  threadId, 
  messageId, 
  onReply, 
  onReplyAll, 
  onForward 
}: MailboxThreadProps) => {
  const { data: threadData, isLoading } = useMailboxThread(threadId);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!threadData) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">Nenhuma mensagem selecionada</h3>
          <p>Selecione uma mensagem na lista para visualizar</p>
        </div>
      </div>
    );
  }

  const { thread, messages } = threadData;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const renderMessage = (message: MailboxMessage, isLast: boolean) => (
    <div key={message.id} className="border-b border-gray-200 last:border-b-0">
      <div className="p-6">
        {/* Header da mensagem */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-blue-100 text-blue-600">
                {getInitials(message.from_name || message.from_email)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold">
                  {message.from_name || message.from_email}
                </span>
                {message.status === 'starred' && (
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                )}
                <Badge variant={message.status === 'read' ? 'secondary' : 'default'}>
                  {message.status === 'read' ? 'Lida' : 'Não lida'}
                </Badge>
              </div>
              <div className="text-sm text-gray-600">
                <span>Para: {message.to_name || message.to_email}</span>
                {message.cc_emails && message.cc_emails.length > 0 && (
                  <span className="ml-2">CC: {message.cc_emails.join(', ')}</span>
                )}
              </div>
              <div className="text-sm text-gray-500">
                {formatRelativeDate(message.created_at)}
              </div>
            </div>
          </div>

          {/* Ações da mensagem */}
          {isLast && (
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onReply?.(message)}
              >
                <Reply className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onReplyAll?.(message)}
              >
                <ReplyAll className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onForward?.(message)}
              >
                <Forward className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Star className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Assunto */}
        <h2 className="text-xl font-semibold mb-4">{message.subject}</h2>

        {/* Anexos */}
        {message.has_attachments && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Paperclip className="h-4 w-4 text-gray-500" />
              <span className="font-medium text-sm">Anexos</span>
            </div>
            {/* TODO: Implementar listagem de anexos reais */}
            <div className="flex items-center justify-between p-2 bg-white rounded border">
              <span className="text-sm">documento.pdf</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">2.5 MB</span>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Corpo da mensagem */}
        <div className="prose max-w-none">
          {message.is_html ? (
            <div 
              dangerouslySetInnerHTML={{ __html: message.body || '' }}
              className="text-gray-800"
            />
          ) : (
            <div className="whitespace-pre-wrap text-gray-800">
              {message.body}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 bg-white overflow-auto">
      <div className="max-w-4xl mx-auto">
        {messages.map((message, index) => 
          renderMessage(message, index === messages.length - 1)
        )}
      </div>
    </div>
  );
};
