import { MovieDetail, TMDB_IMAGE_URL, TvDetail } from '@/services/tmdb';
import { isMovieDetail } from '@/utils/isMovieDetail';
import clsx from 'clsx';
import { useLocation } from 'react-router-dom';
import { Trailers } from './Trailers';
import { WatchFrame } from './WatchFrame';

export const MediaSection = ({
  mediaDetail,
}: {
  mediaDetail: MovieDetail | TvDetail;
}) => {
  const { pathname } = useLocation();
  const pathArr = pathname.split('/');
  const mediaType = pathArr[1] as 'tv' | 'movie';
  const mediaId = pathArr[2];
  const watch = pathArr[3];

  let utubeTrailers: any[] = [];
  let seasons = [] as TvDetail['seasons'];

  if (mediaDetail) {
    // console.log(mediaDetail);
    const mediaIsMovie = isMovieDetail(mediaDetail);
    utubeTrailers = mediaDetail.videos.results.filter(
      (r) => r.site === 'YouTube'
    );
    seasons = !mediaIsMovie ? mediaDetail.seasons : seasons;
  }

  return (
    <div
      className={clsx(
        'background sticky w-full top-0 left-[256px]',
        'after:absolute after:w-full after:h-full after:top-0 after:l-0 after:bg-black/80'
      )}
    >
      <img
        className={clsx('object-cover', 'h-screen w-full')}
        src={`${TMDB_IMAGE_URL}original${mediaDetail.backdrop_path}`}
        alt=""
      />
      <div
        className={clsx('absolute top-1/2 -translate-y-1/2 left-0 z-10 w-full')}
      >
        {watch ? (
          <WatchFrame
            mediaId={mediaId}
            mediaType={mediaType}
            seasons={seasons}
          />
        ) : (
          <Trailers utubeTrailers={utubeTrailers} />
        )}
        {/*  */}
      </div>
    </div>
  );
};
