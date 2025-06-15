
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter, LayoutGrid, List, Clock, User } from 'lucide-react';
import { useTasks } from '@/hooks/useTasks';
import { TaskKanban } from './TaskKanban';
import { TaskModal } from './TaskModal';
import { ProjectModal } from './ProjectModal';
import { TemplateModal } from './TemplateModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function TasksTab() {
  const { 
    tasks, 
    projects, 
    templates, 
    loading, 
    createTask, 
    updateTask, 
    createProject,
    createTemplate,
    fetchTasks,
    getTasksByStatus 
  } = useTasks();

  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProject, setFilterProject] = useState('');
  const [filterResponsavel, setFilterResponsavel] = useState('');
  const [activeTab, setActiveTab] = useState('minhas');

  const tasksByStatus = getTasksByStatus();

  const handleTaskClick = (task: any) => {
    setSelectedTask(task);
    setShowTaskModal(true);
  };

  const handleTaskSave = async (taskData: any) => {
    if (selectedTask) {
      await updateTask(selectedTask.id, taskData);
    } else {
      await createTask(taskData);
    }
    setSelectedTask(null);
  };

  const handleStatusChange = async (taskId: string, newStatus: string) => {
    await updateTask(taskId, { status: newStatus });
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.descricao?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProject = !filterProject || task.projeto_id === filterProject;
    const matchesResponsavel = !filterResponsavel || task.responsavel_id === filterResponsavel;
    
    if (activeTab === 'minhas') {
      // Filtrar apenas as tarefas do usuário logado
      return matchesSearch && matchesProject && matchesResponsavel;
    }
    
    return matchesSearch && matchesProject && matchesResponsavel;
  });

  const getFilteredTasksByStatus = () => {
    const filtered = getTasksByStatus();
    Object.keys(filtered).forEach(status => {
      filtered[status] = filtered[status].filter(task => 
        filteredTasks.some(ft => ft.id === task.id)
      );
    });
    return filtered;
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Carregando...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold">Gestão de Tarefas</h2>
          <Badge variant="outline">{tasks.length} tarefas</Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'kanban' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('kanban')}
          >
            <LayoutGrid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <TabsList>
            <TabsTrigger value="minhas">Minhas Tarefas</TabsTrigger>
            <TabsTrigger value="projetos">Projetos</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="finalizadas">Finalizadas</TabsTrigger>
          </TabsList>

          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={() => setShowTaskModal(true)} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Nova Tarefa
            </Button>
            <Button onClick={() => setShowProjectModal(true)} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Projeto
            </Button>
            <Button onClick={() => setShowTemplateModal(true)} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Template
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar tarefas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={filterProject} onValueChange={setFilterProject}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Filtrar por projeto" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos os projetos</SelectItem>
              {projects.map(project => (
                <SelectItem key={project.id} value={project.id}>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: project.cor }}
                    />
                    {project.nome}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <TabsContent value="minhas" className="space-y-4">
          {viewMode === 'kanban' ? (
            <TaskKanban
              tasksByStatus={getFilteredTasksByStatus()}
              onTaskClick={handleTaskClick}
              onStatusChange={handleStatusChange}
            />
          ) : (
            <div className="space-y-2">
              {filteredTasks.map(task => (
                <Card key={task.id} className="cursor-pointer hover:shadow-md" onClick={() => handleTaskClick(task)}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium">{task.titulo}</h3>
                        {task.descricao && (
                          <p className="text-sm text-gray-600 mt-1 line-clamp-1">{task.descricao}</p>
                        )}
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          {task.responsavel && (
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {task.responsavel.nome}
                            </div>
                          )}
                          {task.tempo_estimado && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {task.tempo_estimado}h
                            </div>
                          )}
                          {task.projeto && (
                            <div className="flex items-center gap-1">
                              <div 
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: task.projeto.cor }}
                              />
                              {task.projeto.nome}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={
                          task.prioridade === 'urgente' ? 'bg-red-100 text-red-800' :
                          task.prioridade === 'alta' ? 'bg-orange-100 text-orange-800' :
                          task.prioridade === 'media' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }>
                          {task.prioridade}
                        </Badge>
                        <Badge variant="outline">
                          {task.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="projetos">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map(project => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: project.cor }}
                    />
                    <CardTitle className="text-lg">{project.nome}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  {project.descricao && (
                    <p className="text-sm text-gray-600 mb-3">{project.descricao}</p>
                  )}
                  {project.cliente && (
                    <p className="text-sm"><strong>Cliente:</strong> {project.cliente.nome}</p>
                  )}
                  <div className="mt-3">
                    <Badge variant="outline">
                      {tasks.filter(t => t.projeto_id === project.id).length} tarefas
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map(template => (
              <Card key={template.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{template.nome}</CardTitle>
                </CardHeader>
                <CardContent>
                  {template.descricao && (
                    <p className="text-sm text-gray-600 mb-3">{template.descricao}</p>
                  )}
                  <div className="space-y-2 text-sm">
                    <div><strong>Tipo:</strong> {template.tipo}</div>
                    <div><strong>Prioridade:</strong> {template.prioridade}</div>
                    {template.tempo_estimado && (
                      <div><strong>Tempo Estimado:</strong> {template.tempo_estimado}h</div>
                    )}
                    {template.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {template.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="finalizadas">
          <div className="space-y-2">
            {tasks.filter(task => task.status === 'finalizada').map(task => (
              <Card key={task.id} className="cursor-pointer hover:shadow-md" onClick={() => handleTaskClick(task)}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium">{task.titulo}</h3>
                      {task.resumo_conclusao && (
                        <p className="text-sm text-gray-600 mt-1">{task.resumo_conclusao}</p>
                      )}
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        {task.data_conclusao && (
                          <div>Concluída em: {new Date(task.data_conclusao).toLocaleDateString()}</div>
                        )}
                        {task.responsavel && (
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {task.responsavel.nome}
                          </div>
                        )}
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      Finalizada
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <TaskModal
        task={selectedTask}
        isOpen={showTaskModal}
        onClose={() => {
          setShowTaskModal(false);
          setSelectedTask(null);
        }}
        onSave={handleTaskSave}
        projects={projects}
        templates={templates}
      />

      <ProjectModal
        isOpen={showProjectModal}
        onClose={() => setShowProjectModal(false)}
        onSave={createProject}
      />

      <TemplateModal
        isOpen={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
        onSave={createTemplate}
      />
    </div>
  );
}
