import { TMDB_IMAGE_URL } from '@/services/tmdb';
import clsx from 'clsx';
import LazyLoad from 'react-lazy-load';

export const PeopleCard = ({
  imgSrc,
  name,
  character,
}: {
  imgSrc?: string;
  name: string;
  character?: string;
}) => {
  return (
    <div className="card w-full bg-base-100 shadow-xl overflow-hidden">
      <LazyLoad className="z-10 min-h-[215px] flex items-center bg-[#ddd]">
        <figure className={clsx('h-full')}>
          <img
            className={clsx('max-w-full')}
            style={
              imgSrc
                ? undefined
                : {
                    backgroundColor: '#DDDDDD',
                  }
            }
            src={
              imgSrc
                ? `${TMDB_IMAGE_URL}w780${imgSrc}`
                : `https://dummyimage.com/205x308/dddddd/000000.jpg&text=X`
            }
            alt={name}
          />
        </figure>
      </LazyLoad>

      <div
        className={clsx('card-body p-2', {
          'h-28': character,
          'h-16': !character,
        })}
      >
        <h4 className="card-title text-base line-clamp-2">{name}</h4>
        {character ? <p className="text-sm line-clamp-2">{character}</p> : null}
      </div>
    </div>
  );
};
