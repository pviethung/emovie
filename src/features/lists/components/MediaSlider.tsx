import clsx from 'clsx';
import SwiperCore, { Autoplay, EffectCoverflow } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

import { Swiper, SwiperSlide } from 'swiper/react';
import { useGetMedia } from '../hooks/useGetMedia';

import { mediaLists } from '../mediaLists';
import { MediaList } from '../types';
import { removeNoImageMovies } from '../utils/removeNoImageMovies';
import { imageSizes, MediaCard } from './MediaCard';

type Props<T extends keyof typeof mediaLists> = MediaList<T> & {
  imageSize: keyof typeof imageSizes;
};

export const MediaSlider = <T extends keyof typeof mediaLists>({
  imageSize,
  ...resProps
}: Props<T>) => {
  const { data } = useGetMedia(resProps as any);

  const list = mediaLists[resProps.listType][resProps.listKey];
  const listTitle = list['title' as keyof typeof list] as string;

  if (data) {
    console.log(data.results);
  }
  SwiperCore.use([Autoplay]);

  return (
    <div
      className={clsx({
        'min-h-[526px]': imageSize === 'banner',
        'min-h-[372px]': imageSize === 'lg',
        'min-h-[324px]': imageSize === 'md',
        'min-h-[412px]': imageSize === 'sm',
      })}
    >
      {listTitle && (
        <h3
          className={clsx(
            { 'mb-5': imageSize === 'banner' },
            { 'lg:-mb-14': imageSize !== 'banner' },
            'font-medium lg:text-2xl lg:ml-4 dark:text-white'
          )}
        >
          {listTitle}
        </h3>
      )}
      <Swiper
        key={listTitle}
        className={clsx(
          {
            'lg:pt-20 lg:pl-16': imageSize !== 'banner',
          },
          'lg:pb-20'
        )}
        initialSlide={imageSize === 'banner' ? 1 : 0}
        slidesPerView={'auto'}
        spaceBetween={0}
        autoplay={
          imageSize === 'banner'
            ? {
                delay: 7000,
              }
            : false
        }
        effect={imageSize === 'banner' ? 'coverflow' : 'slide'}
        grabCursor={imageSize === 'banner' ? true : false}
        centeredSlides={imageSize === 'banner' ? true : false}
        coverflowEffect={
          imageSize === 'banner'
            ? {
                rotate: 20,
                stretch: 0,
                depth: 500,
                modifier: 1,
                slideShadows: false,
              }
            : undefined
        }
        modules={imageSize === 'banner' ? [EffectCoverflow] : []}
      >
        {data?.results &&
          data.results.length > 0 &&
          removeNoImageMovies(data.results).map((media: any) => (
            <SwiperSlide className={clsx('w-auto', {})} key={media.id}>
              <div className={clsx({ 'pr-4': imageSize !== 'banner' })}>
                <MediaCard key={media.id} media={media} imageSize={imageSize} />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};
