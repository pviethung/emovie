import { Collapsible, Scrollable } from '@/components/Elements';
import { TagIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { updateDiscoverFilter, useFilterSelector } from '../filterSlice';

const MOVIE_GENRES = [
  {
    'id': 28,
    'name': 'Action',
  },
  {
    'id': 12,
    'name': 'Adventure',
  },
  {
    'id': 16,
    'name': 'Animation',
  },
  {
    'id': 35,
    'name': 'Comedy',
  },
  {
    'id': 80,
    'name': 'Crime',
  },
  {
    'id': 99,
    'name': 'Documentary',
  },
  {
    'id': 18,
    'name': 'Drama',
  },
  {
    'id': 10751,
    'name': 'Family',
  },
  {
    'id': 14,
    'name': 'Fantasy',
  },
  {
    'id': 36,
    'name': 'History',
  },
  {
    'id': 27,
    'name': 'Horror',
  },
  {
    'id': 10402,
    'name': 'Music',
  },
  {
    'id': 9648,
    'name': 'Mystery',
  },
  {
    'id': 10749,
    'name': 'Romance',
  },
  {
    'id': 878,
    'name': 'Science Fiction',
  },
  {
    'id': 10770,
    'name': 'TV Movie',
  },
  {
    'id': 53,
    'name': 'Thriller',
  },
  {
    'id': 10752,
    'name': 'War',
  },
  {
    'id': 37,
    'name': 'Western',
  },
];
const TV_GENRES = [
  {
    'id': 10759,
    'name': 'Action & Adventure',
  },
  {
    'id': 16,
    'name': 'Animation',
  },
  {
    'id': 35,
    'name': 'Comedy',
  },
  {
    'id': 80,
    'name': 'Crime',
  },
  {
    'id': 99,
    'name': 'Documentary',
  },
  {
    'id': 18,
    'name': 'Drama',
  },
  {
    'id': 10751,
    'name': 'Family',
  },
  {
    'id': 10762,
    'name': 'Kids',
  },
  {
    'id': 9648,
    'name': 'Mystery',
  },
  {
    'id': 10763,
    'name': 'News',
  },
  {
    'id': 10764,
    'name': 'Reality',
  },
  {
    'id': 10765,
    'name': 'Sci-Fi & Fantasy',
  },
  {
    'id': 10766,
    'name': 'Soap',
  },
  {
    'id': 10767,
    'name': 'Talk',
  },
  {
    'id': 10768,
    'name': 'War & Politics',
  },
  {
    'id': 37,
    'name': 'Western',
  },
];

export const Genres = () => {
  const [searchParams] = useSearchParams();
  const {
    discoverFilter: { type },
  } = useFilterSelector();
  const genreParam = searchParams.get('with_genres');
  const typeParam = searchParams.get('type');
  const genres = type === 'tv' ? TV_GENRES : MOVIE_GENRES;
  const [checkedGenres, setCheckedGenres] = useState<number[]>(
    genreParam ? genreParam.split(',').map((g) => +g) : []
  );
  const dispatch = useDispatch();
  const hasInitialType = useRef(false);

  useEffect(() => {
    // This effect run on mount, dont want to reset 'checkedGenres' because of that
    // so skip the first run with 'hasInitialType' guard
    if (!hasInitialType.current) {
      // i dont know
      if (typeParam === 'movie') {
        hasInitialType.current = true;
      } else {
        // i dont know
        if (type === 'tv') {
          hasInitialType.current = true;
        }
      }
      return;
    }

    setCheckedGenres([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  useEffect(() => {
    if (checkedGenres.length > 0)
      dispatch(updateDiscoverFilter({ with_genres: checkedGenres.join(',') }));
    else dispatch(updateDiscoverFilter({ with_genres: null }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedGenres]);

  useEffect(() => {
    if (!genreParam) {
      setCheckedGenres([]);
    }
  }, [genreParam]);

  return (
    <Collapsible
      content={
        <Scrollable
          className={clsx(
            'h-80 overflow-y-auto [&>*]:border-t [&>*]:border-base-content/20'
          )}
        >
          {genres.sort().map((genre, idx) => (
            <label
              key={genre.id}
              className={clsx('p-3 flex items-center space-x-2 cursor-pointer')}
            >
              <input
                checked={checkedGenres.includes(genre.id)}
                type="checkbox"
                className="checkbox checkbox-primary checkbox-xs"
                onChange={(e) => {
                  let newCheckedGenres = [...checkedGenres];
                  if (e.target.checked) newCheckedGenres.push(genre.id);
                  else
                    newCheckedGenres = newCheckedGenres.filter(
                      (g) => g !== genre.id
                    );

                  setCheckedGenres(newCheckedGenres);
                }}
              />
              <span>{genre.name}</span>
            </label>
          ))}
        </Scrollable>
      }
      header={
        <>
          <TagIcon className={clsx('w-5 h-5')} />
          <span>Genres</span>
        </>
      }
    />
  );
};
