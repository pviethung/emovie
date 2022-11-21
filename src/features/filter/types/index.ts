export type TMedia = 'movie' | 'tv';
type TSearch = TMedia | 'person' | 'multi';
type TSearchHistory = {
  id: string;
  name: string;
}[];

export type TSoryBy = {
  sort_by:
    | 'popularity.desc'
    | 'popularity.asc'
    | 'primary_release_date.desc'
    | 'primary_release_date.asc'
    | 'vote_average.desc'
    | 'vote_average.asc'
    | 'title.desc'
    | 'title.asc'
    | null;
};

export type TGenres = {
  with_genres: string | null;
};
export type TReleaseDateGTE = {
  'release_date.gte': string | null;
};
export type TReleaseDateLTE = {
  'release_date.lte': string | null;
};
export type TVoteAverageGTE = {
  'vote_average.gte': number | null;
};
export type TVoteAverageLTE = {
  'vote_average.lte': number | null;
};
export type TWithRuntimeGTE = {
  'with_runtime.gte': number | null;
};
export type TWithRuntimeLTE = {
  'with_runtime.lte': number | null;
};
export interface FilterState {
  mediaType: TMedia;
  searchType: TSearch;
  searchHistory: TSearchHistory;
  discoverFilter: {
    type: TMedia;
  } & TSoryBy &
    TGenres &
    TReleaseDateGTE &
    TReleaseDateLTE &
    TVoteAverageGTE &
    TVoteAverageLTE &
    TWithRuntimeGTE &
    TWithRuntimeLTE;
}
