import { SearchBar } from '@/features/filter';
import clsx from 'clsx';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { animated, useSpring } from 'react-spring';

export const RightSidebar = () => {
  const [show, setShow] = useState(true);
  const location = useLocation();
  console.log(location);

  const props = useSpring({
    x: show ? 0 : 200,
  });

  return (
    <>
      <animated.div
        style={props}
        className={clsx(
          'bg-base-300',
          'lg:w-64 lg:h-screen lg:fixed lg:top-0 lg:right-0'
        )}
      >
        <SearchBar />
      </animated.div>
    </>
  );
};
