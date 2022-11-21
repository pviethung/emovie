import { useInfiniteQuery } from '@tanstack/react-query';
import { getSearchResults } from '../api/getSearchResults';
import { FilterState } from '../types';

export const useSearch = (
  searchType: FilterState['searchType'],
  query: string | null
) => {
  return useInfiniteQuery({
    queryKey: [`search/${searchType}`, query],
    queryFn: ({ queryKey, pageParam = 1 }) => {
      return getSearchResults(
        queryKey[0] as string,
        queryKey[1] as string,
        pageParam
      );
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.page >= lastPage.total_pages) return undefined;
      const nextPage = lastPage.page + 1;
      return nextPage;
    },
    keepPreviousData: true,
    enabled: !!query,
  });
};
