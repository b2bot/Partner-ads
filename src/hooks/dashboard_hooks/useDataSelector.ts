
import { useQuery } from '@tanstack/react-query';
import { useSheetData } from './useSheetData';
import { useMetaAPI } from '../../api/metaAPI';
import { useGoogleAPI } from '../../api/googleAPI';

export const useDataSelector = (
  platform: string,
  sheetId?: string,
  sheetRange?: string
) => {
  const { data: sheetData, isLoading: sheetLoading, error: sheetError } = useSheetData(sheetId, sheetRange);
  const { data: metaData, isLoading: metaLoading, error: metaError } = useMetaAPI();
  const { data: googleData, isLoading: googleLoading, error: googleError } = useGoogleAPI();

  return useQuery({
    queryKey: ['dataSelector', platform, sheetId, sheetRange],
    queryFn: () => {
      switch (platform) {
        case 'meta':
          return metaData || [];
        case 'google':
          return googleData || [];
        case 'relatorios':
          return sheetData || [];
        default:
          return sheetData || [];
      }
    },
    enabled: !!platform,
  });
};
