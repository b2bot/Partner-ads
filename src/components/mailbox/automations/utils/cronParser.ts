
// Utilitário simples para parsing de expressões cron
export const parseCronExpression = (cronExpression: string): string => {
  if (!cronExpression) return 'Não agendado';

  const parts = cronExpression.split(' ');
  if (parts.length !== 5) return 'Expressão inválida';

  const [minute, hour, dayOfMonth, month, dayOfWeek] = parts;

  // Casos mais comuns
  if (cronExpression === '0 0 * * *') return 'Diariamente às 00:00';
  if (cronExpression === '0 9 * * *') return 'Diariamente às 09:00';
  if (cronExpression === '0 0 * * 0') return 'Semanalmente aos domingos às 00:00';
  if (cronExpression === '0 0 1 * *') return 'Mensalmente no dia 1 às 00:00';

  // Interpretação básica
  let description = '';
  
  if (minute === '0' && hour !== '*') {
    description += `às ${hour}:00`;
  } else if (minute !== '*' && hour !== '*') {
    description += `às ${hour}:${minute.padStart(2, '0')}`;
  }

  if (dayOfWeek !== '*') {
    const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    description += ` nas ${days[parseInt(dayOfWeek)]}`;
  } else if (dayOfMonth !== '*') {
    description += ` no dia ${dayOfMonth}`;
  } else {
    description += ' diariamente';
  }

  return description || cronExpression;
};

export const getNextRunDate = (cronExpression: string): Date | null => {
  // Implementação simplificada - em produção use uma biblioteca como node-cron
  const now = new Date();
  
  if (cronExpression === '0 0 * * *') {
    // Diário às 00:00
    const nextRun = new Date(now);
    nextRun.setHours(0, 0, 0, 0);
    if (nextRun <= now) {
      nextRun.setDate(nextRun.getDate() + 1);
    }
    return nextRun;
  }

  if (cronExpression === '0 9 * * *') {
    // Diário às 09:00
    const nextRun = new Date(now);
    nextRun.setHours(9, 0, 0, 0);
    if (nextRun <= now) {
      nextRun.setDate(nextRun.getDate() + 1);
    }
    return nextRun;
  }

  // Para outras expressões, adicione 1 hora (implementação simplificada)
  return new Date(now.getTime() + 60 * 60 * 1000);
};
