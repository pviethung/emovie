import { useThemeSelector } from '@/features/theme';
import clsx from 'clsx';

import { AnimatePresence, motion } from 'framer-motion';
import { useRef } from 'react';
import { createPortal } from 'react-dom';

export const Backdrop = () => {
  const backdropPortal = useRef(document.querySelector('#app-backdrop'));
  const { showBackdrop } = useThemeSelector();

  const content = (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div
          className={clsx(
            'fixed top-0 left-0 w-screen h-screen bg-neutral-focus/40'
          )}
        />
      </motion.div>
    </AnimatePresence>
  );

  return createPortal(
    showBackdrop ? content : null,
    backdropPortal.current as Element
  );
};
