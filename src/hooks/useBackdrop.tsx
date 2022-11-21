import { hideBackdrop, showBackdrop } from '@/features/theme';
import { useAppDispatch } from '@/store/hooks';
import { useCallback } from 'react';

export const useBackdrop = () => {
  const dispatch = useAppDispatch();

  const show = useCallback(() => {
    dispatch(showBackdrop());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const hide = useCallback(() => {
    dispatch(hideBackdrop());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    show,
    hide,
  };
};
