import { SuspenseLoader, SwitchThemeButton } from '@/components/Elements';
import { lazyImport } from '@/utils/lazyImport';
import clsx from 'clsx';
import { Suspense } from 'react';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
// import { LoginForm } from '../components/LoginForm';
// import { RegisterForm } from '../components/RegisterForm';

const { LoginForm } = lazyImport(
  () => import('../components/LoginForm'),
  'LoginForm'
);
const { RegisterForm } = lazyImport(
  () => import('../components/RegisterForm'),
  'RegisterForm'
);

const Auth = () => {
  return (
    <div
      className={clsx(
        'flex lg:min-h-screen lg:flex-row relative',
        'after:absolute after:w-full after:h-full after:top-0 after:left-0 after:bg-gradient-to-r after:from-black '
      )}
    >
      <video
        className={clsx('absolute top-0 left-0 w-full h-full object-cover ')}
        src="/auth-bg.webm"
        autoPlay
        loop
        muted
      ></video>
      <div className={clsx('w-1/2 flex items-center justify-center')}>
        <div className={clsx('max-w-md w-full mx-auto relative z-10')}>
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
              E<span className={clsx('text-white')}>movie</span>
            </h1>
          </Link>
          <Suspense fallback={<SuspenseLoader />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
      <div className={clsx('fixed right-4 top-4 z-10 [&>label]:bg-base-300')}>
        <SwitchThemeButton />
      </div>
    </div>
  );
};

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route element={<Auth />}>
        <Route element={<LoginForm />} path="login" />
        <Route element={<RegisterForm />} path="register" />
      </Route>
      <Route element={<>401</>} path="*" />
    </Routes>
  );
};
