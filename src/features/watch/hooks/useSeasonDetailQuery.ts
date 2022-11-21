import { useQuery } from '@tanstack/react-query';
import { getSeasonDetail } from '../api/getSeasonDetail';

export const useSeasonDetailQuery = (tvId: string, seasonNumber: number) => {
  return useQuery(['seasons', tvId, seasonNumber], async () => {
    return getSeasonDetail(seasonNumber, tvId);
  });
};
