import { axiosInstance } from '@/services/tmdb';

export const getSearchResults = async (
  url: string,
  query: string,
  page: number
) => {
  const res = await axiosInstance({
    url,
    params: {
      query,
      page,
    },
  });
  return res.data;
};
