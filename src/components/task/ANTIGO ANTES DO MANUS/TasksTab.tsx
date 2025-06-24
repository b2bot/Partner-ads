import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ListView } from "@/components/Tarefas/ListView";
import { KanbanView } from "@/components/Tarefas/KanbanView";
import { CalendarView } from "@/components/Tarefas/CalendarView";
import { ProjectsView } from "@/components/Tarefas/ProjectsView";
import { WorkflowsView } from "@/components/Tarefas/WorkflowsView";
import { ManagerView } from "@/components/Tarefas/ManagerView";
import { TaskModal } from "@/components/Tarefas/TaskModal";
import { TaskDetailsDrawer } from "@/components/Tarefas/TaskDetailsDrawer";
import { useAuth } from '@/hooks/useAuth';
import { TaskWithDetails, TabType } from "@/types/task";
import {
  List,
  Layout,
  Calendar,
  Folder,
  Workflow,
  BarChart3,
  Plus,
  LogOut,
} from "lucide-react";

export function TasksTab() {
  const { hasPermission } = useAuth();
  
  const [activeTab, setActiveTab] = useState<TabType>("lista");
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [taskDetailsOpen, setTaskDetailsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskWithDetails | null>(null);
  const { signOut, profile } = useAuth();

  const handleTaskClick = (task: TaskWithDetails) => {
    setSelectedTask(task);
    setTaskDetailsOpen(true);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  useEffect(() => {
    console.log("TAB ATIVA:", activeTab);
    console.log("PROFILE:", profile);
  }, [activeTab, profile]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Sistema de Tarefas</h1>
              <p className="text-muted-foreground">
                Gerencie suas tarefas e projetos de forma eficiente
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Button onClick={() => setTaskModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Nova Tarefa
              </Button>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Olá, {profile?.name}
                </span>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabType)}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="lista" className="flex items-center gap-2">
              <List className="h-4 w-4" />
              Lista
            </TabsTrigger>
            <TabsTrigger value="kanban" className="flex items-center gap-2">
              <Layout className="h-4 w-4" />
              Kanban
            </TabsTrigger>
            <TabsTrigger value="calendario" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Calendário
            </TabsTrigger>
            <TabsTrigger value="projetos" className="flex items-center gap-2">
              <Folder className="h-4 w-4" />
              Projetos
            </TabsTrigger>
            <TabsTrigger value="fluxos" className="flex items-center gap-2">
              <Workflow className="h-4 w-4" />
              Fluxos
            </TabsTrigger>
            <TabsTrigger value="gestor" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Visão de Gestor
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="lista">
              <ListView onTaskClick={handleTaskClick} />
            </TabsContent>

            <TabsContent value="kanban">
              <KanbanView onTaskClick={handleTaskClick} />
            </TabsContent>

            <TabsContent value="calendario">
              <CalendarView />
            </TabsContent>

            <TabsContent value="projetos">
              <ProjectsView />
            </TabsContent>

            <TabsContent value="fluxos">
              <WorkflowsView />
            </TabsContent>

            <TabsContent value="gestor">
              <ManagerView />
            </TabsContent>
          </div>
        </Tabs>
      </main>

      <TaskModal open={taskModalOpen} onOpenChange={setTaskModalOpen} mode="create" />

      {selectedTask && (
        <TaskDetailsDrawer
          open={taskDetailsOpen}
          onOpenChange={setTaskDetailsOpen}
          task={selectedTask}
        />
      )}
    </div>
  );
};

