import { switchTheme } from '@/features/theme';
import { useAppDispatch } from '@/store/hooks';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

export const SwitchThemeButton = () => {
  const dispatch = useAppDispatch();

  return (
    <label
      onChange={() => dispatch(switchTheme())}
      className={clsx('swap swap-rotate px-4 py-3', 'rounded-lg')}
    >
      <input type="checkbox" />
      <SunIcon className={clsx('swap-off w-8 h-8', 'fill-current')} />
      <MoonIcon className={clsx('swap-on w-8 h-8', 'fill-current')} />
    </label>
  );
};
