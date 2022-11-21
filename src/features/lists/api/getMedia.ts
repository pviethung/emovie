import { axiosInstance, TMDB_BASE_URL } from '@/services/tmdb';
import { GetMediaListResponse } from '../types';

export const getMedia = async (url: string) => {
  const response = await axiosInstance<GetMediaListResponse>({
    url: `${TMDB_BASE_URL}${url}`,
  });
  return response.data;
};
