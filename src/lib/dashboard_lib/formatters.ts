
export const formatNumber = (num?: number): string => {
  if (typeof num !== 'number' || isNaN(num)) return '0';
  return new Intl.NumberFormat('pt-BR').format(num);
};

export const formatCurrency = (num?: number): string => {
  if (typeof num !== 'number' || isNaN(num)) return 'R$ 0,00';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(num);
};

export const formatPercentage = (num?: number): string => {
  if (typeof num !== 'number' || isNaN(num)) return '0%';
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num / 100);
};

export const formatDecimal = (num?: number, decimals: number = 2): string => {
  if (typeof num !== 'number' || isNaN(num)) return '0';
  return num.toFixed(decimals);
};
