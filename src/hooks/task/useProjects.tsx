
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Project, CreateProjectData } from '@/types/task';
import { toast } from 'sonner';

export function useProjects() {
  const queryClient = useQueryClient();

  // Buscar projetos
  const { data: projects = [], isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          client:clientes(id, nome),
          created_by_profile:profiles!projects_created_by_fkey(id, nome)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao buscar projetos:', error);
        throw error;
      }

      return data || [];
    },
  });

  // Criar projeto
  const createProjectMutation = useMutation({
    mutationFn: async (data: CreateProjectData) => {
      const { data: result, error } = await supabase
        .from('projects')
        .insert([{
          ...data,
          status: 'ativo'
        }])
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Projeto criado com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao criar projeto:', error);
      toast.error('Erro ao criar projeto');
    },
  });

  // Atualizar projeto
  const updateProjectMutation = useMutation({
    mutationFn: async (data: { id: string; name?: string; description?: string; status?: string }) => {
      const { id, ...updateData } = data;
      const { data: result, error } = await supabase
        .from('projects')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Projeto atualizado com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao atualizar projeto:', error);
      toast.error('Erro ao atualizar projeto');
    },
  });

  // Deletar projeto
  const deleteProjectMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Projeto excluído com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao excluir projeto:', error);
      toast.error('Erro ao excluir projeto');
    },
  });

  return {
    projects,
    isLoading,
    error,
    createProject: createProjectMutation.mutate,
    isCreating: createProjectMutation.isPending,
    updateProject: updateProjectMutation.mutate,
    isUpdating: updateProjectMutation.isPending,
    deleteProject: deleteProjectMutation.mutate,
    isDeleting: deleteProjectMutation.isPending,
  };
}
