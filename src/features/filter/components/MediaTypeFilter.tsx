import { Collapsible } from '@/components/Elements';
import { useAppDispatch } from '@/store/hooks';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { updateDiscoverFilter } from '../filterSlice';

export const MediaTypeFilter = () => {
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get('type') as 'movie' | 'tv' | null;
  const [currentType, setCurrentType] = useState<'movie' | 'tv'>(
    typeParam ? typeParam : 'movie'
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateDiscoverFilter({ type: currentType }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentType]);

  useEffect(() => {
    setCurrentType(typeParam || 'movie');
  }, [typeParam]);

  return (
    <Collapsible
      header={<span>Type</span>}
      content={
        <div className={clsx('[&>*]:border-t [&>*]:border-t-base-content/20')}>
          <label
            key={'movie'}
            className={clsx('p-3 flex items-center space-x-2 cursor-pointer')}
          >
            <input
              onChange={() => {
                setCurrentType('movie');
              }}
              checked={currentType === 'movie'}
              value={'movie'}
              type="radio"
              className="radio radio-primary radio-xs"
              name="type"
            />
            <span>Movies (Default)</span>
          </label>
          <label
            key={'tv'}
            className={clsx('p-3 flex items-center space-x-2 cursor-pointer')}
          >
            <input
              onChange={() => {
                setCurrentType('tv');
              }}
              checked={currentType === 'tv'}
              value={'tv'}
              type="radio"
              className="radio radio-primary radio-xs"
              name="type"
            />
            <span>TV Series</span>
          </label>
        </div>
      }
    />
  );
};
