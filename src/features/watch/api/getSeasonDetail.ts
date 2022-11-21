import { axiosInstance } from '@/services/tmdb';

export type TSeasonDetail = {
  id: number;
  name: string;
  season_number: number;
  episodes: {
    id: number;
    name: string;
    still_path: string;
    episode_number: number;
  }[];
};

export const getSeasonDetail = async (seasonNumber: number, tvId: string) => {
  const rs = await axiosInstance<TSeasonDetail>({
    url: `tv/${tvId}/season/${seasonNumber}`,
  });
  return rs.data;
};
