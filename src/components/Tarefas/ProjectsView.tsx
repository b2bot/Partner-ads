import { useProjects } from '@/hooks/Tarefas/useProjects';
import { useClientes } from '@/hooks/useClientes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ProjectModal } from './ProjectModal';
import { ProjectEditModal } from './ProjectEditModal';
import { Plus, Folder, User, Calendar, Eye, Edit, Loader2, Trash } from 'lucide-react';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { ProjectTasksView } from './ProjectTasksView'; 
import { useDeleteProject } from '@/hooks/Tarefas/useDeleteProject';

type ProjectsViewProps = {
  setActiveTab: (tab: 'lista' | 'kanban' | 'calendario' | 'fluxos' | 'gestor' | 'projetos' | 'tarefas') => void;
  setSelectedProjectId: (id: string) => void;
};

export const ProjectsView = ({ setActiveTab, setSelectedProjectId }: ProjectsViewProps) => {
  const { data: projects, isLoading, error } = useProjects();
  const { data: clients } = useClientes();
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const deleteProject = useDeleteProject();

  const handleViewTasks = (projectId: string) => {
    setSelectedProjectId(projectId);
    setActiveTab('tarefas');

    toast({
      title: 'Ver Tarefas',
      description: `Abrindo tarefas do projeto ${projectId}`,
    });
  };

  const handleEditProject = (project: any) => {
    setSelectedProject(project);
    setEditModalOpen(true);
    toast({
      title: 'Editar Projeto',
      description: `Editando projeto ${project.id}`,
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Carregando projetos...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-4">
          <h3 className="text-lg font-medium">Erro ao carregar projetos</h3>
          <p className="text-sm">Verifique a conexão com o banco de dados.</p>
        </div>
        <Button onClick={() => window.location.reload()}>
          Tentar Novamente
        </Button>
      </div>
    );
  }

  const safeProjects = Array.isArray(projects) ? projects : [];

  const filteredProjects = safeProjects.filter(project =>
    selectedStatus === 'all' || project.status === selectedStatus
  );

  const getProjectProgress = (project: any) => {
    const totalTasks = project.tasks?.length || 0;
    const completedTasks = project.tasks?.filter((task: any) => task.status === 'finalizada').length || 0;
    return totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo': return 'bg-green-100 text-green-800';
      case 'pausado': return 'bg-yellow-100 text-yellow-800';
      case 'finalizado': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        {/*<div>
          <h2 className="text-2xl font-bold">Projetos</h2>
          <p className="text-gray-600">
            Gerencie todos os projetos da empresa ({safeProjects.length} total)
          </p>
        </div>*/}

        <Button onClick={() => setProjectModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Projeto
        </Button>
      </div>

      {/* Filtros */}
      <div className="flex gap-2">
        {['all', 'ativo', 'pausado', 'finalizado'].map((status) => (
          <Button
            key={status}
            variant={selectedStatus === status ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedStatus(status)}
            className="capitalize"
          >
            {status === 'all' ? 'Todos' : status}
            <Badge variant="secondary" className="ml-2">
              {status === 'all'
                ? safeProjects.length
                : safeProjects.filter(p => p.status === status).length}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Grid de Projetos */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const progress = getProjectProgress(project);
            const totalTasks = project.tasks?.length || 0;
            const completedTasks = project.tasks?.filter((task: any) => task.status === 'finalizada').length || 0;

            return (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Folder className="h-5 w-5 text-blue-600" />
                      <CardTitle className="text-lg line-clamp-2">{project.name}</CardTitle>
                    </div>
                    <Badge className={getStatusColor(project.status || 'ativo')}>
                      {project.status || 'ativo'}
                    </Badge>
                  </div>

                  {project.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {project.description}
                    </p>
                  )}
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Cliente */}
                  {project.client && (
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-gray-400" />
                      <span>{project.client.name}</span>
                    </div>
                  )}

                  {/* Responsável */}
                  {project.responsible && (
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-gray-400" />
                      <span>Responsável: {projects_responsible_name}</span>
                    </div>
                  )}

                  {/* Datas */}
                  {(project.start_date || project.end_date) && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {project.start_date && new Date(project.start_date).toLocaleDateString('pt-BR')}
                        {project.end_date && ` - ${new Date(project.end_date).toLocaleDateString('pt-BR')}`}
                      </span>
                    </div>
                  )}

                  {/* Progresso */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progresso</span>
                      <span>{completedTasks}/{totalTasks} tarefas</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <div className="text-xs text-gray-500 text-right">
                      {Math.round(progress)}% concluído
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleViewTasks(project.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Ver Tarefas
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditProject(project)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
					<Button
                      variant="destructive"
                      size="sm"
                      onClick={() => { 
					    if (confirm('Deseja realmente excluir este projeto?')) {
						  deleteProject.mutate(project.id);
						}
					  }}
					>
					  <Trash className="h-4 w-4" />
					</Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <Folder className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {selectedStatus === 'all'
              ? 'Nenhum projeto encontrado'
              : `Nenhum projeto ${selectedStatus} encontrado`}
          </h3>
          <p className="text-gray-600 mb-6">
            {safeProjects.length === 0
              ? 'Comece criando seu primeiro projeto para organizar suas tarefas'
              : 'Tente alterar os filtros ou criar um novo projeto'}
          </p>
          <Button onClick={() => setProjectModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Criar Primeiro Projeto
          </Button>
        </div>
      )}

      {/* Modal de Novo Projeto */}
      <ProjectModal
        open={projectModalOpen}
        onOpenChange={setProjectModalOpen}
      />

      {/* Modal de Edição de Projeto */}
      <ProjectEditModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        project={selectedProject}
      />
    </div>
  );
};
