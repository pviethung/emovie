import { Movie, TMDB_IMAGE_URL, Tv } from '@/services/tmdb';
import { isMovie } from '@/utils/isMovie';
import clsx from 'clsx';
import { useState } from 'react';
import LazyLoad from 'react-lazy-load';
import { Link } from 'react-router-dom';
import { animated, useSpring } from 'react-spring';

export const imageSizes = {
  'grid-item': {
    size: 'w-full h-auto',
    width: 'w780',
    srcType: 'poster_path',
  },
  'sm': { size: 'w-44 h-[264px]', width: 'w780', srcType: 'poster_path' },
  'md': { size: 'w-64 h-44', width: 'w780', srcType: 'backdrop_path' },
  'lg': { size: 'w-96 h-56', width: 'w780', srcType: 'backdrop_path' },
  'banner': {
    size: 'w-[700px] h-[394px]',
    width: 'w1280',
    srcType: 'backdrop_path',
  },
};

export interface MediaCardProps {
  media: Movie | Tv;
  imageSize: keyof typeof imageSizes;
  lazyLoad?: boolean;
}

const trans = (x: number, y: number, s: number) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

const calc = (x: number, y: number) => {
  return [-(y / 50), x / 50, 1.1];
};

export const MediaCard = ({
  imageSize,
  media,
  lazyLoad = true,
}: MediaCardProps) => {
  const image = imageSizes[imageSize];
  const mediaIsMovie = isMovie(media);

  const title = mediaIsMovie ? media.title : media.name;
  const mediaType = mediaIsMovie ? 'movie' : 'tv';
  const releaseDate = mediaIsMovie ? media.release_date : media.first_air_date;

  const [imgLoaded, setImgLoaded] = useState(false);
  const [props, api] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 },
  }));

  const hasImge = media[image.srcType as keyof typeof media];

  return (
    <div
      className={clsx({
        'transition-transform will-change-transform hover:-translate-y-4 hover:scale-105':
          imageSize !== 'banner',
        'h-full': !hasImge,
      })}
    >
      <Link
        to={`/${mediaType}/${media.id}`}
        title={title}
        className={clsx({
          'h-full block': !hasImge,
        })}
      >
        <animated.div
          onMouseMove={(e) => {
            const { clientX: x, clientY: y } = e;
            return api.start({ xys: calc(x, y) });
          }}
          onMouseLeave={() => api.start({ xys: [0, 0, 1] })}
          style={
            imageSize !== 'banner' ? { transform: props.xys.to(trans) } : {}
          }
          className={clsx(
            { '!h-full': !hasImge },
            'group',
            'card product-card ',
            'bg-base-100 ',
            `${image.size} relative`,
            'after:absolute after:bg-gradient-to-b after:from-white/0 after:to-black/60 after:w-full after:h-full after:z-20 after:rounded-2xl',
            { 'shadow-black shadow-2xl': imageSize !== 'banner' }
          )}
        >
          <div
            className={clsx(
              'flex items-center justify-between w-full absolute z-30 text-xs text-white pt-2 px-2'
            )}
          >
            <div
              className={clsx('flex items-center gap-2', {
                'hidden': !'sm,grid-item'.includes(imageSize),
              })}
            >
              <img
                className={clsx('w-8 h-8 m-0')}
                src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
                alt="imdb"
              />
              <p>{media.vote_average.toFixed(1)}</p>
            </div>

            <div
              className={clsx(
                { 'opacity-0': 'sm,grid-item,md'.includes(imageSize) },
                'group-hover:opacity-100',
                'ml-auto'
              )}
            >
              {/* <ToggleMediaInList
                listTitle="favorites"
                onToggleSuccess={() => {}}
                mediaId={media.id}
                mediaType={mediaType}
              >
                <HeartIcon className={clsx('w-4 h-4')} />
              </ToggleMediaInList>
              <ToggleMediaInList
                listTitle="bookmarked"
                onToggleSuccess={() => {}}
                mediaId={media.id}
                mediaType={mediaType}
              >
                <BookmarkIcon className={clsx('w-4 h-4')} />
              </ToggleMediaInList> */}
            </div>
          </div>

          {lazyLoad ? (
            <LazyLoad height={'100%'} className="z-10">
              <figure className="h-full">
                <img
                  onLoad={() => {
                    setImgLoaded(true);
                  }}
                  className={clsx('object-cover h-full rounded-2xl', {
                    '!object-contain': !hasImge,
                  })}
                  src={
                    hasImge
                      ? `${TMDB_IMAGE_URL}${image.width}${
                          media[image.srcType as keyof typeof media]
                        }`
                      : `https://dummyimage.com/780x1170/dddddd/000000.jpg&text=X`
                  }
                  alt={title}
                />
              </figure>
            </LazyLoad>
          ) : (
            <div
              className="LazyLoad is-visible z-10"
              style={{ height: '100%' }}
            >
              <figure className="h-full">
                <img
                  className={clsx('object-cover h-full rounded-2xl', {
                    '!object-contain': !hasImge,
                  })}
                  src={
                    hasImge
                      ? `${TMDB_IMAGE_URL}${image.width}${
                          media[image.srcType as keyof typeof media]
                        }`
                      : `https://dummyimage.com/780x1170/dddddd/000000.jpg&text=X`
                  }
                  alt={title}
                />
              </figure>
            </div>
          )}
          {!imgLoaded && (
            <div className="absolute z-0 w-full h-full flex justify-center items-center bg-gray-300 rounded-2xl animate-pulse dark:bg-gray-700"></div>
          )}

          <div
            className={clsx(
              'absolute w-[calc(100%_-_2rem)] bottom-4 left-4 z-30',
              {
                'flex justify-between items-end': 'md,lg,banner'.includes(
                  imageSize
                ),
              },
              'prose prose-p:m-0 prose-p:text-[.75em]',
              { 'prose-xl': imageSize === 'lg' },
              { 'prose-2xl': imageSize === 'banner' }
            )}
          >
            <div
              className={clsx('block', 'text-white', {
                'm-0 max-w-[50%]': 'md,lg'.includes(imageSize),
              })}
            >
              <h4
                className={clsx('text-white', 'm-0 line-clamp-2', {
                  'opacity-0 transition-opacity group-hover:opacity-100':
                    'sm,grid-item'.includes(imageSize),
                })}
              >
                {title}
              </h4>
              <p>{!!releaseDate && new Date(releaseDate).getFullYear()}</p>
              {imageSize === 'banner' && (
                <p className="line-clamp-3 !my-2 !text-[0.65em] max-w-md">
                  {media.overview}
                </p>
              )}

              <div
                className={clsx('flex items-center gap-2', {
                  'hidden': 'sm,grid-item'.includes(imageSize),
                })}
              >
                <img
                  className={clsx('w-8 h-8 m-0')}
                  src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
                  alt="imdb"
                />
                <p>{media.vote_average.toFixed(1)} rating</p>
              </div>
            </div>
            <div
              className={clsx({
                'absolute bottom-[100px] left-1/2 -translate-x-1/2 w-max':
                  'sm,grid-item'.includes(imageSize),
              })}
            >
              <button
                className={clsx(
                  'btn btn-primary bg-primary/80 rounded-full',
                  'normal-case border-0',
                  'text-white',
                  {
                    'opacity-0 transition-opacity group-hover:opacity-100':
                      'sm,grid-item,md'.includes(imageSize),
                  },
                  { 'btn-sm': 'md, sm, grid-item'.includes(imageSize) },
                  { 'btn-lg': imageSize === 'banner' }
                )}
              >
                Watch now
              </button>
            </div>
          </div>
        </animated.div>
      </Link>
    </div>
  );
};
