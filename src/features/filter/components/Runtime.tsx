import { Collapsible } from '@/components/Elements';
import { useAppDispatch } from '@/store/hooks';
import { ClockIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { updateDiscoverFilter } from '../filterSlice';

export const Runtime = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const [showing, setShowing] = useState(false);
  const runtimeGteParam = searchParams.get('with_runtime.gte');
  const runtimeLteParam = searchParams.get('with_runtime.lte');
  const [touched, setTouched] = useState(false);

  const [startValue, setStartValue] = useState(
    runtimeGteParam ? +runtimeGteParam : 0
  );
  const [endValue, setEndValue] = useState(
    runtimeLteParam ? +runtimeLteParam : 400
  );

  const parentRef = useRef<HTMLDivElement>(null);
  const [rangeBgStyle, setRangeBgStyle] = useState<CSSProperties>({});

  useEffect(() => {
    if (runtimeGteParam || runtimeLteParam) {
      setTouched(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (runtimeGteParam === null && runtimeLteParam === null) {
      setTouched(false);
      setEndValue(400);
      setStartValue(0);
    }
  }, [runtimeGteParam, runtimeLteParam]);

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      dispatch(
        updateDiscoverFilter({
          'with_runtime.gte': touched
            ? startValue > 0
              ? startValue
              : null
            : null,
        })
      );
    }, 300);

    return () => clearTimeout(timeoutID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startValue, touched]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(
        updateDiscoverFilter({
          'with_runtime.lte': touched ? endValue : null,
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
          right: `${(((400 - endValue) * 230) as number) / 400}px`,
        };
      });
      setRangeBgStyle((prev) => {
        return {
          ...prev,
          left: `${(startValue * 230) / 400}px`,
        };
      });
    }
  }, [showing, endValue, startValue]);

  return (
    <Collapsible
      onToggle={(isShowing) => setShowing(isShowing)}
      header={
        <>
          <ClockIcon className={clsx('w-5 h-5')} />
          <span>Runtime</span>
        </>
      }
      content={
        <div className={clsx('p-3 border-t border-base-content/20')}>
          <p className={clsx('mb-2 flex justify-between')}>
            <span>
              From <br />
              {touched ? <>{startValue} minutes</> : <>Unknown</>}
            </span>
            <span className={clsx('text-right')}>
              To <br />
              {touched ? <>{endValue} minutes</> : <>Unknown</>}
            </span>
          </p>
          <div ref={parentRef} className={clsx('relative')}>
            <input
              onChange={(e) => {
                let newStartValue = +e.target.value;
                if (newStartValue > endValue - 10) {
                  newStartValue = endValue - 10;
                }
                if (!touched) setTouched(true);
                setStartValue(newStartValue);
              }}
              type="range"
              step={5}
              min={0}
              max={400}
              value={startValue}
              className={clsx('w-full')}
            />
            <input
              onChange={(e) => {
                let newEndValue = +e.target.value;
                if (newEndValue - 10 < startValue) {
                  newEndValue = startValue + 10;
                }
                if (!touched) setTouched(true);
                setEndValue(newEndValue);
              }}
              step={5}
              type="range"
              min={0}
              max={400}
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
