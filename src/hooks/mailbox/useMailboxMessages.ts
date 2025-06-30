
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MailboxService } from '@/services/mailbox/api';
import { MailboxFolderType, UpdateMessageStatusRequest } from '@/types/mailbox';
import { toast } from 'sonner';

export const useMailboxMessages = (
  folder: MailboxFolderType = 'inbox',
  page: number = 1,
  pageSize: number = 20,
  search?: string
) => {
  return useQuery({
    queryKey: ['mailbox-messages', folder, page, pageSize, search],
    queryFn: () => MailboxService.getMessages(folder, page, pageSize, search),
    refetchOnWindowFocus: false,
    staleTime: 30000, // 30 segundos
  });
};

export const useMailboxMessage = (id: string | undefined) => {
  return useQuery({
    queryKey: ['mailbox-message', id],
    queryFn: () => id ? MailboxService.getMessage(id) : Promise.resolve(null),
    enabled: !!id,
  });
};

export const useUpdateMessageStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: UpdateMessageStatusRequest) => 
      MailboxService.updateMessageStatus(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mailbox-messages'] });
      queryClient.invalidateQueries({ queryKey: ['mailbox-folder-counts'] });
      toast.success('Status da mensagem atualizado com sucesso');
    },
    onError: (error: Error) => {
      toast.error('Erro ao atualizar status da mensagem: ' + error.message);
    },
  });
};

export const useDeleteMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => MailboxService.deleteMessage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mailbox-messages'] });
      queryClient.invalidateQueries({ queryKey: ['mailbox-folder-counts'] });
      toast.success('Mensagem excluída com sucesso');
    },
    onError: (error: Error) => {
      toast.error('Erro ao excluir mensagem: ' + error.message);
    },
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: MailboxService.sendMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mailbox-messages'] });
      queryClient.invalidateQueries({ queryKey: ['mailbox-folder-counts'] });
      toast.success('Mensagem enviada com sucesso');
    },
    onError: (error: Error) => {
      toast.error('Erro ao enviar mensagem: ' + error.message);
    },
  });
};

export const useMailboxFolderCounts = () => {
  return useQuery({
    queryKey: ['mailbox-folder-counts'],
    queryFn: () => MailboxService.getFolderCounts(),
    refetchInterval: 60000, // Atualiza a cada minuto
  });
};
