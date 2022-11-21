import { FilterState } from '@/features/filter';
import { axiosInstance, Credits, TMDB_BASE_URL } from '@/services/tmdb';

export const getMediaCredits = async (
  mediaId: number,
  mediaType: FilterState['mediaType']
) => {
  const response = await axiosInstance({
    url: `${TMDB_BASE_URL}/${mediaType}/${mediaId}/credits`,
  });
  return response.data as Credits;
};
