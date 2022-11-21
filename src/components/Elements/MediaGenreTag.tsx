import clsx from 'clsx';

export const MediaGenreTag = ({ genre }: { genre: string }) => {
  return (
    <div
      className={clsx('py-2 px-3 rounded-md text-primary-content bg-primary')}
    >
      {genre}
    </div>
  );
};
