import { useBackdrop } from '@/hooks/useBackdrop';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { reAuthenticate } from '../api/reAuthenticate';

type Inputs = {
  password: string;
};
export const ReauthenticationForm = ({
  toastId,
  onSuccess,
  onError,
  onClose,
}: {
  toastId: string;
  onSuccess?: () => void;
  onError?: () => void;
  onClose?: () => void;
}) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const { show, hide } = useBackdrop();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      'password': '',
    },
  });

  const { ref: hookRef, ...rest } = register('password', {
    required: {
      value: true,
      message: 'This is a required field',
    },
    minLength: {
      value: 6,
      message: 'Password must be at least 6 characters',
    },
  });

  const { mutate, isLoading, isError, isSuccess } = useMutation({
    mutationKey: ['reauthenticateUser'],
    mutationFn: (password: string) => {
      return reAuthenticate(password);
    },
  });
  console.log('render sm form');

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    mutate(values.password);
  };

  useEffect(() => {
    show();
    return () => {
      hide();
    };
  }, [show, hide]);

  useEffect(() => {
    if (isSuccess) {
      if (onSuccess) onSuccess();
      toast.dismiss(toastId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, toastId]);

  useEffect(() => {
    if (isError) {
      if (onError) onError();
      toast.dismiss(toastId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, toastId]);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  return (
    <div
      className={clsx(
        'p-6 rounded-xl bg-white shadow-xl dark:bg-gray-800 w-96 mx-auto relative'
      )}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={clsx('form-group')}>
          <label
            className={clsx(
              'text-base-content uppercase block mb-4 font-semibold'
            )}
          >
            Please enter your password
          </label>
          <input
            {...rest}
            ref={(e) => {
              hookRef(e);
              ref.current = e;
            }}
            type="password"
            className="input input-bordered text-base-content w-full"
          />
          {errors['password'] && (
            <p className="error">{errors['password'].message}</p>
          )}
        </div>
        <div className={clsx('text-center')}>
          <button
            className={clsx('btn btn-primary mt-10', {
              'loading': isLoading,
            })}
            type="submit"
          >
            Re-authenticate
          </button>
        </div>
      </form>

      <button
        onClick={onClose}
        type="button"
        className="absolute top-5 right-5 ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
        data-dismiss-target="#toast-success"
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );
};
