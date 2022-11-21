import { SuspenseLoader } from '@/components/Elements';
import clsx from 'clsx';
import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useGetMediaInfinite } from '../hooks/useGetMediaInfinite';

import { mediaLists } from '../mediaLists';
import { GetMediaListResponse, MediaList } from '../types';
import { removeNoImageMovies } from '../utils/removeNoImageMovies';
import { imageSizes, MediaCard } from './MediaCard';
import { MediaCardSkeleton } from './MediaCardSkeleton';

type Props<T extends keyof typeof mediaLists> = MediaList<T> & {
  imageSize: keyof typeof imageSizes;
  customTitle?: string;
};

export const InfiniteMediaGrid = <T extends keyof typeof mediaLists>({
  customTitle,
  imageSize,
  ...resProps
}: Props<T>) => {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useGetMediaInfinite(resProps as any);

  const list = mediaLists[resProps.listType][resProps.listKey];
  const listTitle = list['title' as keyof typeof list] as string;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <>
      {listTitle && (
        <h3
          className={clsx('font-medium', 'lg:text-2xl mb-8', 'dark:text-white')}
        >
          {customTitle || listTitle}
        </h3>
      )}

      {data ? (
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
          {data.pages.map((page: GetMediaListResponse) => {
            return (
              page.results.length > 0 &&
              removeNoImageMovies(page.results).map((media: any) => (
                <MediaCard key={media.id} media={media} imageSize={imageSize} />
              ))
            );
          })}

          {isFetchingNextPage &&
            Array.from({ length: 20 }, (v, i) => {
              return <MediaCardSkeleton key={i} imageSize={'grid-item'} />;
            })}
        </InfiniteScroll>
      ) : null}
    </>
  );
};
