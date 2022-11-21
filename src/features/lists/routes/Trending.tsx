import { MediaTypeBar, useFilterSelector } from '@/features/filter';
import clsx from 'clsx';
import { InfiniteMediaGrid } from '../components/InfiniteMediaGrid';

export const Trending = () => {
  const { mediaType } = useFilterSelector();

  return (
    <div className={clsx('min-h-[1200px]')}>
      <MediaTypeBar />
      <div className={clsx('divider mt-0 px-4')} />
      <div id="discovery" className={clsx('px-6')}>
        <InfiniteMediaGrid<'publicList'>
          customTitle={`Most popular ${
            mediaType === 'movie' ? 'movies' : 'series'
          } right now`}
          listKey={mediaType === 'movie' ? 'trendingMovies' : 'trendingTv'}
          listType="publicList"
          imageSize="grid-item"
        />
      </div>
    </div>
  );
};
