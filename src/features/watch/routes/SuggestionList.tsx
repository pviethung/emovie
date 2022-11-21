import { InfiniteMediaGrid } from '@/features/lists';
import { isMovieDetail } from '@/utils/isMovieDetail';
import clsx from 'clsx';
import { useLocation } from 'react-router-dom';
import { useMediaDetailQuery } from '../hooks/useMediaDetailQuery';

export const SuggestionList = ({
  type,
}: {
  type: 'similar' | 'recommendations';
}) => {
  const { pathname } = useLocation();
  const pathArr = pathname.split('/');
  const mediaType = pathArr[1] as 'tv' | 'movie';
  const mediaId = pathArr[2];

  const { data: mediaDetail } = useMediaDetailQuery(mediaType, mediaId);
  let title = '';
  if (mediaDetail) {
    if (isMovieDetail(mediaDetail)) title = mediaDetail.title;
    else title = mediaDetail.name;
  }

  return (
    <div className={clsx('min-h-[1200px] py-8')}>
      <div id="discovery" className={clsx('px-6')}>
        <InfiniteMediaGrid<'relatedList'>
          customTitle={`${
            type === 'recommendations' ? 'Recommended' : 'Similar'
          } ${mediaType === 'tv' ? 'series' : 'movies'} like "${title}"`}
          mediaId={mediaId}
          mediaType={mediaType}
          listKey={type}
          listType="relatedList"
          imageSize="grid-item"
        />
      </div>
    </div>
  );
};
