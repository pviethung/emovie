// import { Bars3Icon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { useState } from 'react';
import { LeftSidebar } from './LeftSidebar';
import { MainContent } from './MainContent';

export const Layout = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className={clsx('flex')}>
      <LeftSidebar
        toggle={toggle}
        onToggle={() => setToggle((prev) => !prev)}
      />
      <MainContent sideBarCollapsed={toggle} />
    </div>
  );
};
