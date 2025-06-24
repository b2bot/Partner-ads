// Caminho: src/hooks/useCreateCollaborator.tsx

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

// A interface com os dados que o formulário vai nos enviar
interface NewCollaboratorInput {
  email: string;
  password: string;
  nome: string;
  foto_url?: string;
  role?: string;
  status?: string;
}

export function useCreateCollaborator() {
  const queryClient = useQueryClient();

  return useMutation({
    // A função da mutação agora é chamar a nossa API segura
    mutationFn: async (collaborator: NewCollaboratorInput) => {
      const response = await fetch('/api/create-collaborator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(collaborator),
      });

      // Se a resposta da API não for um sucesso (ex: erro 400, 409, 500)
      if (!response.ok) {
        // Nós lemos a mensagem de erro que a nossa API enviou
        const errorData = await response.json();
        // E lançamos um erro com essa mensagem, que será capturado pelo 'onError'
        throw new Error(errorData.message || 'Falha ao criar colaborador.');
      }

      // Se a resposta foi um sucesso, retornamos os dados (o { userId })
      return response.json();
    },

    // onSucess e onError agora são mais simples e só lidam com a interface
    onSuccess: () => {
      // Invalida a query para forçar a atualização da lista de colaboradores na tela
      queryClient.invalidateQueries({ queryKey: ['collaborators'] });
      toast.success('Colaborador criado com sucesso!');
    },

    onError: (error: Error) => {
      // Exibe a mensagem de erro (que veio da nossa API) para o usuário
      console.error('Erro na mutação de criar colaborador:', error);
      toast.error(error.message);
    },
  });
}