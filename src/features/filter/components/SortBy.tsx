import { Collapsible } from '@/components/Elements';
import { useAppDispatch } from '@/store/hooks';
import { Bars3BottomLeftIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { updateDiscoverFilter } from '../filterSlice';
import { TSoryBy } from '../types';

const SORT_BY = [
  { title: 'Popularity Descending', value: 'popularity.desc' },
  {
    title: 'Popularity Ascending',
    value: 'popularity.asc',
  },
  {
    title: 'Rating Descending',
    value: 'vote_average.desc',
  },
  {
    title: 'Rating Ascending',
    value: 'vote_average.asc',
  },

  {
    title: 'Release Date Descending',
    value: 'primary_release_date.desc',
  },
  {
    title: 'Release Date Ascending',
    value: 'primary_release_date.asc',
  },
  {
    title: 'Title A-Z',
    value: 'title.asc',
  },
  {
    title: 'Title Z-A',
    value: 'title.desc',
  },
] as const;

export const SortBy = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const sortByParam = searchParams.get('sort_by') as TSoryBy['sort_by'];
  const [currentChecked, setCurrentChecked] = useState(sortByParam);

  const handleChangeSort = (value: TSoryBy['sort_by']) => {
    return (e: React.ChangeEvent) => {
      setCurrentChecked(value);
    };
  };

  useEffect(() => {
    dispatch(updateDiscoverFilter({ sort_by: currentChecked }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChecked]);

  useEffect(() => {
    if (sortByParam === null) setCurrentChecked(null);
  }, [sortByParam]);

  return (
    <Collapsible
      content={
        <div className={clsx('[&>*]:border-t [&>*]:border-base-content/20')}>
          {SORT_BY.map((sort) => (
            <label
              key={sort.value}
              className={clsx('p-3 flex items-center space-x-2 cursor-pointer')}
            >
              <input
                checked={currentChecked === sort.value}
                onChange={handleChangeSort(sort.value)}
                value={sort.value}
                type="radio"
                className="radio radio-primary radio-xs"
                name="sort-by"
              />
              <span>{sort.title}</span>
            </label>
          ))}
        </div>
      }
      header={
        <>
          <Bars3BottomLeftIcon className={clsx('w-5 h-5')} />
          <span>Sort by</span>
        </>
      }
    />
  );
};
