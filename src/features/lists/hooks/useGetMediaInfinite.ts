import { useInfiniteQuery } from '@tanstack/react-query';
import { getMediaInfinite } from '../api/getMediaInfinite';
import { mediaLists } from '../mediaLists';
import { MediaList } from '../types';
import { isAMediaList } from '../utils/isAMediaList';

export const useGetMediaInfinite = <T extends keyof typeof mediaLists>(
  props: MediaList<T>
) => {
  let url = '';
  let key: unknown[] = [];

  if (isAMediaList<'publicList'>(props, 'publicList')) {
    url = mediaLists[props.listType][props.listKey].url;
    key = [props.listKey];
  }

  if (isAMediaList<'privateList'>(props, 'privateList')) {
    url = mediaLists[props.listType][props.listKey].url(props.accountId);
    key = [props.listKey, { accountId: props.accountId }];
  }

  if (isAMediaList<'relatedList'>(props, 'relatedList')) {
    url = mediaLists[props.listType][props.listKey].url(
      props.mediaId,
      props.mediaType
    );
    key = [props.listKey, { mediaId: props.mediaId }];
  }

  return useInfiniteQuery(
    key,
    ({ pageParam = 1 }) => getMediaInfinite(url + '?page=' + pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.results.length === 0) return undefined;
        const nextPage = lastPage.page + 1;
        return nextPage;
      },
    }
  );
};
