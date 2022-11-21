import { ResourceNotFound, SuspenseLoader } from '@/components/Elements';
import { MediaCard, MediaCardSkeleton } from '@/features/lists';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { getDiscoveryResults } from '../api/getDiscoveryResults';
import { FilterSidebar } from '../components/FilterSidebar';
import { Pagination } from '../components/Pagination';

export const Discovery = () => {
  let content: React.ReactNode = '';
  let pagination: React.ReactNode = '';
  const [searchParams] = useSearchParams();
  const [toggle, setToggle] = useState(false);
  const { isLoading, isFetching, isError, data } = useQuery({
    queryKey: [
      `/discover/${
        searchParams.get('type') || 'movie'
      }?${searchParams.toString()}`,
    ],
    queryFn: async ({ queryKey }) => {
      return getDiscoveryResults(queryKey[0]);
    },
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [data]);

  if (isError) {
    return <ResourceNotFound />;
  }

  if (searchParams.get('type') === null) {
    return <Navigate to={'?type=movie'} />;
  }

  if (isLoading || isFetching) {
    content = Array.from({ length: 20 }, (v, i) => {
      return <MediaCardSkeleton key={i} imageSize={'grid-item'} />;
    });
  }

  if (data && data.results.length > 0) {
    content = data.results.map((media: any) => (
      <MediaCard key={media.id} media={media} imageSize={'grid-item'} />
    ));
    pagination = (
      <div className="flex justify-center mt-10">
        <Pagination
          totalPages={data.total_pages > 500 ? 500 : data.total_pages}
        />
      </div>
    );
  }

  return (
    <div className={clsx('min-h-[1200px] pb-20')}>
      <div className={clsx('relative h-20')}>
        <button
          className={clsx(
            'btn bg-transparent border-none absolute right-6 top-5 text-base-content',
            'hover:bg-transparent'
          )}
          onClick={() => setToggle((prev) => !prev)}
        >
          <AdjustmentsHorizontalIcon
            className={clsx('w-10 h-10', {
              'fill-primary': toggle,
            })}
          />
        </button>
      </div>

      <div className={clsx('divider mt-0 px-4')} />
      {(isLoading || isFetching) && <SuspenseLoader />}

      <div id="discovery" className={clsx('px-6 flex')}>
        <div className={clsx('flex-1 pr-4')}>
          <div
            className={clsx(
              'grid gap-6 grid-cols-[repeat(auto-fill,minmax(175px,1fr))]'
            )}
          >
            {content}
          </div>

          {pagination}
        </div>
        <FilterSidebar toggle={toggle} />
      </div>
    </div>
  );
};
