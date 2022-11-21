import { Scrollable } from '@/components/Elements';
import { TvDetail } from '@/services/tmdb';
import clsx from 'clsx';
import { useLayoutEffect, useRef, useState } from 'react';
import { SeasonsList } from './SeasonList';
import { VideoPlayer } from './VideoPlayer';

export const WatchFrame = ({
  seasons,
  mediaId,
  mediaType,
}: {
  seasons: TvDetail['seasons'];
  mediaType: 'movie' | 'tv';
  mediaId: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState({});

  useLayoutEffect(() => {
    setHeight({
      height: ref.current?.clientHeight
        ? ref.current.clientHeight + 'px'
        : 'auto',
    });
  }, []);

  return (
    <div
      className={clsx('mx-auto flex justify-center items-start', {
        'w-4/5': mediaType === 'movie',
        'w-11/12': mediaType === 'tv',
      })}
    >
      <VideoPlayer ref={ref} mediaId={mediaId} mediaType={mediaType} />
      {mediaType === 'tv' && (
        <div style={height}>
          <Scrollable
            className={clsx(
              'seasons-wrap',
              'w-72 h-full ml-4 p-2 bg-base-300 rounded-md overflow-y-auto'
            )}
          >
            <SeasonsList mediaId={mediaId} seasons={seasons} />
          </Scrollable>
        </div>
      )}
    </div>
  );
};
