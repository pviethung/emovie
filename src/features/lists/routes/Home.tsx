import { MediaTypeBar, useFilterSelector } from '@/features/filter';
import clsx from 'clsx';
import { MediaSlider } from '../components/MediaSlider';

export const Home = () => {
  const { mediaType } = useFilterSelector();
  let content: React.ReactNode = '';

  if (mediaType === 'tv') {
    content = (
      <div id="home">
        <MediaSlider<'publicList'>
          listKey="popularTv"
          listType="publicList"
          imageSize="banner"
        />
        <MediaSlider<'publicList'>
          listKey="onTheAirTv"
          listType="publicList"
          imageSize="lg"
        />
        <MediaSlider<'publicList'>
          listKey="airingTodayTv"
          listType="publicList"
          imageSize="md"
        />
        <MediaSlider<'publicList'>
          listKey="topRatedTv"
          listType="publicList"
          imageSize="sm"
        />
        <MediaSlider<'publicList'>
          listKey="mayLikeTv"
          listType="publicList"
          imageSize="sm"
        />
      </div>
    );
  } else {
    content = (
      <div id="home">
        <MediaSlider<'publicList'>
          listKey="nowPlayingMovies"
          listType="publicList"
          imageSize="banner"
        />
        <MediaSlider<'publicList'>
          listKey="popularMovies"
          listType="publicList"
          imageSize="lg"
        />
        <MediaSlider<'publicList'>
          listKey="topRatedMovies"
          listType="publicList"
          imageSize="md"
        />
        <MediaSlider<'publicList'>
          listKey="upcomingMovies"
          listType="publicList"
          imageSize="sm"
        />
        <MediaSlider<'publicList'>
          listKey="mayLikeMovies"
          listType="publicList"
          imageSize="sm"
        />
      </div>
    );
  }

  return (
    <div>
      <MediaTypeBar />

      <div className={clsx('divider mt-0 px-4')} />
      {content}
    </div>
  );
};
