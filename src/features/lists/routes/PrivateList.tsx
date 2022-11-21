import { ResourceNotFound } from '@/components/Elements';
import { useAuthSelector } from '@/features/auth';
import { MediaTypeBar, useFilterSelector } from '@/features/filter';
import { useToast } from '@/hooks/useToast';
import { TrashIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { ListItemSkeleton } from '../components/ListItemSkeleton';
import { PrivateListItem } from '../components/PrivateListItem';
import { ToggleMediaInList } from '../components/ToggleMediaInList';
import { useGetPrivateMedia } from '../hooks/useGetPrivateMedia';
import { TLists } from '../types';
import { removeNoImageMovies } from '../utils/removeNoImageMovies';
export const PrivateList = () => {
  const { mediaType } = useFilterSelector();
  const { successToast } = useToast();
  const { user } = useAuthSelector();
  const uid = user?.uid as string;

  let content: React.ReactNode = '';
  let { pathname } = useLocation();
  let listTitle = pathname.split('/').slice(-1)[0] as keyof TLists;
  let listId = '';

  const {
    isLoading,
    isError,
    data: media,
  } = useGetPrivateMedia(listTitle, mediaType, uid);

  if (isLoading)
    content = (
      <div className={clsx('space-y-6')}>
        {Array.from({ length: 5 }, (v, i) => {
          return <ListItemSkeleton key={i} />;
        })}
      </div>
    );

  if (isError) {
    return <ResourceNotFound />;
  }

  if (media) {
    content = (
      <div
        className={clsx(
          'grid gap-6 grid-cols-[repeat(auto-fill,minmax(880px,1fr))]'
        )}
      >
        {media.length > 0 ? (
          <AnimatePresence key={mediaType + listTitle} initial={false}>
            {removeNoImageMovies(media).map((m: any, idx: number) => (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={clsx('relative')}
                key={m.id}
              >
                <PrivateListItem key={m.id} media={m} />
                <div className={clsx('absolute top-2 right-2')}>
                  <ToggleMediaInList
                    listTitle={listTitle}
                    onToggleSuccess={() => {
                      successToast(
                        <>
                          <span className={clsx('font-bold')}>
                            {m?.title || m?.name}
                          </span>{' '}
                          has been removed from your{' '}
                          <span className={clsx('font-bold capitalize')}>
                            {listTitle === 'favorites'
                              ? 'favorite'
                              : listTitle === 'bookmarked'
                              ? 'bookmarked'
                              : 'history'}
                          </span>{' '}
                          {listTitle !== 'recent' && 'list'}
                        </>
                      );
                    }}
                    mediaType={mediaType as 'tv' | 'movie'}
                    mediaId={m.id}
                  >
                    <TrashIcon
                      className={clsx('absolute w-6 h-6 text-base-content')}
                    />
                  </ToggleMediaInList>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <p>Your list is empty</p>
        )}
      </div>
    );
  }

  return (
    <div className="pb-10">
      <MediaTypeBar />
      <div className={clsx('divider mt-0 px-4')} />
      <div className={clsx('px-4')} id={listId}>
        {listTitle === 'recent' ? (
          <h3
            className={clsx(
              'font-medium capitalize',
              'lg:text-2xl mb-8',
              'dark:text-white'
            )}
          >
            Your History
          </h3>
        ) : (
          <h3
            className={clsx(
              'font-medium capitalize',
              'lg:text-2xl mb-8',
              'dark:text-white'
            )}
          >
            Your {listTitle === 'favorites' ? 'favorite' : 'bookmarked'}{' '}
            {mediaType === 'movie' ? 'Movies' : 'Tv Series'}
          </h3>
        )}
        {content}
      </div>
    </div>
  );
};
