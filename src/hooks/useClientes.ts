import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/integrations/apiClient';
import { Client, ClientInsert } from '@/types/task';
import { toast } from '@/hooks/use-toast';

export const useClientes = () => {
  return useQuery({
    queryKey: ['clientes'],
    queryFn: async () => {
      const data = await apiClient.get<Client[]>('/api/clientes.php');
      return data || [];
    }
  });
};


export const useCreateClient = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (client: ClientInsert) => {
      const data = await apiClient.post<Client>('/api/clientes.php', client);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast({
        title: "Cliente criado",
        description: "O cliente foi criado com sucesso.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao criar cliente",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
