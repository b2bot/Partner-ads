
import { useQuery } from '@tanstack/react-query';

export const useMetaAPI = () => {
  return useQuery({
    queryKey: ['metaAPI'],
    queryFn: async () => {
      // Mock data for Meta API
      return [
        {
          accountName: 'Meta Account 1',
          campaignName: 'Campaign A',
          adSetName: 'AdSet 1',
          adName: 'Ad 1',
          day: '2024-01-01',
          impressions: 1000,
          clicks: 50,
          amountSpent: 100,
          actionMessagingConversationsStarted: 5,
          costPerActionMessagingConversations: 20,
          actionLinkClicks: 30,
          reach: 800,
          frequency: 1.25,
          cpm: 10,
          cpc: 2,
        },
        // Add more mock data as needed
      ];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
