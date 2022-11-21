import { Collapsible } from '@/components/Elements';
import { useAppDispatch } from '@/store/hooks';
import { formatFilterDate } from '@/utils/formatFilterDate';
import { CalendarIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSearchParams } from 'react-router-dom';
import { updateDiscoverFilter } from '../filterSlice';

export const ReleaseDate = () => {
  const [searchParams] = useSearchParams();
  const defaultStartDate = searchParams.get('release_date.gte');
  const defaultEndDate = searchParams.get('release_date.lte');

  const [fromDate, setFromDate] = useState<Date | null>(
    defaultStartDate ? new Date(defaultStartDate) : null
  );

  const [toDate, setToDate] = useState<Date | null>(
    defaultEndDate ? new Date(defaultEndDate) : null
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      updateDiscoverFilter({
        'release_date.lte': toDate ? formatFilterDate(toDate) : null,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toDate]);

  useEffect(() => {
    dispatch(
      updateDiscoverFilter({
        'release_date.gte': fromDate ? formatFilterDate(fromDate) : null,
      })
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromDate]);

  useEffect(() => {
    if (defaultStartDate === null) {
      setFromDate(null);
    }
  }, [defaultStartDate]);

  useEffect(() => {
    if (defaultEndDate === null) {
      setToDate(null);
    }
  }, [defaultEndDate]);

  return (
    <Collapsible
      header={
        <>
          <CalendarIcon className={clsx('w-5 h-5')} />
          Release Date
        </>
      }
      content={
        <div
          className={clsx(
            'app-date-select [&>div]:border-t [&>div]:border-t-base-content/20'
          )}
        >
          <div className={clsx('flex p-3 items-center')}>
            <span className={clsx('mr-auto')}>From</span>
            <DatePicker
              selected={fromDate}
              onChange={(date) => {
                setFromDate(date);
              }}
            />
          </div>
          <div className={clsx('flex p-3 items-center')}>
            <span className={clsx('mr-auto')}>To</span>
            <DatePicker
              selected={toDate}
              onChange={(date) => {
                setToDate(date);
              }}
            />
          </div>
        </div>
      }
    />
  );
};
