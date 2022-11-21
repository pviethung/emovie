import clsx from 'clsx';
import { Link } from 'react-router-dom';

export const Logo = () => {
  return (
    <Link
      to={'/'}
      className={clsx(
        'font-extrabold no-underline',
        'text-[inherit] bg-[unset]',
        'active:bg-[unset]'
      )}
    >
      <h1
        className={clsx(
          'pointer-events-none',
          'prose text-4xl gap-0 m-0 p-0 flex-1 justify-center',
          'text-primary '
        )}
      >
        E<span className={clsx('text-base-content')}>movie</span>
      </h1>
    </Link>
  );
};
