
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

export function useDateRange() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 dias atrás
    to: new Date()
  });

  const getApiDateRange = () => {
    if (!dateRange?.from || !dateRange?.to) {
      return {
        since: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        until: new Date().toISOString().split('T')[0]
      };
    }

    return {
      since: dateRange.from.toISOString().split('T')[0],
      until: dateRange.to.toISOString().split('T')[0]
    };
  };

  return {
    dateRange,
    setDateRange,
    getApiDateRange
  };
}
