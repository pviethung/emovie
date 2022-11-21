import { TvDetail } from '@/services/tmdb';
import clsx from 'clsx';
import { useState } from 'react';
import { SeasonItem } from './SeasonItem';

export const SeasonsList = ({
  seasons,
  mediaId,
}: {
  seasons: TvDetail['seasons'];
  mediaId: string;
}) => {
  const [firstLoad, setFirstLoad] = useState(true);

  return (
    <ul className={clsx('')}>
      {seasons.map((s, idx) => (
        <div key={s.id}>
          <SeasonItem
            firstLoad={firstLoad}
            onFirstLoadEnd={() => setFirstLoad(false)}
            mediaId={mediaId}
            season={s}
          />
          {idx !== seasons.length && <div className="divider m-0" />}
        </div>
      ))}
    </ul>
  );
};
