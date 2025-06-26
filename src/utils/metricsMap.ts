export type MetricMapEntry = {
  accountKey: string;
  metrics: Record<string, string>;
};

export const metricMap: Record<string, MetricMapEntry> = {
  Meta: {
    accountKey: 'Account Name',
    metrics: {
      impressions: 'Impressions',
      clicks: 'Clicks',
      spend: 'Spend (Cost, Amount Spent)', // Corrigido aqui
      cpm: 'CPM (Cost per 1000 Impressions)',
      cpc: 'CPC (Cost per Click)',
      ctr: 'CTR (Clickthrough Rate)',
      conversions: 'Action Messaging Conversations Started (Onsite Conversion)',
      costPerConversion: 'Cost Per Action Messaging Conversations Started (Onsite Conversion)',
      campaign: 'Campaign Name',
      adset: 'Adset Name',
      ad: 'Ad Name',
    },
  },

  Google: {
    accountKey: 'Account Name',
    metrics: {
      impressions: 'Impressions',
      clicks: 'Clicks',
      spend: 'Cost', // Corrigido aqui
      cpm: 'Average CPM',
      cpc: 'Average CPC',
      ctr: 'CTR',
      conversions: 'Conversions',
      costPerConversion: 'Cost per Conversion',
      campaign: 'Campaign Name',
      adset: 'Ad Group Name',
      ad: 'Ad Name',
    },
  },

  LinkedIn: {
    accountKey: 'Account Name',
    metrics: {
      impressions: 'Ad Analytics Impressions',
      clicks: 'Ad Analytics Clicks',
      spend: 'Ad Analytics Cost (USD)',
      cpm: 'CPM',
      cpc: 'CPC',
      ctr: 'CTR',
      conversions: 'Ad Analytics Job Applications',
      costPerConversion: '', // Vazio porque não tem
      campaign: 'Campaign Name',
      adset: 'Campaign Group Name',
      ad: 'Creative Name (Adhoc)',
    },
  },

  Relatorios: {
    accountKey: 'Account Name',
    metrics: {
      contatos: 'Contatos',
      agendado: 'Agendado',
      atendimento: 'Atendimento',
      orcamentos: 'Orçamentos',
      vendas: 'Vendas',
      faturado: 'Faturado',
    },
  },
};

