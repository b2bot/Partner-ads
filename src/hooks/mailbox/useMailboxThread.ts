
import { useQuery } from '@tanstack/react-query';
import { MailboxService } from '@/services/mailbox/api';

export const useMailboxThread = (threadId: string | undefined) => {
  return useQuery({
    queryKey: ['mailbox-thread', threadId],
    queryFn: () => threadId ? MailboxService.getThread(threadId) : Promise.resolve(null),
    enabled: !!threadId,
  });
};
