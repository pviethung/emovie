import clsx from 'clsx';
import { imageSizes } from './MediaCard';

export const MediaCardSkeleton = ({
  imageSize,
}: {
  imageSize: keyof typeof imageSizes;
}) => {
  return (
    <div
      className={clsx(
        'group',
        'card product-card ',
        'bg-base-100 shadow-black shadow-2xl',
        `${imageSizes[imageSize].size} relative`,
        'after:absolute after:bg-gradient-to-b after:from-white/0 after:to-black/60 after:w-full after:h-full after:z-20'
      )}
    >
      {imageSize === 'grid-item' && (
        <div className={clsx('pt-[150%] w-full')}>
          <div className="absolute top-0 left-0 z-0 w-full h-full flex justify-center items-center bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"></div>
        </div>
      )}
    </div>
  );
};
