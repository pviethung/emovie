import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { useRef } from 'react';
import LazyLoad from 'react-lazy-load';
import { Navigation, Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

export const Trailers = ({ utubeTrailers }: { utubeTrailers: any[] }) => {
  const swiperRef = useRef<SwiperType>();

  return (
    <div className="trailers">
      <div className={clsx('mb-8 pl-4')}>
        <h3 className={clsx('font-bold text-xl text-white')}>Videos</h3>
        {utubeTrailers.length > 1 && (
          <div className={clsx('space-x-2 mt-2')}>
            <button
              className={clsx('btn btn-sm btn-primary text-white')}
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <ChevronLeftIcon className={clsx('w-6 h-6')} />
            </button>
            <button
              className={clsx('btn btn-sm btn-primary text-white')}
              onClick={() => swiperRef.current?.slideNext()}
            >
              <ChevronRightIcon className={clsx('w-6 h-6')} />
            </button>
          </div>
        )}
      </div>
      <div className={clsx('relative w-full')}>
        {utubeTrailers.length > 0 ? (
          <Swiper
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            draggable={false}
            centeredSlides={true}
            navigation={true}
            modules={[Navigation]}
            slidesPerView={1.5}
            spaceBetween={0}
            className={clsx('media-detail-trailers')}
          >
            {utubeTrailers.map((v, i) => (
              <SwiperSlide
                className={clsx('transition-transform duration-1000')}
                key={v.key}
              >
                <div className={clsx('pt-[56.25%]')}>
                  <LazyLoad>
                    <iframe
                      className={clsx('w-full h-full absolute top-0 left-0')}
                      src={`https://www.youtube.com/embed/${
                        v.key || 'uAop-vMrggI'
                      }`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </LazyLoad>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className={clsx('w-[780px] mx-auto')}>
            <div
              className={clsx(
                'pt-[56.25%] bg-[#282828] font-bold text-4xl relative'
              )}
            >
              <div
                className={clsx(
                  'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-[#ddd]'
                )}
              >
                <svg
                  className={clsx('w-24 h-24 mr-4')}
                  fill="#fff"
                  viewBox="0 0 48 48"
                >
                  <path d="M0 0h48v48H0V0z" fill="none"></path>
                  <path
                    d="M22 30h4v4h-4zm0-16h4v12h-4zm1.99-10C12.94 4 4 12.95 4 24s8.94 20 19.99 20S44 35.05 44 24 35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z"
                    fillOpacity="0.7"
                  ></path>
                </svg>
                <span>No videos found</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
