import { Toast } from '@/components/Elements';
import { useCallback } from 'react';
import toast, {
  Renderable,
  Toast as TToast,
  ValueOrFunction,
} from 'react-hot-toast';

export const useToast = () => {
  const successToast = useCallback(
    (msg: React.ReactNode) =>
      toast((t) => (
        <Toast type="success" onClose={() => toast.dismiss(t.id)}>
          {msg}
        </Toast>
      )),
    []
  );
  const errorToast = useCallback(
    (msg: React.ReactNode) =>
      toast((t) => (
        <Toast type="error" onClose={() => toast.dismiss(t.id)}>
          {msg}
        </Toast>
      )),
    []
  );
  const alertToast = useCallback(
    (msg: React.ReactNode) =>
      toast((t) => (
        <Toast type="alert" onClose={() => toast.dismiss(t.id)}>
          {msg}
        </Toast>
      )),
    []
  );

  const modalToast = useCallback((msg: ValueOrFunction<Renderable, TToast>) => {
    toast(msg, {
      duration: Infinity,
      position: 'top-center',
      style: {
        padding: 0,
        margin: 0,
        background: 'transparent',
        boxShadow: 'none',
        maxWidth: 'unset',
      },
    });

    return toast;
  }, []);

  return {
    modalToast,
    alertToast,
    successToast,
    errorToast,
  };
};
