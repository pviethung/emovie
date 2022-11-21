import { useQuery } from '@tanstack/react-query';
import { getMedia } from '../api/getMedia';
import { mediaLists } from '../mediaLists';
import { MediaList } from '../types';
import { isAMediaList } from '../utils/isAMediaList';

export const useGetMedia = <T extends keyof typeof mediaLists>(
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

  return useQuery(key, () => getMedia(url));
};
