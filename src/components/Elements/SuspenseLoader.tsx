import { useThemeSelector } from '@/features/theme';
import { useEffect } from 'react';
//@ts-ignore
import nprogress from 'nprogress';

export const SuspenseLoader = () => {
  const { mode } = useThemeSelector();

  useEffect(() => {
    nprogress.start();
    const $nprogress = document.querySelector('#nprogress');

    if ($nprogress) {
      if (mode === 'dark') $nprogress.classList.add('dark');
      else $nprogress.classList.remove('dark');
    }
    return () => {
      nprogress.done();
    };
  }, [mode]);

  return <></>;
};
