import { MediaCard } from '@/features/lists';
import { MovieDetail, TvDetail } from '@/services/tmdb';
import { isMovieDetail } from '@/utils/isMovieDetail';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

const getMovieCards = <T extends MovieDetail | TvDetail>(movieDetail: T) => {
  let _5rcm: T['recommendations']['results'][number][] = [];
  let _5sml: T['similar']['results'][number][] = [];
  let recommendations: React.ReactNode = '';
  let similar: React.ReactNode = '';

  movieDetail.recommendations.results.some((m) => {
    if (!m.backdrop_path || !m.poster_path) return false;
    _5rcm.push(m);
    if (_5rcm.length === 5) return true;
    return false;
  });

  movieDetail.similar.results.some((m) => {
    if (!m.backdrop_path || !m.poster_path) return false;
    _5sml.push(m);
    if (_5sml.length === 5) return true;
    return false;
  });

  recommendations = _5rcm.map((rcmMovie) => {
    return (
      <MediaCard key={rcmMovie.id} media={rcmMovie} imageSize={'grid-item'} />
    );
  });
  similar = _5sml.map((smlMovie) => {
    return (
      <MediaCard key={smlMovie.id} media={smlMovie} imageSize={'grid-item'} />
    );
  });

  return [recommendations, similar];
};

export const MediaSuggestion = ({
  mediaDetail,
}: {
  mediaDetail: MovieDetail | TvDetail;
}) => {
  let recommendations: React.ReactNode = '';
  let similar: React.ReactNode = '';

  if (isMovieDetail(mediaDetail)) {
    [recommendations, similar] = getMovieCards<MovieDetail>(mediaDetail);
  } else {
    [recommendations, similar] = getMovieCards<TvDetail>(mediaDetail);
  }

  return (
    <>
      {mediaDetail.recommendations.results.length > 0 && (
        <div>
          <h3 className={clsx('font-bold text-xl mb-4')}>Recommendations: </h3>
          <div
            className={clsx(
              'grid gap-6 grid-cols-[repeat(auto-fill,minmax(165px,1fr))]'
            )}
          >
            {recommendations}
            <Link to={'../recommendations'}>
              <div
                role="status"
                className="flex justify-center items-center w-full h-full bg-gray-300 rounded-2xl  dark:bg-gray-700"
              >
                <svg
                  className="w-12 h-12"
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                </svg>
              </div>
            </Link>
          </div>
        </div>
      )}
      <div className="divider"></div>
      {mediaDetail.similar.results.length > 0 && (
        <div>
          <h3 className={clsx('font-bold text-xl mb-4')}>Similar: </h3>
          <div
            className={clsx(
              'grid gap-6 grid-cols-[repeat(auto-fill,minmax(165px,1fr))]'
            )}
          >
            {similar}
            <Link to={'../similar'}>
              <div
                role="status"
                className="flex justify-center items-center w-full h-full bg-gray-300 rounded-2xl  dark:bg-gray-700"
              >
                <svg
                  className="w-12 h-12"
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                </svg>
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
