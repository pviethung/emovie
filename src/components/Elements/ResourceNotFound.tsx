import clsx from 'clsx';

export const ResourceNotFound = () => {
  return (
    <div
      className={clsx(
        'max-w-max mx-auto h-screen flex flex-col justify-center'
      )}
    >
      <div className={clsx('text-primary')}>
        <p className={clsx('text-9xl')}>:-(</p>
        <br />
        <h3 className={clsx('text-5xl font-light mb-10')}>
          Something went wrong
        </h3>
      </div>
      <p>We can't get that infomation right now. Please try again later.</p>
    </div>
  );
};
