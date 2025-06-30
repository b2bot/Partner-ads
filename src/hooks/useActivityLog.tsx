
import { apiClient } from '@/integrations/apiClient';
import { useAuth } from '@/hooks/useAuth';

export const useActivityLog = () => {
  const { user } = useAuth();

  const logActivity = async (
    action: string,
    entityType: 'campaign' | 'adset' | 'ad' | 'creative' | 'ticket' | 'client',
    entityId: string,
    entityName: string,
    details?: any
  ) => {
    try {
      if (!user) {
        console.warn('No user found for activity logging');
        return;
      }

      await apiClient.post('/api/activity_logs.php', {
        action,
        entity_type: entityType,
        entity_id: entityId,
        entity_name: entityName,
        user_id: user.id,
        user_name: user.email || 'Usuário Desconhecido',
        details
      });
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  };

  return { logActivity };
};
