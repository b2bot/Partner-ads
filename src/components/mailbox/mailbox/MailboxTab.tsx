
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Inbox, 
  Send, 
  Star, 
  FileText, 
  Trash2, 
  Settings, 
  LogOut,
  User,
  Mail,
  Zap
} from 'lucide-react';
import { MailboxList } from './MailboxList';
import { MailboxSettings } from './MailboxSettings';
import { NewMessageModal } from './NewMessageModal';
import { AutomationsTab } from '../automations/components/AutomationsTab';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export const MailboxTab = () => {
  const [activeTab, setActiveTab] = useState('inbox');
  const [isNewMessageOpen, setIsNewMessageOpen] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Logout realizado com sucesso!');
    } catch (error) {
      toast.error('Erro ao fazer logout');
    }
  };

  const handleMessageSelect = (messageId: string) => {
    setSelectedMessageId(messageId);
  };

  const menuItems = [
    { id: 'inbox', label: 'Caixa de Entrada', icon: Inbox, count: 0 },
    { id: 'sent', label: 'Enviados', icon: Send, count: 0 },
    { id: 'starred', label: 'Marcados', icon: Star, count: 0 },
    { id: 'draft', label: 'Rascunhos', icon: FileText, count: 0 },
    { id: 'trash', label: 'Lixeira', icon: Trash2, count: 0 },
    { id: 'automations', label: 'Automações', icon: Zap, count: null },
    { id: 'settings', label: 'Configurações', icon: Settings, count: null }
  ];

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br">
      {/* Header com informações do usuário */}
      <div className="bg-white/80 backdrop-blur-md border-b border-purple-200/50 px-0 py-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <User className="h-5 w-5 text-purple-600" />
            <span className="text-sm text-gray-700">
              {user?.email || 'Usuário não autenticado'}
            </span>
          </div>
          <Button
            onClick={handleSignOut}
            variant="ghost"
            size="sm"
            className="text-purple-600 hover:text-purple-700"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>

      {/* Menu Horizontal com Glassmorphism */}
      <div className="bg-white/70 backdrop-blur-md border-b border-purple-200/50 px-6 py-3">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex items-center justify-between">
            <TabsList className="bg-white/50 backdrop-blur-sm border border-purple-200/50 p-1 rounded-xl">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <TabsTrigger 
                    key={item.id}
                    value={item.id} 
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-purple-100/70"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                    {item.count !== null && item.count > 0 && (
                      <span className="bg-primary text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] h-5 flex items-center justify-center">
                        {item.count}
                      </span>
                    )}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {/* Botão Nova Mensagem */}
            {activeTab !== 'settings' && activeTab !== 'automations' && (
              <Button 
                onClick={() => setIsNewMessageOpen(true)}
                className="primary hover:bg-purple-700 text-white shadow-lg backdrop-blur-sm"
              >
                <Mail className="h-5 w-5" />
              </Button>
            )}
          </div>

          {/* Conteúdo das Abas */}
          <div className="mt-6">
            <TabsContent value="inbox" className="m-0">
              <MailboxList folder="inbox" onMessageSelect={handleMessageSelect} />
            </TabsContent>
            
            <TabsContent value="sent" className="m-0">
              <MailboxList folder="sent" onMessageSelect={handleMessageSelect} />
            </TabsContent>
            
            <TabsContent value="starred" className="m-0">
              <MailboxList folder="starred" onMessageSelect={handleMessageSelect} />
            </TabsContent>
            
            <TabsContent value="draft" className="m-0">
              <MailboxList folder="draft" onMessageSelect={handleMessageSelect} />
            </TabsContent>
            
            <TabsContent value="trash" className="m-0">
              <MailboxList folder="trash" onMessageSelect={handleMessageSelect} />
            </TabsContent>
            
            <TabsContent value="automations" className="m-0">
              <AutomationsTab />
            </TabsContent>
            
            <TabsContent value="settings" className="m-0">
              <MailboxSettings />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Modal Nova Mensagem */}
      <NewMessageModal 
        open={isNewMessageOpen}
        onClose={() => setIsNewMessageOpen(false)}
      />
    </div>
  );
};
