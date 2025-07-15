
import { useTasks } from '@/hooks/Tarefas/useTasks';
import { useProjects } from '@/hooks/Tarefas/useProjects';
import { useAuth } from '@/hooks/Tarefas/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Users, 
  TrendingUp,
  BarChart3 
} from 'lucide-react';

interface ManagerViewProps {
  projectId?: string;
}

export const ManagerView = ({ projectId }: ManagerViewProps = {}) => {
  const { profile } = useAuth();
  const { data: tasks } = useTasks(projectId);
  const { data: projects } = useProjects();

  // Verificar se o usuário tem permissão de gestor
  if (profile?.role !== 'admin') {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Acesso Restrito
        </h3>
        <p className="text-gray-600">
          Esta visão está disponível apenas para gestores e administradores.
        </p>
      </div>
    );
  }

  // Métricas calculadas
  const totalTasks = tasks?.length || 0;
  const overdueTasks = tasks?.filter(task => {
    if (!task.due_date) return false;
    const dueDate = new Date(task.due_date);
    const today = new Date();
    return dueDate < today && task.status !== 'finalizada';
  }) || [];

  const tasksByStatus = tasks?.reduce((acc, task) => {
    acc[task.status || 'backlog'] = (acc[task.status || 'backlog'] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  const tasksByUser = tasks?.reduce((acc, task) => {
    const userId = task.assigned_to || 'unassigned';
    const userName = task.assigned_user?.nome || 'Não atribuído';
    
    if (!acc[userId]) {
      acc[userId] = { name: userName, total: 0, completed: 0, overdue: 0 };
    }
    
    acc[userId].total++;
    
    if (task.status === 'finalizada') {
      acc[userId].completed++;
    }
    
    if (task.due_date && new Date(task.due_date) < new Date() && task.status !== 'finalizada') {
      acc[userId].overdue++;
    }
    
    return acc;
  }, {} as Record<string, { name: string; total: number; completed: number; overdue: number }>) || {};

  const projectProgress = projects?.map(project => {
    const projectTasks = tasks?.filter(task => task.project?.id === project.id) || [];
    const totalTasks = projectTasks.length;
    const completedTasks = projectTasks.filter(task => task.status === 'finalizada').length;
    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    
    return {
      ...project,
      totalTasks,
      completedTasks,
      progress
    };
  }) || [];

  return (
    <div className="space-y-6">
      {/* Header */}
     {/* <div>
        <h2 className="text-2xl font-bold">Visão de Gestor</h2>
        <p className="text-gray-600">Painel gerencial com métricas e indicadores</p>
      </div>*/}

      {/* Cards de métricas principais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Tarefas</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTasks}</div>
            <p className="text-xs text-muted-foreground">
              {tasksByStatus.finalizada || 0} finalizadas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tarefas Atrasadas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{overdueTasks.length}</div>
            <p className="text-xs text-muted-foreground">
              Requerem atenção imediata
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Execução</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {tasksByStatus.em_execucao || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Tarefas em andamento
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conclusão</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {totalTasks > 0 ? Math.round(((tasksByStatus.finalizada || 0) / totalTasks) * 100) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              Tarefas finalizadas
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tarefas Atrasadas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Tarefas Atrasadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            {overdueTasks.length > 0 ? (
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {overdueTasks.slice(0, 5).map((task) => (
                  <div key={task.id} className="border-l-4 border-red-500 pl-3">
                    <h4 className="font-medium">{task.title}</h4>
                    <p className="text-sm text-gray-600">
                      Vencimento: {task.due_date && new Date(task.due_date).toLocaleDateString('pt-BR')}
                    </p>
                    <p className="text-sm text-gray-500">
                      Responsável: {task.assigned_user?.nome || 'Não atribuído'}
                    </p>
                  </div>
                ))}
                {overdueTasks.length > 5 && (
                  <p className="text-sm text-gray-500 text-center">
                    +{overdueTasks.length - 5} tarefas atrasadas
                  </p>
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                Nenhuma tarefa atrasada 🎉
              </p>
            )}
          </CardContent>
        </Card>

        {/* Carga de Trabalho por Usuário */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Carga de Trabalho
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(tasksByUser).map(([userId, userData]) => (
                <div key={userId} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{userData.name}</span>
                    <div className="flex gap-2">
                      <Badge variant="outline">{userData.total} total</Badge>
                      {userData.overdue > 0 && (
                        <Badge variant="destructive">{userData.overdue} atrasadas</Badge>
                      )}
                    </div>
                  </div>
                  <Progress 
                    value={(userData.completed / userData.total) * 100} 
                    className="h-2" 
                  />
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>{userData.completed} concluídas</span>
                    <span>{Math.round((userData.completed / userData.total) * 100)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progresso dos Projetos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Progresso dos Projetos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projectProgress.map((project) => (
              <div key={project.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{project.name}</h4>
                    <p className="text-sm text-gray-600">
                      {project.completedTasks}/{project.totalTasks} tarefas concluídas
                    </p>
                  </div>
                  <Badge 
                    variant="outline"
                    className={project.progress === 100 ? 'bg-green-100 text-green-800' : ''}
                  >
                    {Math.round(project.progress)}%
                  </Badge>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>
            ))}
            
            {projectProgress.length === 0 && (
              <p className="text-gray-500 text-center py-4">
                Nenhum projeto encontrado
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
