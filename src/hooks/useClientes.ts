import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/integrations/apiClient';
import { toast } from '@/hooks/use-toast';

export const useClientes = () => {
  return useQuery({
    queryKey: ['clientes'],
    queryFn: async () => {
      const { data, error } = await apiClient
        .from('clientes')
        .select('id, nome');

      if (error) throw new Error(error.message);
      return data || [];
    },
  });
};

export const useCreateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (cliente: { nome: string }) => {
      const { data, error } = await apiClient
        .from('clientes')
        .insert(cliente)
        .single();

      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clientes'] });
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
