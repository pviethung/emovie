import { TMDB_IMAGE_URL } from '@/services/tmdb';
import { StarIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import LazyLoad from 'react-lazy-load';

export const ReviewCard = ({
  author,
  imgSrc,
  rating,
  content,
  createdAt,
}: {
  author: string;
  imgSrc: string;
  rating: number;
  content: string;
  createdAt: string;
}) => {
  return (
    <div className="card bg-base-100 shadow-xl ">
      <div className="card-body flex flex-row items-start justify-start">
        <div className="avatar placeholder mr-4">
          <div className="bg-base-300 text-base-content rounded-full w-20">
            {imgSrc ? (
              <LazyLoad height={80} className="z-10">
                <figure>
                  <img
                    src={
                      imgSrc.includes('https')
                        ? '//' + imgSrc.split('://')[1]
                        : `${TMDB_IMAGE_URL}w780${imgSrc}`
                    }
                    alt={author}
                  />
                </figure>
              </LazyLoad>
            ) : null}
            {!imgSrc ? (
              <span className="text-3xl">
                {author.slice(0, 1).toLocaleUpperCase()}
              </span>
            ) : null}
          </div>
        </div>
        <div>
          <h2 className="card-title">
            <span>A review by {author}</span>
            {rating && (
              <div
                className={clsx(
                  'flex items-center gap-1 ml-4',
                  'bg-primary font-normal text-sm rounded-md py-1 px-3'
                )}
              >
                <StarIcon className={clsx('w-3 h-3')} />
                <span>{rating.toFixed(1)}</span>
              </div>
            )}
          </h2>
          <span className={clsx('text-sm text-base-content/60')}>
            Written by{' '}
            <span className={clsx('text-base-content')}>{author}</span> on{' '}
            {new Date(createdAt).toDateString()}
          </span>
          <p className={clsx('mt-5')}>{content}</p>
        </div>
      </div>
    </div>
  );
};
