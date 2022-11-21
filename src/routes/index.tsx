import { Layout } from '@/components/Layout';
import { AuthRoutes, useAuthSelector } from '@/features/auth';
import { ListRoutes } from '@/features/lists';
import { WatchRoutes } from '@/features/watch';
import { lazyImport } from '@/utils/lazyImport';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';

const { Profile } = lazyImport(() => import('@/features/auth'), 'Profile');
const { Search } = lazyImport(() => import('@/features/filter'), 'Search');
const { Discovery } = lazyImport(
  () => import('@/features/filter'),
  'Discovery'
);

export const ProtectedRoute = ({
  redirectPath = '/',
  children,
}: {
  redirectPath: string;
  children?: React.ReactNode;
}) => {
  const { user } = useAuthSelector();
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export const AppRoutes = () => {
  const routes = useRoutes([
    {
      element: <Layout />,
      children: [
        {
          path: '/*',
          element: <ListRoutes />,
        },
        {
          path: '/search',
          element: <Search />,
        },
        {
          path: '/discovery',
          element: <Discovery />,
        },
        {
          path: '/movie/*',
          element: <WatchRoutes />,
        },
        {
          path: '/tv/*',
          element: <WatchRoutes />,
        },
        {
          path: '/profile',
          element: <Profile />,
        },
      ],
    },
    {
      path: '/auth/*',
      element: <AuthRoutes />,
    },
  ]);

  return <>{routes}</>;
};
