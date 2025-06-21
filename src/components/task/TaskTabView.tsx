import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnimatePresence, motion } from 'framer-motion';
import { TaskListView } from './TaskListView';
import { TaskKanban } from './TaskKanban';
import { TaskCalendar } from './TaskCalendar';
import { TaskProjectsView } from './TaskProjectsView';
import { TaskFlowTemplates } from './TaskFlowTemplates';
import { TaskManagerDashboard } from './TaskManagerDashboard';
import { useAuth } from '@/hooks/useAuth';

interface TaskTabViewProps {
  onEditProject: (projectId: any) => void;
}

export function TaskTabView({ onEditProject }: TaskTabViewProps) {
  const { isRootAdmin } = useAuth();
  const [activeView, setActiveView] = useState('list');
  const tabs = [
    { value: 'list', label: 'Lista', element: <TaskListView /> },
    { value: 'kanban', label: 'Kanban', element: <TaskKanban /> },
    { value: 'calendar', label: 'Calendário', element: <TaskCalendar /> },
    { value: 'projects', label: 'Projetos', element: <TaskProjectsView onEditProject={onEditProject} /> },
    { value: 'flows', label: 'Fluxos', element: <TaskFlowTemplates /> },
    { value: 'overview', label: 'Visão Geral', element: <TaskManagerDashboard /> },
  ];

  const visibleTabs = isRootAdmin ? tabs : tabs.filter(t => t.value !== 'overview');

  const ActiveComponent = visibleTabs.find(t => t.value === activeView)?.element;

  return (
    <div className="w-full">
      <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
        <TabsList className={`grid w-full ${isRootAdmin ? 'grid-cols-6' : 'grid-cols-5'} max-w-md mb-6`}>
          {visibleTabs.map(tab => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeView}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          {ActiveComponent}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
