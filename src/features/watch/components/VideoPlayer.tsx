import clsx from 'clsx';
import { forwardRef, useLayoutEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const VideoPlayer = forwardRef<
  HTMLDivElement,
  {
    mediaType: 'tv' | 'movie';
    mediaId: string;
  }
>(({ mediaId, mediaType }, ref) => {
  const [search] = useSearchParams();
  const currentSeason = search.get('season') || '1';
  const currentEpisode = search.get('episode') || '1';
  let loader: React.ReactNode = '';
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    setLoading(true);
  }, [currentEpisode, currentSeason]);

  if (loading) {
    loader = (
      <div className={clsx('absolute top-0 left-0 w-full h-full')}>
        <div
          role="status"
          className="flex justify-center items-center w-full h-full bg-gray-300 animate-pulse dark:bg-gray-700"
        >
          <svg
            className="w-12 h-12 text-gray-200 dark:text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 384 512"
          >
            <path d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={clsx('relative w-full')} ref={ref}>
      <div className={clsx('pt-[56.25%] relative')}>
        <iframe
          onLoad={() => setLoading(false)}
          key={`type=${mediaType}&id=${mediaId}&s=${currentSeason}&e=${currentEpisode}`}
          className={clsx('absolute w-full h-full top-0 left-0')}
          src={`https://www.2embed.to/embed/tmdb/${mediaType}?id=${mediaId}${
            mediaType === 'tv' ? `&s=${currentSeason}&e=${currentEpisode}` : ''
          }`}
          title="31213"
          frameBorder="0"
          allowFullScreen
        ></iframe>
        {loader}
        {/* <iframe
          className={clsx('w-full h-full absolute top-0 left-0')}
          src={`https://www.youtube.com/embed/${'uAop-vMrggI'}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe> */}
      </div>
    </div>
  );
});
