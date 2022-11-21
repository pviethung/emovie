import { axiosInstance } from '@/services/tmdb';

export const getMEdiaDetail = async (
  mediaType: 'tv' | 'movie',
  mediaId: string
) => {
  const res = await axiosInstance({
    url: `${mediaType}/${mediaId}`,
    params: {
      append_to_response:
        'videos,recommendations,similar,credits,reviews,season',
    },
  });
  return res.data;
};
