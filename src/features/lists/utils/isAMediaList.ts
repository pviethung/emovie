import { mediaLists } from '../mediaLists';
import { MediaList } from '../types';

export function isAMediaList<T extends keyof typeof mediaLists>(
  props: any,
  listType: T
): props is MediaList<T> {
  return props.listType === listType;
}
