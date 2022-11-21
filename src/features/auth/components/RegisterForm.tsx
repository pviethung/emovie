import { useToast } from '@/hooks/useToast';
import { useAppDispatch } from '@/store/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { login } from '../authSlice';
import { useRegister } from '../hooks/useRegister';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const schema = yup
  .object({
    firstName: yup.string().required('This is a required field'),
    lastName: yup.string().required('This is a required field'),
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

export const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register: registerUser,
    data,
    error,
    isLoading,
    isError,
  } = useRegister();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const submitHandler = (data: FormData) => {
    registerUser(data);
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
      dispatch(login(data));
      successToast('You have successfully registered');
      navigate('/auth/login');
    }
  }, [
    isError,
    data,
    successToast,
    errorToast,
    error,
    reset,
    dispatch,
    navigate,
  ]);

  return (
    <div>
      <button
        className={clsx(
          'btn border-base-content/20 bg-white  dark:text-base-300 w-full mt-8',
          'btn-outline',
          'hover:bg-white hover:text-base-content'
        )}
      >
        <img
          className={clsx('w-5 h-5 mr-3')}
          src="/google-logo.png"
          alt="Google"
        />
        Sign up with Google
      </button>
      <div className="divider my-10 text-slate-300 after:bg-slate-400 before:bg-slate-400">
        or
      </div>
      <form
        noValidate
        onSubmit={handleSubmit(submitHandler)}
        className="space-y-6"
      >
        <div className={clsx('flex gap-4 [&>div]:flex-1')}>
          <div className="form-group">
            <label className="label">
              <span className="label-text text-white">First Name*</span>
            </label>

            <input
              type="text"
              {...register('firstName')}
              placeholder="Your first name"
              className={clsx('input input-bordered w-full')}
            />
            {errors.firstName && (
              <p className="error">{errors.firstName.message}</p>
            )}
          </div>
          <div className="form-group">
            <label className="label">
              <span className="label-text text-white">Last Name*</span>
            </label>

            <input
              type="text"
              placeholder="Your last name"
              {...register('lastName')}
              className={clsx('input input-bordered w-full')}
            />
            {errors.lastName && (
              <p className="error">{errors.lastName.message}</p>
            )}
          </div>
        </div>

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
            {...register('password')}
            placeholder="Min 6 character"
            className={clsx('input input-bordered w-full')}
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </div>

        <button
          className={clsx(
            { 'loading': isLoading },
            'btn  w-full !mt-10',
            'text-white btn-primary'
          )}
        >
          Sign Up
        </button>
        <p className={clsx('text-white')}>
          Already have an account?{' '}
          <Link className={clsx('text-primary')} to={'/auth/login'}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};
