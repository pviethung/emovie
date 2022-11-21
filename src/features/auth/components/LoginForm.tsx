import { useToast } from '@/hooks/useToast';
import { useAppDispatch } from '@/store/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { login as LoginAction } from '../authSlice';
import { useLogin } from '../hooks/useLogin';

type FormData = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup
      .string()
      .email('Invalid email address')
      .required('This is a required field'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('This is a required field'),
  })
  .required();

export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { login, data, error, isLoading, isError } = useLogin();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const submitHandler = (data: FormData) => {
    login(data);
  };
  const { successToast, errorToast } = useToast();

  useEffect(() => {
    if (isError) {
      const errorMsg = error as any;
      errorToast(errorMsg?.message || 'Something went wrong');
      return;
    }
    if (data) {
      reset();
      dispatch(LoginAction(data));
      successToast('You have successfully logged in');
      navigate('/');
    }
  }, [
    isError,
    navigate,
    data,
    successToast,
    errorToast,
    error,
    dispatch,
    reset,
  ]);

  return (
    <div>
      <button
        className={clsx(
          'btn border-base-content/20 bg-white dark:text-base-300 w-full mt-8',
          'btn-outline',
          'hover:bg-white hover:text-base-content'
        )}
      >
        <img
          className={clsx('w-5 h-5 mr-3')}
          src="/google-logo.png"
          alt="Google"
        />
        Sign in with Google
      </button>
      <div className="divider my-10 text-slate-300 after:bg-slate-400 before:bg-slate-400">
        or Sign in with Email
      </div>
      <form
        noValidate
        onSubmit={handleSubmit(submitHandler)}
        className="space-y-6"
      >
        <div className="form-group">
          <label className="label">
            <span className="label-text text-white">Email*</span>
          </label>

          <input
            type="email"
            placeholder="mail@example.com"
            {...register('email')}
            className={clsx('input input-bordered w-full')}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <label className="label">
            <span className="label-text text-white">Password*</span>
          </label>
          <input
            type="password"
            placeholder="Min 6 character"
            {...register('password')}
            className={clsx('input input-bordered w-full')}
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </div>

        <button
          className={clsx(
            { 'loading': isLoading },
            'btn w-full !mt-10',
            'text-white btn-primary'
          )}
        >
          Login
        </button>
        <p className={clsx('text-white')}>
          Not registered yet?{' '}
          <Link className={clsx('text-primary')} to={'/auth/register'}>
            Create an Account
          </Link>
        </p>
      </form>
    </div>
  );
};
