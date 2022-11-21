import { MediaGenreTag } from '@/components/Elements';
import { MovieDetail, TMDB_IMAGE_URL, TvDetail } from '@/services/tmdb';
import { isMovieDetail } from '@/utils/isMovieDetail';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useRef } from 'react';
import LazyLoad from 'react-lazy-load';
import { Link } from 'react-router-dom';
import { getMediaCredits } from '../api/getMediaCredits';

export const PrivateListItem = ({
  media,
}: // dbKey,
{
  media: MovieDetail | TvDetail;
}) => {
  const mediaIsMovie = isMovieDetail(media);
  const title = mediaIsMovie ? media.title : media.name;
  const releaseDate = mediaIsMovie ? media.release_date : media.first_air_date;
  const mediaType = mediaIsMovie ? 'movie' : 'tv';
  const componentRef = useRef<HTMLDivElement>(null);

  const { data: credits, isLoading } = useQuery({
    queryKey: ['credits', media.id],
    queryFn: () => getMediaCredits(media.id, mediaType),
  });

  return (
    <div
      ref={componentRef}
      className={clsx('flex bg-base-300 rounded-md p-4')}
      key={media.id}
    >
      <LazyLoad className={clsx('w-1/5 rounded-md overflow-hidden !h-max')}>
        <Link to={`/${mediaType}/${media.id}`}>
          <figure className="h-full">
            <img
              className={clsx('object-cover h-full')}
              src={`${TMDB_IMAGE_URL}w780${media.poster_path}`}
              alt={title}
            />
          </figure>
        </Link>
      </LazyLoad>
      <div className={clsx('prose prose-md ml-4 space-y-3 max-w-none w-full')}>
        <div className={clsx('flex items-center ')}>
          <h3 className={clsx('m-0 line-clamp-1 max-w-[70%]')}>
            <Link
              className={clsx('no-underline')}
              to={`/${mediaType}/${media.id}`}
            >
              {title}
            </Link>
          </h3>
          <span className={clsx('ml-4')}>{releaseDate.split('-')[0]}</span>
        </div>

        <div className={clsx('flex gap-4 flex-wrap')}>
          {media.genres.slice(0, 3).map((genre) => (
            <MediaGenreTag key={genre.id} genre={genre.name} />
          ))}
          <div className={clsx('flex items-center gap-2')}>
            <img
              className={clsx('w-8 h-8 m-0')}
              src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
              alt="imdb"
            />
            <span>{media.vote_average.toFixed(1)}/10</span>
          </div>
        </div>

        <div className={clsx('line-clamp-3 text-primary-content')}>
          {media.overview}
        </div>

        <div>
          Stars:
          <div className={clsx('flex gap-4')}>
            {isLoading && 'Loading stars'}
            {credits
              ? credits.cast.slice(0, 3).map((c) => (
                  <a href="/" className={clsx('link')} key={c.id}>
                    {c.name}
                  </a>
                ))
              : 'Unknown'}
          </div>
        </div>
      </div>
    </div>
  );
};
