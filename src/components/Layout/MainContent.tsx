import clsx from 'clsx';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import 'swiper/css';
import { SuspenseLoader } from '../Elements';

export const MainContent = ({
  sideBarCollapsed,
}: {
  sideBarCollapsed: boolean;
}) => {
  return (
    <div
      className={clsx('w-full transition-all', {
        'lg:w-[calc(100%_-_255px)]': !sideBarCollapsed,
        'lg:w-[calc(100%_-_88px)]': sideBarCollapsed,
      })}
    >
      <div>
        <Suspense fallback={<SuspenseLoader />}>
          <Outlet />
        </Suspense>
      </div>
      {/* <RightSidebar /> */}
    </div>
  );
};
