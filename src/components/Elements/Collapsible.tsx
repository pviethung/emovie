import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useId, useState } from 'react';

export const Collapsible = ({
  header,
  content,
  onToggle,
}: {
  header: React.ReactNode;
  content: React.ReactNode;
  onToggle?: (isShow: boolean) => void;
}) => {
  const [toggle, setToggle] = useState(false);
  const id = useId();

  useEffect(() => {
    if (onToggle) onToggle(toggle);
  }, [toggle, onToggle]);

  return (
    <div className="bg-base-300 rounded-lg border border-base-content/20 overflow-hidden">
      <button
        onClick={() => setToggle((prv) => !prv)}
        className={clsx('p-3 border-t-0 flex items-center gap-2 w-full')}
      >
        {header}
        <svg
          className={clsx('w-4 h-4 ml-auto transition-all', {
            'rotate-0': !toggle,
            'rotate-90': toggle,
          })}
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 16 16"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"></path>
        </svg>
      </button>

      <AnimatePresence>
        {toggle && (
          <motion.div
            key={id}
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className={clsx(
              'overflow-hidden [&>li]:border-t [&>li]:border-base-content/20'
            )}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
