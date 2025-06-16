
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Plus, 
  Search, 
  Filter,
  Calendar,
  Clock,
  User,
  Tag,
  Play,
  Pause,
  CheckCircle2
} from 'lucide-react';

const priorityColors = {
  baixa: 'bg-green-100 text-green-800',
  media: 'bg-yellow-100 text-yellow-800',
  alta: 'bg-red-100 text-red-800',
  urgente: 'bg-purple-100 text-purple-800'
};

const statusColors = {
  backlog: 'bg-gray-100 text-gray-800',
  execucao: 'bg-blue-100 text-blue-800',
  revisao: 'bg-orange-100 text-orange-800',
  finalizada: 'bg-green-100 text-green-800'
};

// Mock data for demonstration
const mockTasks = [
  {
    id: '1',
    titulo: 'Criar campanha de Black Friday',
    descricao: 'Desenvolver estratégia completa para campanha de Black Friday',
    status: 'execucao',
    prioridade: 'alta',
    tipo: 'marketing',
    responsavel_nome: 'João Silva',
    data_prazo: '2024-01-20',
    tags: ['campanha', 'black-friday']
  },
  {
    id: '2',
    titulo: 'Atualizar criativos de anúncios',
    descricao: 'Revisar e atualizar os criativos das campanhas ativas',
    status: 'backlog',
    prioridade: 'media',
    tipo: 'design',
    responsavel_nome: 'Maria Santos',
    data_prazo: '2024-01-25',
    tags: ['design', 'anuncios']
  },
  {
    id: '3',
    titulo: 'Configurar relatórios automáticos',
    descricao: 'Implementar sistema de relatórios automáticos para clientes',
    status: 'revisao',
    prioridade: 'alta',
    tipo: 'desenvolvimento',
    responsavel_nome: 'Pedro Costa',
    data_prazo: '2024-01-18',
    tags: ['relatorios', 'automacao']
  }
];

export function TasksTab() {
  const [tasks] = useState(mockTasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('todos');
  const [selectedPriority, setSelectedPriority] = useState('todas');

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'todos' || task.status === selectedStatus;
    const matchesPriority = selectedPriority === 'todas' || task.prioridade === selectedPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Tarefas</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Gerencie e acompanhe todas as tarefas do projeto
          </p>
        </div>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-1" />
          Nova Tarefa
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total</p>
                <p className="text-2xl font-bold">{tasks.length}</p>
              </div>
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Em Execução</p>
                <p className="text-2xl font-bold">{tasks.filter(t => t.status === 'execucao').length}</p>
              </div>
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <Play className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Revisão</p>
                <p className="text-2xl font-bold">{tasks.filter(t => t.status === 'revisao').length}</p>
              </div>
              <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Finalizadas</p>
                <p className="text-2xl font-bold">{tasks.filter(t => t.status === 'finalizada').length}</p>
              </div>
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar tarefas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os status</SelectItem>
                <SelectItem value="backlog">Backlog</SelectItem>
                <SelectItem value="execucao">Em Execução</SelectItem>
                <SelectItem value="revisao">Revisão</SelectItem>
                <SelectItem value="finalizada">Finalizada</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedPriority} onValueChange={setSelectedPriority}>
              <SelectTrigger>
                <SelectValue placeholder="Prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas as prioridades</SelectItem>
                <SelectItem value="baixa">Baixa</SelectItem>
                <SelectItem value="media">Média</SelectItem>
                <SelectItem value="alta">Alta</SelectItem>
                <SelectItem value="urgente">Urgente</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tasks List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Lista de Tarefas ({filteredTasks.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredTasks.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="font-medium text-gray-600 mb-2">
                {tasks.length === 0 ? 'Nenhuma tarefa criada' : 'Nenhuma tarefa encontrada'}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                {tasks.length === 0 
                  ? 'Crie sua primeira tarefa para começar'
                  : 'Tente ajustar os filtros de busca'
                }
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <div key={task.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-medium text-slate-900 dark:text-white mb-1">
                        {task.titulo}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                        {task.descricao}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className={statusColors[task.status as keyof typeof statusColors]}>
                          {task.status === 'backlog' && 'Backlog'}
                          {task.status === 'execucao' && 'Em Execução'}
                          {task.status === 'revisao' && 'Revisão'}
                          {task.status === 'finalizada' && 'Finalizada'}
                        </Badge>
                        
                        <Badge className={priorityColors[task.prioridade as keyof typeof priorityColors]}>
                          {task.prioridade === 'baixa' && 'Baixa'}
                          {task.prioridade === 'media' && 'Média'}
                          {task.prioridade === 'alta' && 'Alta'}
                          {task.prioridade === 'urgente' && 'Urgente'}
                        </Badge>

                        {task.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="ml-4 text-right">
                      <div className="flex items-center text-sm text-slate-600 dark:text-slate-400 mb-1">
                        <User className="w-4 h-4 mr-1" />
                        {task.responsavel_nome}
                      </div>
                      <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(task.data_prazo).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                    <Button variant="outline" size="sm">
                      <Play className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
