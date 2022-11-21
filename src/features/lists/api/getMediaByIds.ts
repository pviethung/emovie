import { FilterState } from '@/features/filter';
import { axiosInstance, MovieDetail, TvDetail } from '@/services/tmdb';

export const getMediaByIds = async (
  mediaType: FilterState['mediaType'],
  mediaIds?: number[]
) => {
  if (!mediaIds) return [];
  const result = [] as MovieDetail[] | TvDetail[];
  const response = await Promise.allSettled(
    mediaIds.map((id) => {
      return axiosInstance({
        url: `/${mediaType}/${id}`,
      });
    })
  );

  response.forEach((v) => {
    if (v.status === 'fulfilled') {
      result.push(v.value.data);
    }
  });

  return result;
};
