import { PeopleCard, SuspenseLoader } from '@/components/Elements';
import { MediaCard, MediaCardSkeleton } from '@/features/lists';
import { useToast } from '@/hooks/useToast';
import { Movie, Tv } from '@/services/tmdb';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSearchParams } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';
import { useSearch } from '../hooks/useSeach';
import { FilterState } from '../types';

const navigation: {
  name: string;
  type: FilterState['searchType'];
}[] = [
  { name: 'All', type: 'multi' },
  { name: 'Movie', type: 'movie' },
  { name: 'TV series', type: 'tv' },
  { name: 'People', type: 'person' },
];

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [disabled, setDisabled] = useState(false);
  const searchQuery = searchParams.get('query');
  const { alertToast } = useToast();
  const [content, setContent] = useState<React.ReactNode>('');

  const searchType =
    (searchParams.get('type') as FilterState['searchType']) || 'multi';

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useSearch(searchType, searchQuery);

  useEffect(() => {
    if (!searchQuery) {
      setDisabled(true);
      return;
    }
    setDisabled(false);
  }, [searchQuery]);

  useEffect(() => {
    let content: React.ReactNode = '';
    if (data && data?.pages[0].total_results > 0) {
      if (searchType === 'movie') {
        const moviePages = data.pages as any[];
        content = moviePages.map((page) => {
          return page.results.map((m: Movie) => (
            <motion.div layout key={'movie' + m.id}>
              <MediaCard lazyLoad={false} media={m} imageSize={'grid-item'} />
            </motion.div>
          ));
        });
      }
      if (searchType === 'tv') {
        const tvPages = data.pages as any[];
        content = tvPages.map((page) => {
          return page.results.map((t: Tv) => (
            <motion.div layout key={'tv' + t.id}>
              <MediaCard lazyLoad={false} media={t} imageSize={'grid-item'} />
            </motion.div>
          ));
        });
      }

      if (searchType === 'person') {
        const peoplePages = data.pages as any[];
        content = peoplePages.map((page) => {
          return page.results.map((p: any) => (
            <motion.div layout key={'person' + p.id}>
              <PeopleCard key={p.id} name={p.name} imgSrc={p.profile_path} />
            </motion.div>
          ));
        });
      }
      if (searchType === 'multi') {
        const resultPages = data.pages as any[];
        content = resultPages.map((page) => {
          return page.results.reduce((jsx: React.ReactNode[], r: any) => {
            if (r.media_type === 'tv') {
              const tv = r as Tv;

              jsx.push(
                <motion.div layout key={'tv' + tv.id}>
                  <MediaCard
                    lazyLoad={false}
                    media={tv}
                    imageSize={'grid-item'}
                  />
                </motion.div>
              );
            }
            if (r.media_type === 'person') {
              const people = r as {
                id: string;
                name: string;
                profile_path: string;
              };
              jsx.push(
                <motion.div layout key={'person' + people.id}>
                  <PeopleCard name={people.name} imgSrc={people.profile_path} />
                </motion.div>
              );
            }
            if (r.media_type === 'movie') {
              const movie = r as Movie;

              jsx.push(
                <motion.div layout key={'movie' + r.id}>
                  <MediaCard
                    lazyLoad={false}
                    key={movie.id}
                    media={movie}
                    imageSize={'grid-item'}
                  />
                </motion.div>
              );
            }
            return jsx;
          }, []);
        });
      }
      setContent(content);
    } else {
      setContent('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className={clsx('min-h-[1200px] pb-20')}>
      <div className={clsx('relative z-50')}>
        <ul className={clsx('p-4 menu flex-row')}>
          {navigation.map((item, idx) => (
            <li key={idx}>
              <button
                onClick={() => {
                  if (disabled) {
                    alertToast('Please fill out search field');
                    return;
                  }

                  searchParams.set('query', searchQuery as string);
                  if (item.type === 'multi') {
                    searchParams.delete('type');
                  } else {
                    searchParams.set('type', item.type);
                  }

                  setSearchParams(searchParams);
                }}
                className={clsx(
                  {
                    'pointer-events-none': item.type === searchType,
                    'relative bg-transparent active':
                      searchType === item.type && !disabled,
                  },
                  {
                    'after:content-[""] after:absolute after:h-1 after:w-[calc(100%_-_32px)] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:bg-primary':
                      searchType === item.type && !disabled,
                  }
                )}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
        <div
          className={clsx(
            'w-96',
            'absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2'
          )}
        >
          <SearchBar
            onSearch={(query) => {
              if (query.trim() === '') return;
              searchParams.set('query', query);
              setSearchParams(searchParams);
            }}
            initialValue={searchQuery ? searchQuery : undefined}
            currentSeachType={searchType}
            handleToggleSidebar={() => {}}
            toggle={false}
          />
        </div>
      </div>

      <div className={clsx('divider mt-0 px-4')} />

      <div id="discovery" className={clsx('px-6')}>
        {!isFetching && (
          <>
            <h3
              className={clsx(
                'font-medium',
                'lg:text-2xl mb-8',
                'dark:text-white'
              )}
            >
              {content !== '' ? (
                <>{`Search results for "${searchParams.get('query')}" (${
                  data?.pages[0].total_results
                })`}</>
              ) : (
                <>Nothing was found :(</>
              )}
            </h3>
          </>
        )}

        {data && (
          <InfiniteScroll
            scrollThreshold={1}
            className={clsx(
              'grid gap-6 grid-cols-[repeat(auto-fill,minmax(175px,1fr))]'
            )}
            style={{
              overflow: 'unset',
            }}
            dataLength={data.pages.length} //This is important field to render the next data
            next={fetchNextPage}
            hasMore={!!hasNextPage}
            loader={<SuspenseLoader />}
          >
            <AnimatePresence>{content}</AnimatePresence>
            {isFetchingNextPage &&
              Array.from({ length: 20 }, (v, i) => {
                return <MediaCardSkeleton key={i} imageSize={'grid-item'} />;
              })}
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};
