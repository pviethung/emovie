import { axiosInstance } from '@/services/tmdb';

export const getDiscoveryResults = async (url: string) => {
  const res = await axiosInstance({
    url,
  });
  return res.data;
};
