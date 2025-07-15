import { useState } from 'react';
import { useCreateProject } from '@/hooks/Tarefas/useProjects';
import { useClientes } from '@/hooks/useClientes';
import { useCollaborators } from '@/hooks/useCollaborators';
import { useAuth } from '@/hooks/useAuth';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProjectInsert } from '@/types/task';
import { Calendar } from 'lucide-react';

interface ProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProjectModal = ({ open, onOpenChange }: ProjectModalProps) => {
  const { profile } = useAuth();
  const { data: clients } = useClientes();
  const { collaborators: collaboratorsList = [], isLoading: isLoadingCollaborators } = useCollaborators();
  const createProject = useCreateProject();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    client_id: '',
    responsible_id: '',
    start_date: '',
    end_date: '',
    status: 'ativo' as const,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) return;

    const projectData: ProjectInsert = {
      ...formData,
      created_by: profile?.id,
      responsible_id: formData.responsible_id || profile?.id,
      client_id: formData.client_id || undefined,
      start_date: formData.start_date || undefined,
      end_date: formData.end_date || undefined,
    };

    try {
      await createProject.mutateAsync(projectData);
      onOpenChange(false);
      setFormData({
        name: '',
        description: '',
        client_id: '',
        responsible_id: '',
        start_date: '',
        end_date: '',
        status: 'ativo',
      });
    } catch (error) {
      console.error('Erro ao criar projeto:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Novo Projeto</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nome do projeto */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Nome do Projeto *</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Digite o nome do projeto"
              required
            />
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Descrição</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Descreva o projeto"
              rows={3}
            />
          </div>

          {/* Cliente */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Cliente</label>
            <Select
              value={formData.client_id}
              onValueChange={(value) => setFormData(prev => ({ ...prev, client_id: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um cliente (opcional)" />
              </SelectTrigger>
              <SelectContent>
                {clients?.length === 0 && (
                  <SelectItem disabled value="">Nenhum cliente encontrado</SelectItem>
                )}
                {clients?.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Responsável */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Responsável</label>
            <Select
              value={formData.responsible_id}
              onValueChange={(value) => setFormData(prev => ({ ...prev, responsible_id: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um responsável" />
              </SelectTrigger>
              <SelectContent>
                {isLoadingCollaborators && (
                  <SelectItem disabled value="">Carregando colaboradores...</SelectItem>
                )}
                {!isLoadingCollaborators && collaboratorsList.length === 0 && (
                  <SelectItem disabled value="">Nenhum colaborador encontrado</SelectItem>
                )}
                {collaboratorsList.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select
              value={formData.status}
              onValueChange={(value: 'ativo' | 'pausado' | 'finalizado') =>
                setFormData(prev => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ativo">Ativo</SelectItem>
                <SelectItem value="pausado">Pausado</SelectItem>
                <SelectItem value="finalizado">Finalizado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Datas */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Data de Início
              </label>
              <Input
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Data de Término
              </label>
              <Input
                type="date"
                value={formData.end_date}
                onChange={(e) => setFormData(prev => ({ ...prev, end_date: e.target.value }))}
              />
            </div>
          </div>

          {/* Ações */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={createProject.isPending || !formData.name.trim()}
            >
              {createProject.isPending ? 'Criando...' : 'Criar Projeto'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
