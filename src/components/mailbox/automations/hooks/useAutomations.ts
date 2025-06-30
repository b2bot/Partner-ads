
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AutomationService } from '../services/automationService';
import { CreateAutomationRequest, UpdateAutomationRequest } from '../types/automations';
import { toast } from 'sonner';

export const useAutomations = (page: number = 1, pageSize: number = 20) => {
  return useQuery({
    queryKey: ['automations', page, pageSize],
    queryFn: () => AutomationService.getAutomations(page, pageSize),
  });
};

export const useAutomation = (id: string) => {
  return useQuery({
    queryKey: ['automation', id],
    queryFn: () => AutomationService.getAutomation(id),
    enabled: !!id,
  });
};

export const useCreateAutomation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (automation: CreateAutomationRequest) => 
      AutomationService.createAutomation(automation),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['automations'] });
      toast.success('Automação criada com sucesso!');
    },
    onError: (error: Error) => {
      toast.error('Erro ao criar automação: ' + error.message);
    },
  });
};

export const useUpdateAutomation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (automation: UpdateAutomationRequest) => 
      AutomationService.updateAutomation(automation),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['automations'] });
      queryClient.invalidateQueries({ queryKey: ['automation'] });
      toast.success('Automação atualizada com sucesso!');
    },
    onError: (error: Error) => {
      toast.error('Erro ao atualizar automação: ' + error.message);
    },
  });
};

export const useDeleteAutomation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => AutomationService.deleteAutomation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['automations'] });
      toast.success('Automação deletada com sucesso!');
    },
    onError: (error: Error) => {
      toast.error('Erro ao deletar automação: ' + error.message);
    },
  });
};

export const useAutomationLogs = (automationId: string, page: number = 1, pageSize: number = 20) => {
  return useQuery({
    queryKey: ['automation-logs', automationId, page, pageSize],
    queryFn: () => AutomationService.getAutomationLogs(automationId, page, pageSize),
    enabled: !!automationId,
  });
};

export const useProcessAutomations = () => {
  return useMutation({
    mutationFn: () => AutomationService.processAutomations(),
    onSuccess: () => {
      toast.success('Automações processadas com sucesso!');
    },
    onError: (error: Error) => {
      toast.error('Erro ao processar automações: ' + error.message);
    },
  });
};
