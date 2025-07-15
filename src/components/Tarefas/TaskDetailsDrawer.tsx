import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTaskComments, useCreateComment } from '@/hooks/Tarefas/useComments';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { TaskPriorityBadge } from './TaskPriorityBadge';
import { TaskStatusBadge } from './TaskStatusBadge';
import { Calendar, Clock, User, FolderOpen, Pencil, MessageCircle, Send, Edit, FileText, Paperclip, X, Upload, Download } from 'lucide-react';
import { TaskWithDetails, TaskStatus, TaskPriority } from '@/types/task';
import { useUpdateTask, useDeleteTask } from '@/hooks/Tarefas/useTasks';
import { useAuth } from '@/hooks/useAuth';
import { useCollaborators } from '@/hooks/useCollaborators';
import { useProjects } from '@/hooks/Tarefas/useProjects';

interface EditTaskForm {
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigned_to: string;
  project_id: string;
  description: string;
  due_date: string;
  estimated_hours: number;
}

interface TaskDetailsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: TaskWithDetails | null;
}

export const TaskDetailsDrawer: React.FC<TaskDetailsDrawerProps> = ({
  open,
  onOpenChange,
  task,
}) => {
  const { profile } = useAuth();
  const { data: comments } = useTaskComments(task?.id || '');
  const createComment = useCreateComment();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();
  const { collaborators } = useCollaborators();
  const { data: projects = [] } = useProjects();
  const [newComment, setNewComment] = useState('');

  const { register, handleSubmit, reset, setValue, watch } = useForm<EditTaskForm>({ 
    defaultValues: {
      title: task?.title || '',
      status: task?.status || 'backlog',
      priority: task?.priority || 'media',
      assigned_to: task.assigned_to  || '',
      project_id: task?.project_id || '',
      description: task?.description || '',
      due_date: task?.due_date?.slice(0, 10) || '',
      estimated_hours: task?.estimated_hours || 0,
    },
  });

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        status: task.status,
        priority: task.priority,
        assigned_to: task.assigned_to || '',
        project_id: task.project_id || '',
        description: task.description || '',
        due_date: task.due_date?.slice(0, 10) || '',
        estimated_hours: task.estimated_hours || 0,
      });
    }
  }, [task, reset]);

  const onSubmit = (data: EditTaskForm) => {
    if (!task) return;
    updateTask.mutate({
      id: task.id,
      updates: {
        title: data.title,
        status: data.status,
        priority: data.priority,
        assigned_to: data.assigned_to || null,
        project_id: data.project_id || null,
        description: data.description,
        due_date: data.due_date,
        estimated_hours: data.estimated_hours,
      },
    });
    onOpenChange(false);
  };
  
  // ─── Helper para formatar datas (pt-BR) ───
  const formatDate = (date?: string | null) => {
    if (!date) return 'Não definida';
    return new Date(date).toLocaleDateString('pt-BR');
  };
  
  // Função de enviar comentário
  const handleSendComment = async () => {
    if (!newComment.trim() || !profile || !task) return;
    try {
      await createComment.mutateAsync({
        task_id: task.id,
        author_id: profile.id,
        content: newComment.trim(),
      });
      setNewComment('');
    } catch (error) {
     console.error('Erro ao enviar comentário:', error);
    }
  };

  // Helper para extrair iniciais de um nome
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
     .toUpperCase()
      .slice(0, 2);
  };

  if (!task) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[600px] sm:max-w-[600px] overflow-y-auto">
        <div className="p-2">
          <h5 className="text-xl font-semibold mb-2">{task?.title ?? 'Informações da Tarefa '}</h5>

          <Tabs defaultValue="resumo" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-1 bg-transparent border border-gray-200 rounded-lg shadow-none items-stretch">
              <TabsTrigger
                value="resumo"
                className="flex-1 flex items-center justify-center bg-transparent text-gray-600
                           data-[state=active]:bg-primary
                           data-[state=active]:text-white
                           data-[state=active]:shadow-none
                           data-[state=active]:rounded-lg"
              >
                Resumo
              </TabsTrigger>
              <TabsTrigger
                value="comentarios"
                className="flex-1 flex items-center justify-center p-0 bg-transparent text-gray-600
                           data-[state=active]:bg-primary
                           data-[state=active]:text-white
                           data-[state=active]:shadow-none
                           data-[state=active]:rounded-lg"
              >
                Comentários
              </TabsTrigger>
              <TabsTrigger
                value="arquivos"
                className="flex-1 flex items-center justify-center p-0 bg-transparent text-gray-600
                           data-[state=active]:bg-primary
                           data-[state=active]:text-white
                           data-[state=active]:shadow-none
                           data-[state=active]:rounded-lg"
              >
                Arquivos
              </TabsTrigger>
              <TabsTrigger
                value="editar"
                className="flex-1 flex items-center justify-center p-0 bg-transparent text-gray-600
                           data-[state=active]:bg-primary
                           data-[state=active]:text-white
                           data-[state=active]:shadow-none
                           data-[state=active]:rounded-lg"
              >
                Editar
              </TabsTrigger>
            </TabsList>

						<TabsContent value="resumo">
						  <SheetHeader className="space-y-4">
							<div className="grid grid-cols-2 gap-4">
							  <div className="space-y-3">
								<div className="flex items-center gap-2 text-sm">
								  <FolderOpen className="h-4 w-4 text-gray-400" />
								  <span className="text-gray-600">Projeto:</span>
								  <span className="font-medium">
									{projects?.find((p) => p.id === task.project_id)?.name || 'Não atribuído'}
								  </span>
								</div>

								<div className="flex items-center gap-2 text-sm">
								  <User className="h-4 w-4 text-gray-400" />
								  <span className="text-gray-600">Responsável:</span>
								  {task.colaborador? (
									<div className="flex items-center gap-2">
									  <Avatar>
										{task.colaborador.foto_url ? (
										  <img src={task.colaborador.foto_url} alt={task.colaborador.nome} />
										) : (
										  <AvatarFallback>
											{getInitials(task.colaborador.nome)}
										  </AvatarFallback>
										)}
									  </Avatar>
									  <span>{task.colaborador.nome}</span>
									</div>
								  ) : (
									<span></span>
								  )}
								</div>

								<div className="flex items-center gap-2 text-sm">
								  <Calendar className="h-4 w-4 text-gray-400" />
								  <span className="text-gray-600">Data de entrega:</span>
								  <span>{formatDate(task.due_date)}</span>
								</div>
							  </div>

							  <div className="space-y-3">
								<div className="flex items-center gap-2 text-sm">
								  <Clock className="h-4 w-4 text-gray-400" />
								  <span className="text-gray-600">Horas estimadas:</span>
								  <span>{task.estimated_hours || 0}h</span>
								</div>

								<div className="flex items-center gap-2 text-sm">
								  <Calendar className="h-4 w-4 text-gray-400" />
								  <span className="text-gray-600">Criada em:</span>
								  <span>{formatDate(task.created_at)}</span>
								</div>

								<div className="flex items-center gap-3">
								  <TaskStatusBadge status={task.status} />
								  <TaskPriorityBadge priority={task.priority} />
								</div>
							  </div>
							</div>

							<div className="space-y-3 mt-4">
							  <div className="text-sm">
								<div className="flex items-center gap-2">
								  <Pencil className="h-4 w-4 text-gray-400" />
								  <span className="text-gray-600">Descrição:</span>
								</div>
								<p className="text-sm text-gray-700 whitespace-pre-wrap">
								  {task?.description || 'Sem descrição detalhada.'}
								</p>
							  </div>
							</div>

							{/* Tags */}
							{task.tags && task.tags.length > 0 && (
							  <div className="space-y-2 mt-6">
								<h3 className="font-medium">Tags</h3>
								<div className="flex flex-wrap gap-2">
								  {task.tags.map((tag) => (
									<Badge key={tag} variant="secondary">
									  {tag}
									</Badge>
								  ))}
								</div>
							  </div>
							)}
						  </SheetHeader>
						</TabsContent>

            <TabsContent value="comentarios">
              <div className="space-y-4">
                <h3 className="font-medium flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Comentários ({comments?.length || 0})
                </h3>

                {/* Lista de comentários */}
                <div className="space-y-4 max-h-60 overflow-y-auto">
                  {comments?.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {getInitials(comment.author?.nome || 'Usuario')}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">
                            {comment.author?.nome || profile?.nome || 'Usuário'}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(comment.created_at || '').toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{comment.content}</p>
                      </div>
                    </div>
                  ))}

                  {(!comments || comments.length === 0) && (
                    <p className="text-sm text-gray-500 text-center py-4">
                      Nenhum comentário ainda
                    </p>
                  )}
                </div>

                {/* Novo comentário */}
                <div className="space-y-2">
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Adicione um comentário..."
                    rows={3}
                  />
                  <div className="flex justify-end">
                    <Button
                      onClick={handleSendComment}
                      disabled={!newComment.trim() || createComment.isPending}
                      size="sm"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      {createComment.isPending ? 'Enviando...' : 'Enviar'}
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="arquivos">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium flex items-center gap-2">
                    <Paperclip className="h-4 w-4" />
                    Arquivos Anexados
                  </h3>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    multiple
                    onChange={(e) => {
                      // TODO: Implementar upload para Supabase Storage
                      console.log('Files selected:', e.target.files);
                    }}
                  />
                </div>
                
                <div className="space-y-2">
                  {task?.attachments && task.attachments.length > 0 ? (
                    task.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 border rounded-md">
                        <Paperclip className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{attachment.name || `Arquivo ${index + 1}`}</span>
                        <Button size="sm" variant="ghost" className="ml-auto">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 text-center py-4">
                      Nenhum arquivo anexado
                    </p>
                  )}
                </div>
              </div>
            </TabsContent>
             
            <TabsContent value="editar">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6">
                {/* Título */}
                <div>
                  <label className="text-sm font-medium">Título</label>
                  <Input {...register('title')} />
                </div>

                {/* Status */}
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <Select onValueChange={v => setValue('status', v as TaskStatus)} defaultValue={task?.status}>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="backlog">Backlog</SelectItem>
                      <SelectItem value="em_execucao">Em Execução</SelectItem>
                      <SelectItem value="em_revisao">Em Revisão</SelectItem>
                      <SelectItem value="aguardando">Aguardando</SelectItem>
                      <SelectItem value="finalizada">Finalizada</SelectItem>
                      <SelectItem value="cancelada">Cancelada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Prioridade */}
                <div>
                  <label className="text-sm font-medium">Prioridade</label>
                  <Select onValueChange={v => setValue('priority', v as TaskPriority)} defaultValue={task?.priority}>
                    <SelectTrigger>
                      <SelectValue placeholder="Prioridade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baixa">Baixa</SelectItem>
                      <SelectItem value="media">Média</SelectItem>
                      <SelectItem value="alta">Alta</SelectItem>
                      <SelectItem value="urgente">Urgente</SelectItem>					  
                    </SelectContent>
                  </Select>
                </div>

                {/* Responsável */}
                <div>
                  <label className="text-sm font-medium">Responsável</label>
                  <Select
                    onValueChange={(v) => setValue('assigned_to', v)}
                    value={watch('assigned_to')}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o responsável" />
                    </SelectTrigger>
                    <SelectContent>
                      {collaborators?.map((collab: any) => (
                        <SelectItem key={collab.id} value={collab.id}>
                          {collab.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Projeto */}
                <div>
                  <label className="text-sm font-medium">Projeto</label>
                  <Select
                    onValueChange={(v) => setValue('project_id', v)}
                    value={watch('project_id')}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o projeto" />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map((proj: any) => (
                        <SelectItem key={proj.id} value={proj.id}>
                          {proj.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Data de Entrega */}
                <div>
                  <label className="text-sm font-medium">Data de entrega</label>
                  <Input type="date" {...register('due_date')} />
                </div>

                {/* Horas Estimadas */}
                <div>
                  <label className="text-sm font-medium">Horas estimadas</label>
                  <Input type="number" {...register('estimated_hours', { valueAsNumber: true })} />
                </div>

                {/* Descrição */}
                <div>
                  <label className="text-sm font-medium">Descrição</label>
                  <Textarea rows={4} {...register('description')} />
                </div>

                {/* Botões */}
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">Salvar</Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};
