import { lazyImport } from '@/utils/lazyImport';
import { Route, Routes } from 'react-router-dom';
import { SuggestionList } from './SuggestionList';

const { MediaDetail } = lazyImport(
  () => import('./MediaDetail'),
  'MediaDetail'
);

export const WatchRoutes = () => {
  return (
    <Routes>
      <Route path=":id">
        <Route index element={<MediaDetail />} />
        <Route path="watch" element={<MediaDetail />} />
        <Route path="similar" element={<SuggestionList type="similar" />} />
        <Route
          path="recommendations"
          element={<SuggestionList type="recommendations" />}
        />
      </Route>
      <Route path="*" element={<>402</>} />
    </Routes>
  );
};
