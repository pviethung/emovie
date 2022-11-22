import { NotFound } from '@/components/Pages';
import { ProtectedRoute } from '@/routes';
import { lazyImport } from '@/utils/lazyImport';
import { Route, Routes } from 'react-router-dom';

const { Home } = lazyImport(() => import('./Home'), 'Home');
const { Trending } = lazyImport(() => import('./Trending'), 'Trending');
const { PrivateList } = lazyImport(
  () => import('./PrivateList'),
  'PrivateList'
);

export const ListRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="trending" element={<Trending />} />
      <Route path="lists" element={<ProtectedRoute redirectPath="/" />}>
        <Route path="bookmarked" element={<PrivateList />} />
        <Route path="recent" element={<PrivateList />} />
        <Route path="favorites" element={<PrivateList />} />
      </Route>
      <Route
        path="*"
        element={
          <>
            <NotFound />
          </>
        }
      />
    </Routes>
  );
};
