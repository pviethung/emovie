import { Movie, Tv } from '@/services/tmdb';
import { mediaLists } from '../mediaLists';

export type MediaList<T extends keyof typeof mediaLists> = {
  listType: T;
  listKey: keyof typeof mediaLists[T];
} & (T extends 'privateList'
  ? { accountId: string }
  : T extends 'relatedList'
  ? { mediaId: string; mediaType: 'tv' | 'movie' }
  : {});

export type TLists = {
  bookmarked: {
    listId: string;
    title: 'Bookmarked';
  };
  favorites: {
    listId: string;
    title: 'Favorites';
  };
  recent: {
    listId: string;
    title: 'Recent';
  };
};

export type PersonalLists = {
  bookmarked: {
    tv: number[];
    movie: number[];
  };
  favorites: {
    tv: number[];
    movie: number[];
  };
  recent: {
    tv: number[];
    movie: number[];
  };
};

export interface GetMediaListResponse {
  page: number;
  results: Movie[] | Tv[];
  total_results: number;
  total_pages: number;
}
