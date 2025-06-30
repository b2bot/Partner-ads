
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MailboxService } from '@/services/mailbox/api';
import { MailboxSettings } from '@/types/mailbox';
import { toast } from 'sonner';

export const useMailboxSettings = () => {
  return useQuery({
    queryKey: ['mailbox-settings'],
    queryFn: () => MailboxService.getSettings(),
  });
};

export const useSaveMailboxSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (settings: Partial<MailboxSettings>) => 
      MailboxService.saveSettings(settings),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mailbox-settings'] });
      toast.success('Configurações salvas com sucesso');
    },
    onError: (error: Error) => {
      toast.error('Erro ao salvar configurações: ' + error.message);
    },
  });
};
