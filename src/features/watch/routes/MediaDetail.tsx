import { ResourceNotFound } from '@/components/Elements';
import { useAuthSelector } from '@/features/auth';
import { toggleMediaInList } from '@/features/lists';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'swiper/css';
import { InformationSection } from '../components/InformationSection';
import { MediaSection } from '../components/MediaSection';
import { useMediaDetailQuery } from '../hooks/useMediaDetailQuery';

export const MediaDetail = () => {
  const { pathname } = useLocation();
  const pathArr = pathname.split('/');
  const mediaType = pathArr[1] as 'tv' | 'movie';
  const mediaId = pathArr[2];
  const { user } = useAuthSelector();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!user) return;

    toggleMediaInList(user.uid, +mediaId, 'recent', mediaType, true).then(
      () => {
        queryClient.invalidateQueries({
          queryKey: ['recent', mediaType],
        });
      }
    );
  }, [mediaId, mediaType, user, queryClient]);

  const {
    data: mediaDetail,
    isLoading,
    isError,
  } = useMediaDetailQuery(mediaType, mediaId);

  if (isLoading) {
    // TODOs skeleton
  }
  if (isError) {
    return <ResourceNotFound />;
  }

  return (
    <>
      {mediaDetail ? (
        <div className="detail">
          <MediaSection mediaDetail={mediaDetail} />
          <InformationSection mediaDetail={mediaDetail} />
        </div>
      ) : null}
    </>
  );
};
