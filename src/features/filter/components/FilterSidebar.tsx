import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { createSearchParams, useSearchParams } from 'react-router-dom';
import { useFilterSelector } from '../filterSlice';
import { Genres } from './Genres';
import { MediaTypeFilter } from './MediaTypeFilter';
import { ReleaseDate } from './ReleaseDate';
import { Runtime } from './Runtime';
import { SortBy } from './SortBy';
import { UserScore } from './UserScore';

export const FilterSidebar = ({ toggle }: { toggle: boolean }) => {
  const { discoverFilter } = useFilterSelector();
  const [searchParams, setSearchParams] = useSearchParams();
  const [clearFilter, setClearFilter] = useState(false);
  const [applyFilter, setApplyFilter] = useState(true);

  const handleFilter = () => {
    let filterParams: Record<string, any> = {};
    for (const key in discoverFilter) {
      let k = key as keyof typeof discoverFilter;
      if (discoverFilter[k] !== null) {
        filterParams[k] = discoverFilter[k];
      }
    }

    setClearFilter(true);
    setSearchParams(createSearchParams({ ...filterParams }));
  };

  useEffect(() => {
    let initialParams: Record<string, any> = {};
    for (const [key, value] of searchParams) {
      if (key !== 'page') initialParams[key] = value;
    }
    if (JSON.stringify(initialParams) !== '{"type":"movie"}') {
      setClearFilter(true);
    } else {
      setClearFilter(false);
    }
  }, [searchParams]);

  useEffect(() => {
    let currentParams: Record<string, any> = {};
    for (const k in discoverFilter) {
      const key = k as keyof typeof discoverFilter;
      if (discoverFilter[key] !== null) {
        currentParams[key] = discoverFilter[key];
      }
    }
    if (JSON.stringify(currentParams) === '{"type":"movie"}') {
      if (!clearFilter) setApplyFilter(false);
    } else {
      setApplyFilter(true);
    }
  }, [discoverFilter, clearFilter]);

  return (
    <div
      className={clsx('w-64 transition-all', {
        '[&>*]:border-0 [&>*]:opacity-0': !toggle,
        'w-64': toggle,
        'w-0': !toggle,
      })}
    >
      <div
        className={clsx('self-start sticky top-0 overflow-hidden space-y-1')}
      >
        <button
          onClick={() => {
            // dispatch(clearDiscoverFilter());
            setSearchParams(createSearchParams({ type: 'movie' }));
            setClearFilter(false);
          }}
          className={clsx('font-bold text-red-500 text-right w-full !mb-2', {
            'opacity-100 visible': clearFilter,
            'opacity-0 invisible': !clearFilter,
          })}
        >
          Clear changes
        </button>
        <MediaTypeFilter />
        <SortBy />
        <ReleaseDate />
        <Genres />
        <Runtime />
        <UserScore />
        <button
          onClick={handleFilter}
          className={clsx('btn btn-primary btn-block', {
            'btn-disabled': !applyFilter,
          })}
        >
          Apply filter
        </button>
      </div>
    </div>
  );
};
