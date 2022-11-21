import { useAuthSelector } from '@/features/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { toggleMediaInList } from '../api/toggleMediaInList';
import { TLists } from '../types';

export const ToggleMediaInList = ({
  listTitle,
  mediaType,
  mediaId,
  onToggleSuccess,
  children,
}: {
  mediaId: number;
  listTitle: keyof TLists;
  mediaType: 'movie' | 'tv';
  onToggleSuccess: (state?: 'added' | 'removed') => void;
  children: React.ReactNode;
}) => {
  const queryClient = useQueryClient();
  const { user } = useAuthSelector();
  const { mutate: addToBookmark, isLoading } = useMutation(
    [
      listTitle,
      {
        type: mediaType,
        id: mediaId,
      },
    ],
    async () => {
      if (user) {
        return toggleMediaInList(user.uid, mediaId, listTitle, mediaType);
      }
    },
    {
      onSuccess: (data) => {
        onToggleSuccess(data);
        queryClient.invalidateQueries({
          queryKey: [listTitle, mediaType],
        });
      },
    }
  );
  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    addToBookmark();
  };

  return (
    <div
      onClick={handleToggle}
      className={clsx(
        'btn btn-circle bg-base-300/10 text-white border-none cursor-pointer',
        'before:z-10 w-12 h-12',
        { 'loading': isLoading },
        'hover:bg-base-300'
      )}
    >
      {children}
    </div>
  );
};
