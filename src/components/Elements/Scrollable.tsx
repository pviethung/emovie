import clsx from 'clsx';

export const Scrollable = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={clsx(
        'scrollbar-thumb-base-content scrollbar-thumb-rounded-md scrollbar-track-base-300 scrollbar-thin',
        className
      )}
    >
      {children}
    </div>
  );
};
