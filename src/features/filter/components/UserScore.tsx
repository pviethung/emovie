import { Collapsible } from '@/components/Elements';
import { useAppDispatch } from '@/store/hooks';
import { StarIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { CSSProperties, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { updateDiscoverFilter } from '../filterSlice';

export const UserScore = () => {
  const [searchParams] = useSearchParams();
  const voteGteParam = searchParams.get('vote_average.gte');
  const voteLteParam = searchParams.get('vote_average.lte');
  const [touched, setTouched] = useState(false);
  const [showing, setShowing] = useState(false);
  const [rangeBgStyle, setRangeBgStyle] = useState<CSSProperties>({});

  const [startValue, setStartValue] = useState(
    voteGteParam ? +voteGteParam : 0
  );
  const [endValue, setEndValue] = useState(voteLteParam ? +voteLteParam : 10);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(
        updateDiscoverFilter({
          'vote_average.gte': touched
            ? startValue > 0
              ? startValue
              : null
            : null,
        })
      );
    }, 300);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startValue, touched]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(
        updateDiscoverFilter({
          'vote_average.lte': touched ? endValue : null,
        })
      );
    }, 300);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endValue, touched]);

  useEffect(() => {
    //for styling
    if (showing) {
      setRangeBgStyle((prev) => {
        return {
          ...prev,
          right: `${(((10 - endValue) * 230) as number) / 10}px`,
        };
      });
      setRangeBgStyle((prev) => {
        return {
          ...prev,
          left: `${(startValue * 230) / 10}px`,
        };
      });
    }
  }, [showing, endValue, startValue]);

  useEffect(() => {
    if (voteGteParam === null && voteLteParam === null) {
      setTouched(false);
      setEndValue(10);
      setStartValue(0);
    }
  }, [voteGteParam, voteLteParam]);

  return (
    <Collapsible
      onToggle={(isShowing) => setShowing(isShowing)}
      header={
        <>
          <StarIcon className={clsx('w-5 h-5')} />
          <span>User score</span>
        </>
      }
      content={
        <div className={clsx('p-3 border-t border-base-content/20')}>
          <p className={clsx('mb-2 flex justify-between')}>
            <span>
              From <br />
              {touched ? <>{startValue}</> : <>Unknown</>}
            </span>
            <span className={clsx('text-right')}>
              To <br />
              {touched ? <>{endValue}</> : <>Unknown</>}
            </span>
          </p>
          <div className={clsx('relative')}>
            <input
              onChange={(e) => {
                let newStartValue = +e.target.value;
                if (newStartValue > endValue - 1) {
                  newStartValue = endValue - 1;
                }
                if (!touched) setTouched(true);
                setStartValue(newStartValue);
              }}
              type="range"
              step={1}
              min={0}
              max={10}
              value={startValue}
              className={clsx('w-full')}
            />
            <input
              onChange={(e) => {
                let newEndValue = +e.target.value;
                if (newEndValue - 1 < startValue) {
                  newEndValue = startValue + 1;
                }
                if (!touched) setTouched(true);
                setEndValue(newEndValue);
              }}
              step={1}
              type="range"
              min={0}
              max={10}
              value={endValue}
              className={clsx(
                'w-full absolute !bg-transparent left-0 top-[10px]'
              )}
            />
            <div
              className={clsx(
                'absolute top-[10px] left-0 right-0 h-2 bg-primary rounded-lg'
              )}
              style={rangeBgStyle}
            ></div>
          </div>
        </div>
      }
    />
  );
};
