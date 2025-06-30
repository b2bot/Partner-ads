import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, Mail, Settings, Signature, Bot } from 'lucide-react';
import { useMailboxSettings, useSaveMailboxSettings } from '@/hooks/mailbox/useMailboxSettings';
import { MailboxSettings as MailboxSettingsType } from '@/types/mailbox';

export const MailboxSettings = () => {
  const { data: settings, isLoading } = useMailboxSettings();
  const saveMutation = useSaveMailboxSettings();
  const [activeSection, setActiveSection] = useState<string>('smtp');

  const [formData, setFormData] = useState<Partial<MailboxSettingsType & { smtp_password?: string; imap_password?: string }>>({
    smtp_host: '',
    smtp_port: 587,
    smtp_encryption: 'tls',
    smtp_username: '',
    smtp_password: '',
    imap_host: '',
    imap_port: 993,
    imap_encryption: 'ssl',
    imap_username: '',
    imap_password: '',
    signature_html: '',
    auto_reply_enabled: false,
    auto_reply_message: ''
  });

  useEffect(() => {
    if (settings) {
      setFormData({
        ...settings,
        smtp_password: '',
        imap_password: ''
      });
    }
  }, [settings]);

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      // Remove as senhas antes de enviar para a API (elas devem ser configuradas como secrets)
      const { smtp_password, imap_password, ...dataToSave } = formData;
      
      if (smtp_password || imap_password) {
        alert('Lembre-se de configurar as senhas como environment variables:\n- SMTP_PASSWORD\n- IMAP_PASSWORD');
      }
      
      await saveMutation.mutateAsync(dataToSave);
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando configurações...</p>
        </div>
      </div>
    );
  }

  const menuItems = [
    { id: 'smtp', label: 'SMTP', icon: Mail },
    { id: 'imap', label: 'IMAP', icon: Settings },
    { id: 'signature', label: 'Assinatura', icon: Signature },
    { id: 'auto-reply', label: 'Resposta Automática', icon: Bot }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'smtp':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-purple-700">Configurações SMTP (Envio)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="smtp_host">Servidor SMTP</Label>
                  <Input
                    id="smtp_host"
                    value={formData.smtp_host || ''}
                    onChange={(e) => handleInputChange('smtp_host', e.target.value)}
                    placeholder="smtp.gmail.com"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Exemplo: smtp.gmail.com, smtp.outlook.com
                  </p>
                </div>
                <div>
                  <Label htmlFor="smtp_port">Porta</Label>
                  <Input
                    id="smtp_port"
                    type="number"
                    value={formData.smtp_port || 587}
                    onChange={(e) => handleInputChange('smtp_port', parseInt(e.target.value))}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    TLS: 587, SSL: 465
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="smtp_encryption">Criptografia</Label>
                  <select
                    id="smtp_encryption"
                    value={formData.smtp_encryption || 'tls'}
                    onChange={(e) => handleInputChange('smtp_encryption', e.target.value)}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="tls">TLS</option>
                    <option value="ssl">SSL</option>
                    <option value="none">Nenhuma</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="smtp_username">Usuário</Label>
                  <Input
                    id="smtp_username"
                    value={formData.smtp_username || ''}
                    onChange={(e) => handleInputChange('smtp_username', e.target.value)}
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="smtp_password">Senha SMTP</Label>
                <Input
                  id="smtp_password"
                  type="password"
                  value={formData.smtp_password || ''}
                  onChange={(e) => handleInputChange('smtp_password', e.target.value)}
                  placeholder="Digite a senha do email"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Esta senha será configurada como variável de ambiente SMTP_PASSWORD
                </p>
              </div>

              <div className="bg-white p-4 rounded-md border border-purple-200">
                <p className="text-sm text-purple-800">
                  <strong>Importante:</strong> Para segurança, as senhas são armazenadas como variáveis de ambiente:
                  <br />
                  - SMTP_PASSWORD para senha SMTP
                  <br />
                  - IMAP_PASSWORD para senha IMAP
                </p>
              </div>
            </CardContent>
          </Card>
        );

      case 'imap':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-purple-700">Configurações IMAP (Recebimento)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="imap_host">Servidor IMAP</Label>
                  <Input
                    id="imap_host"
                    value={formData.imap_host || ''}
                    onChange={(e) => handleInputChange('imap_host', e.target.value)}
                    placeholder="imap.gmail.com"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Exemplo: imap.gmail.com, outlook.office365.com
                  </p>
                </div>
                <div>
                  <Label htmlFor="imap_port">Porta</Label>
                  <Input
                    id="imap_port"
                    type="number"
                    value={formData.imap_port || 993}
                    onChange={(e) => handleInputChange('imap_port', parseInt(e.target.value))}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    SSL: 993, STARTTLS: 143
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="imap_encryption">Criptografia</Label>
                  <select
                    id="imap_encryption"
                    value={formData.imap_encryption || 'ssl'}
                    onChange={(e) => handleInputChange('imap_encryption', e.target.value)}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="ssl">SSL</option>
                    <option value="tls">STARTTLS</option>
                    <option value="none">Nenhuma</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="imap_username">Usuário</Label>
                  <Input
                    id="imap_username"
                    value={formData.imap_username || ''}
                    onChange={(e) => handleInputChange('imap_username', e.target.value)}
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="imap_password">Senha IMAP</Label>
                <Input
                  id="imap_password"
                  type="password"
                  value={formData.imap_password || ''}
                  onChange={(e) => handleInputChange('imap_password', e.target.value)}
                  placeholder="Digite a senha do email"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Esta senha será configurada como variável de ambiente IMAP_PASSWORD
                </p>
              </div>
            </CardContent>
          </Card>
        );

      case 'signature':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-purple-700">Assinatura de Email</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="signature_html">Assinatura HTML</Label>
                <Textarea
                  id="signature_html"
                  value={formData.signature_html || ''}
                  onChange={(e) => handleInputChange('signature_html', e.target.value)}
                  placeholder="<p>Atenciosamente,<br/>Seu Nome<br/><b>Sua Empresa</b></p>"
                  rows={10}
                  className="focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Use HTML válido para formatar sua assinatura
                </p>
              </div>

              {formData.signature_html && (
                <div>
                  <Label>Prévia da Assinatura:</Label>
                  <div 
                    className="p-4 border rounded-md bg-gray-50 border-purple-200"
                    dangerouslySetInnerHTML={{ __html: formData.signature_html }}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 'auto-reply':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-purple-700">Resposta Automática</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="auto_reply_enabled"
                  checked={formData.auto_reply_enabled || false}
                  onCheckedChange={(checked) => handleInputChange('auto_reply_enabled', checked)}
                />
                <Label htmlFor="auto_reply_enabled">Ativar resposta automática</Label>
              </div>

              {formData.auto_reply_enabled && (
                <div>
                  <Label htmlFor="auto_reply_message">Mensagem de Resposta Automática</Label>
                  <Textarea
                    id="auto_reply_message"
                    value={formData.auto_reply_message || ''}
                    onChange={(e) => handleInputChange('auto_reply_message', e.target.value)}
                    placeholder="Obrigado por sua mensagem. Retornaremos em breve..."
                    rows={6}
                    className="focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-full bg-gray-50">
      {/* Menu lateral interno */}
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Configurações</h3>
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeSection === item.id
                    ? 'bg-purple-100 text-purple-700 border border-purple-200'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Botão de salvar fixo no menu lateral */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <Button 
            onClick={handleSave}
            disabled={saveMutation.isPending}
            className="w-full primary hover:bg-purple-700 text-white"
          >
            {saveMutation.isPending ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Salvando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 p-6">
        {renderContent()}
      </div>
    </div>
  );
};
