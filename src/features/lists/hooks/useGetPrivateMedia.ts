import { useQuery } from '@tanstack/react-query';
import { getList } from '../api/getList';
import { getMediaByIds } from '../api/getMediaByIds';
import { PersonalLists } from '../types';

export const useGetPrivateMedia = (
  listTitle: keyof PersonalLists,
  mediaType: 'movie' | 'tv',
  userId?: string
) => {
  return useQuery({
    queryKey: [listTitle, mediaType],
    queryFn: async () => {
      if (!userId) return [];
      const mediaIds = await getList(
        mediaType as 'tv' | 'movie',
        userId,
        listTitle
      );
      const values = await getMediaByIds(mediaType, mediaIds);
      values.reverse();

      return values;
    },
    // keepPreviousData: true,
  });
};
