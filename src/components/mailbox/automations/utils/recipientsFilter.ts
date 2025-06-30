
// Utilitário para filtros de destinatários
export interface RecipientsFilter {
  type: 'all' | 'custom' | 'domain' | 'list';
  emails?: string[];
  domain?: string;
  conditions?: any;
}

export const parseRecipientsFilter = (filter: RecipientsFilter): string[] => {
  switch (filter.type) {
    case 'all':
      return []; // Retorna vazio para indicar "todos"
    
    case 'custom':
      return filter.emails || [];
    
    case 'domain':
      // Em uma implementação real, você buscaria no banco
      return filter.domain ? [`@${filter.domain}`] : [];
    
    case 'list':
      // Em uma implementação real, você buscaria uma lista salva
      return filter.emails || [];
    
    default:
      return [];
  }
};

export const validateEmailList = (emails: string[]): { valid: string[], invalid: string[] } => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const valid: string[] = [];
  const invalid: string[] = [];

  emails.forEach(email => {
    const trimmed = email.trim();
    if (emailRegex.test(trimmed)) {
      valid.push(trimmed);
    } else {
      invalid.push(trimmed);
    }
  });

  return { valid, invalid };
};
