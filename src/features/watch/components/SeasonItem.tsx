import { TMDB_IMAGE_URL, TvDetail } from '@/services/tmdb';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useLayoutEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useSeasonDetailQuery } from '../hooks/useSeasonDetailQuery';

export const SeasonItem = ({
  season,
  mediaId,
  firstLoad,
  onFirstLoadEnd,
}: {
  mediaId: string;
  season: TvDetail['seasons'][number];
  firstLoad: boolean;
  onFirstLoadEnd: () => void;
}) => {
  const [search] = useSearchParams();
  const currentSeason = search.get('season') || '1';
  const currentEpisode = search.get('episode') || '1';
  // const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const { data, isLoading, isError } = useSeasonDetailQuery(
    mediaId,
    season.season_number
  );
  let content: React.ReactNode = '';

  useLayoutEffect(() => {
    if (+currentSeason !== season.season_number || !firstLoad) return;

    console.log('effect 1 run');
    setTimeout(() => {
      setShow(true);
    }, 250);
  }, [currentSeason, season.season_number, firstLoad]);

  useLayoutEffect(() => {
    if (!show || !firstLoad) return;

    onFirstLoadEnd();
    console.log('effect run');

    const scrollableParent = document.querySelector('.seasons-wrap');
    const episodeElement = document.querySelector(
      `.episode-wrap[data-episode="${currentEpisode}"]`
    ) as HTMLAnchorElement | null;

    if (!scrollableParent || !episodeElement) return;

    const offsetHeight = episodeElement.offsetTop;
    setTimeout(() => {
      scrollableParent.scrollTo({
        top: offsetHeight,
        behavior: 'smooth',
      });
    }, 250);
  }, [show, currentEpisode, firstLoad, onFirstLoadEnd]);

  if (isLoading) {
  }
  if (isError) {
  }

  if (data) {
    // console.log(data);

    content = data.episodes.map((e) => (
      <Link
        replace
        data-episode={e.episode_number}
        to={`?season=${season.season_number}&episode=${e.episode_number}`}
        key={e.id}
        className={clsx(
          'relative flex bg-base-100 p-2 rounded-md episode-wrap transition-all',
          'hover:bg-base-300'
        )}
      >
        <img
          className={clsx('w-20 h-20 object-cover mr-2 rounded-md')}
          src={
            e.still_path
              ? `${TMDB_IMAGE_URL}w300${e.still_path}`
              : `https://ui-avatars.com/api/?size=64&name=x`
          }
          alt={e.name}
        />
        <div className={'flex-1'}>
          <h4
            className={clsx('line-clamp-2 font-semibold mb-2', {
              'text-primary':
                e.episode_number === +currentEpisode &&
                season.season_number === +currentSeason,
            })}
          >
            {e.name}
          </h4>
          <span
            className={clsx('text-sm')}
          >{`S${season.season_number}E${e.episode_number}`}</span>
        </div>
        {e.episode_number === +currentEpisode &&
          season.season_number === +currentSeason && (
            <span className="absolute top-1 left-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
          )}
      </Link>
    ));
  }

  return (
    <li
      data-season={season.season_number}
      className={clsx(
        'bg-base-300 rounded-md w-full overflow-hidden cursor-pointer'
      )}
    >
      <div
        key={season.id + 'button'}
        onClick={() => {
          setShow((prv) => !prv);
        }}
        className={clsx(
          ' w-full transition-all cursor-pointer text-center select-none',
          'hover:bg-base-content/10',
          'relative',
          'font-semibold',
          'text-lg',

          { 'bg-base-content/10': show }
        )}
      >
        {season.name}
        <br />
        <span
          className={clsx('text-base font-normal')}
        >{`${season.episode_count} eps`}</span>
        <svg
          className={clsx(
            'absolute top-1/2 -translate-y-1/2 left-2 transition-all',
            { 'text-primary': season.season_number === +currentSeason },
            {
              'rotate-0': !show,
              '-rotate-90': show,
            }
          )}
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 16 16"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"></path>
        </svg>
      </div>

      <AnimatePresence>
        {show && (
          <motion.div
            key={season.id + 'div'}
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
          >
            <div className={clsx('bg-base-100 space-y-2 p-2')}>{content}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};
