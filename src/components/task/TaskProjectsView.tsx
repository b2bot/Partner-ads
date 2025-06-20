import { useState } from 'react';
import { useProjects } from '@/hooks/task/useProjects';
import { Project } from '@/types/task';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Edit, Folder, Building } from 'lucide-react';
import { format } from 'date-fns';

interface TaskProjectsViewProps {
  onEditProject: (project: Project) => void;
}

export function TaskProjectsView({ onEditProject }: TaskProjectsViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [clientFilter, setClientFilter] = useState<string>('');
  const { projects, isLoading } = useProjects();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    );
  }

  const uniqueClients = Array.from(
    new Set(projects.flatMap((p: Project) => (p.client ? [p.client.nome] : [])))
  );

  const filteredProjects = projects.filter((project: Project) => {
    const matchesSearch = project.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      !statusFilter || statusFilter === 'all' || project.status === statusFilter;
    const matchesClient =
      !clientFilter || (project.client && project.client.nome === clientFilter);
    return matchesSearch && matchesStatus && matchesClient;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Buscar projetos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="ativo">Ativo</SelectItem>
            <SelectItem value="arquivado">Arquivado</SelectItem>
          </SelectContent>
        </Select>
        <Select value={clientFilter} onValueChange={setClientFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Cliente" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todos</SelectItem>
            {uniqueClients.map((client) => (
              <SelectItem key={client} value={client}>
                {client}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.length === 0 ? (
          <div className="col-span-full text-center py-12 premium-card">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-4 shadow-xl">
              <Folder className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-heading-4 text-slate-600 dark:text-slate-300 mb-2">
              Nenhum projeto encontrado
            </h3>
            <p className="text-body-small text-slate-500 dark:text-slate-400">
              Crie um novo projeto para começar
            </p>
          </div>
        ) : (
          filteredProjects.map((project: Project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={() => onEditProject(project)}
            />
          ))
        )}
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  onEdit,
}: {
  project: Project;
  onEdit: () => void;
}) {
  return (
    <Card className="premium-card hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{project.name}</CardTitle>
            <div className="flex items-center gap-2 mb-2">
              <Badge
                variant={project.status === 'ativo' ? 'default' : 'secondary'}
                className="text-xs"
              >
                {project.status === 'ativo' ? 'Ativo' : 'Arquivado'}
              </Badge>
              {project.client && (
                <Badge variant="outline" className="text-xs">
                  <Building className="h-3 w-3 mr-1" />
                  {project.client.nome}
                </Badge>
              )}
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onEdit}>
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {project.description && (
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
            {project.description}
          </p>
        )}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Criado em {format(new Date(project.created_at), 'dd/MM/yyyy')}</span>
          {project.created_by_profile && <span>por {project.created_by_profile.nome}</span>}
        </div>
      </CardContent>
    </Card>
  );
}
