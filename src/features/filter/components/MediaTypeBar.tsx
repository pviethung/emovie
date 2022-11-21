import { useAppDispatch } from '@/store/hooks';
import clsx from 'clsx';
import { useState } from 'react';
import { changeMediaType, useFilterSelector } from '../filterSlice';
import { FilterState } from '../types';

const navigation: {
  name: string;
  type: FilterState['mediaType'];
}[] = [
  { name: 'Movies', type: 'movie' },
  { name: 'TV Series', type: 'tv' },
];

export const MediaTypeBar = ({
  defaultType,
}: {
  defaultType?: 'movie' | 'tv';
}) => {
  const { mediaType } = useFilterSelector();
  const [currentMediaType, setCurrentMediaType] = useState<
    FilterState['mediaType']
  >(defaultType ? defaultType : mediaType || 'movie');
  const dipatch = useAppDispatch();

  const handleChangeMediaType = (mediaType: FilterState['mediaType']) => {
    return () => {
      setCurrentMediaType(mediaType);
      dipatch(changeMediaType(mediaType));
    };
  };

  return (
    <ul className={clsx('p-4 menu flex-row')}>
      {navigation.map((item, idx) => (
        <li key={idx}>
          <button
            onClick={handleChangeMediaType(item.type)}
            className={clsx(
              {
                'relative bg-transparent active':
                  currentMediaType === item.type,
              },
              {
                'after:content-[""] after:absolute after:h-1 after:w-[calc(100%_-_32px)] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:bg-primary':
                  currentMediaType === item.type,
              }
            )}
          >
            {item.name}
          </button>
        </li>
      ))}
    </ul>
  );
};
