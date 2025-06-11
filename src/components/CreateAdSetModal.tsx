import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { createAdSet } from '@/lib/metaApi';
import { useMetaData } from '@/hooks/useMetaData';

interface CreateAdSetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  campaignId?: string;
}

export function CreateAdSetModal({ isOpen, onClose, onSuccess, campaignId }: CreateAdSetModalProps) {
  const { credentials, selectedAdAccount } = useMetaData();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    campaign_id: campaignId || '',
    status: 'PAUSED',
    budgetType: 'daily',
    budget: '',
    billing_event: 'IMPRESSIONS',
    optimization_goal: 'REACH',
    ageMin: '18',
    ageMax: '65',
    gender: 'all',
    countries: 'BR'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!credentials?.access_token || !selectedAdAccount) return;

    setLoading(true);
    try {
      const targeting: any = {
        age_min: parseInt(formData.ageMin),
        age_max: parseInt(formData.ageMax),
        geo_locations: {
          countries: [formData.countries],
          location_types: ['home', 'recent']
        },
        publisher_platforms: ['facebook', 'instagram'],
        facebook_positions: ['feed'],
        instagram_positions: ['stream'],
        device_platforms: ['mobile', 'desktop']
      };

      if (formData.gender !== 'all') {
        targeting.genders = [parseInt(formData.gender)];
      }

      const adSetData = {
        name: formData.name,
        campaign_id: formData.campaign_id,
        status: formData.status,
        targeting,
        billing_event: formData.billing_event,
        optimization_goal: formData.optimization_goal,
        ...(formData.budgetType === 'daily' 
          ? { daily_budget: (parseFloat(formData.budget) * 100).toString() }
          : { lifetime_budget: (parseFloat(formData.budget) * 100).toString() }
        )
      };

      await createAdSet(credentials.access_token, selectedAdAccount, adSetData);
      
      toast({
        title: 'Sucesso',
        description: 'Conjunto de anúncios criado com sucesso.',
      });
      
      onSuccess();
      onClose();
      setFormData({
        name: '',
        campaign_id: '',
        status: 'PAUSED',
        budgetType: 'daily',
        budget: '',
        billing_event: 'IMPRESSIONS',
        optimization_goal: 'REACH',
        ageMin: '18',
        ageMax: '65',
        gender: 'all',
        countries: 'BR'
      });
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message || 'Erro ao criar conjunto de anúncios.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar Novo Conjunto de Anúncios</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Conjunto</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="campaign_id">ID da Campanha</Label>
            <Input
              id="campaign_id"
              value={formData.campaign_id}
              onChange={(e) => setFormData({ ...formData, campaign_id: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tipo de Orçamento</Label>
              <Select value={formData.budgetType} onValueChange={(value) => setFormData({ ...formData, budgetType: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Orçamento diário</SelectItem>
                  <SelectItem value="lifetime">Orçamento vitalício</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Orçamento (R$)</Label>
              <Input
                id="budget"
                type="number"
                step="0.01"
                min="1"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Evento de Cobrança</Label>
              <Select value={formData.billing_event} onValueChange={(value) => setFormData({ ...formData, billing_event: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IMPRESSIONS">Impressões</SelectItem>
                  <SelectItem value="LINK_CLICKS">Cliques no link</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Meta de Otimização</Label>
              <Select value={formData.optimization_goal} onValueChange={(value) => setFormData({ ...formData, optimization_goal: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="REACH">Alcance</SelectItem>
                  <SelectItem value="LINK_CLICKS">Cliques no link</SelectItem>
                  <SelectItem value="IMPRESSIONS">Impressões</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-medium">Segmentação</Label>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ageMin">Idade Mínima</Label>
                <Input
                  id="ageMin"
                  type="number"
                  min="13"
                  max="65"
                  value={formData.ageMin}
                  onChange={(e) => setFormData({ ...formData, ageMin: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ageMax">Idade Máxima</Label>
                <Input
                  id="ageMax"
                  type="number"
                  min="18"
                  max="65"
                  value={formData.ageMax}
                  onChange={(e) => setFormData({ ...formData, ageMax: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Gênero</Label>
                <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="1">Masculino</SelectItem>
                    <SelectItem value="2">Feminino</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="countries">País</Label>
                <Select value={formData.countries} onValueChange={(value) => setFormData({ ...formData, countries: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BR">Brasil</SelectItem>
                    <SelectItem value="US">Estados Unidos</SelectItem>
                    <SelectItem value="CA">Canadá</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVE">Ativo</SelectItem>
                <SelectItem value="PAUSED">Pausado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Criando...' : 'Criar Conjunto de Anúncios'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
