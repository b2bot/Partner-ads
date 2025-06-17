
import { useQuery } from '@tanstack/react-query';

export const useGoogleAPI = () => {
  return useQuery({
    queryKey: ['googleAPI'],
    queryFn: async () => {
      // Mock data for Google API
      return [
        {
          accountName: 'Google Account 1',
          campaignName: 'Campaign B',
          adSetName: 'AdSet 2',
          adName: 'Ad 2',
          day: '2024-01-01',
          impressions: 2000,
          clicks: 100,
          amountSpent: 200,
          actionMessagingConversationsStarted: 10,
          costPerActionMessagingConversations: 20,
          actionLinkClicks: 60,
          reach: 1600,
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
