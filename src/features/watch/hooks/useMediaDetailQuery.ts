import { MovieDetail, TvDetail } from '@/services/tmdb';
import { useQuery } from '@tanstack/react-query';
import { getMEdiaDetail } from '../api/getMediaDetail';

export const useMediaDetailQuery = (
  mediaType: 'tv' | 'movie',
  mediaId: string
) => {
  return useQuery<MovieDetail | TvDetail>([mediaType, mediaId], async () => {
    return getMEdiaDetail(mediaType, mediaId);
  });
};
