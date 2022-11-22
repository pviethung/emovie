import { Prompt } from '@/components/Elements';
import { useToast } from '@/hooks/useToast';
import { useAppDispatch } from '@/store/hooks';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import {
  RegisterOptions,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from 'react-hook-form';
import LazyLoad from 'react-lazy-load';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { deleteAccount } from '../api/deleteAccount';
import { updatePassword } from '../api/updatePassword';
import { updateUserProfile } from '../api/updateUserProfile';
import { getUpdatedUser, logout, useAuthSelector, User } from '../authSlice';
import { ReauthenticationForm } from './ReauthenticationForm';

interface IInformationValues {
  displayName: string;
  email: string;
  avatar: FileList;
}

const EditableField = ({
  name,
  type,
  placeholder,
  register,
  validationOptions,
  error,
  touched,
}: {
  name: keyof IInformationValues;
  type: string;
  placeholder: string;
  register: UseFormRegister<IInformationValues>;
  validationOptions?: RegisterOptions;
  error?: string;
  touched?: boolean;
}) => {
  const [readOnly, setReadOnly] = useState(true);
  const [value, setValue] = useState(placeholder);
  const ref = useRef<HTMLInputElement | null>(null);
  const {
    ref: hookRef,
    onChange: hookOnChange,
    ...rest
  } = register(name, validationOptions);

  const handleEdit = () => {
    setReadOnly(false);
    setTimeout(() => {
      if (ref.current) ref.current.focus();
      // i dont know
    }, 0);
  };

  useEffect(() => {
    setReadOnly(true);

    // handle events
    const escapeHandler = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (document.activeElement !== ref.current) return;
      setValue(placeholder);
      setReadOnly(true);
    };
    document.addEventListener('keydown', escapeHandler);
    return () => {
      document.removeEventListener('keydown', escapeHandler);
    };
  }, [placeholder]);

  return (
    <div className={clsx('relative w-3/5 group')}>
      <input
        {...rest}
        ref={(e) => {
          hookRef(e);
          ref.current = e;
        }}
        onChange={(e) => {
          hookOnChange(e);
          setValue(e.target.value);
        }}
        value={value}
        readOnly={readOnly}
        type={type}
        required
        className={clsx('input input-bordered w-full')}
      />
      {readOnly && (
        <PencilSquareIcon
          onClick={handleEdit}
          className={clsx(
            'w-5 h-5 absolute right-3 top-3 cursor-pointer opacity-0 invisible',
            'group-hover:opacity-100 group-hover:visible'
          )}
        />
      )}

      {touched && error ? (
        <p className={clsx('error absolute -bottom-8 left-0 text-sm')}>
          {error}
        </p>
      ) : null}

      {!readOnly && (
        <p className={clsx('absolute -bottom-8 right-0 italic text-sm')}>
          Press Esc to cancel
        </p>
      )}
    </div>
  );
};

const AvatarInput = ({
  name,
  register,
}: {
  name: keyof IInformationValues;
  register: UseFormRegister<IInformationValues>;
}) => {
  const { onChange, ref: hookRef, ...rest } = register(name);
  const [error, setInputError] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement | null>(null);

  return (
    <div className={clsx('relative')}>
      {error ? (
        <p className={clsx('error absolute -bottom-8 left-0 text-sm')}>
          {error}
        </p>
      ) : null}
      <input
        {...rest}
        ref={(e) => {
          hookRef(e);
          ref.current = e;
        }}
        onChange={(e) => {
          setInputError(null);
          if (!e.target.files || e.target.files.length === 0) {
            return;
          }
          const file = e.target.files[0];
          if (file.size > 5242880) {
            const message = 'File Size is too large, please try again';
            e.target.value = '';
            setInputError(message);
            ref.current?.blur();

            return;
          }
          if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
            const message = 'Unsupported File Format, please try again';
            e.target.value = '';
            setInputError(message);
            ref.current?.blur();

            return;
          }
          onChange(e);
        }}
        type="file"
      />
    </div>
  );
};
const Form = ({ user }: { user: User }) => {
  const {
    isLoading,
    isError,

    data,
    isSuccess,
    mutate: updateInfo,
  } = useMutation({
    mutationKey: ['updateProfile'],
    mutationFn: async (updatedInfo: {
      displayName?: string;
      email?: string;
      avatar?: File;
    }) => {
      return updateUserProfile(updatedInfo);
    },
  });
  const { successToast, errorToast, modalToast } = useToast();
  const dispatch = useDispatch();
  const defaultValues = {
    displayName: user.displayName,
    email: user.email,
    avatar: new DataTransfer().files,
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields, isDirty },
  } = useForm<IInformationValues>({
    defaultValues,
    mode: 'all',
  });

  const onSubmit: SubmitHandler<IInformationValues> = (values) => {
    if (!isDirty) return;

    const updatedInfo: Record<string, any> = {};
    if (values.displayName !== defaultValues.displayName) {
      updatedInfo['displayName'] = values.displayName;
    }
    if (values.email !== defaultValues.email) {
      updatedInfo['email'] = values.email;
    }
    if (values.avatar.length > 0) {
      updatedInfo['avatar'] = values.avatar[0];
    }
    updateInfo(updatedInfo);
  };

  const FORM_FIELDS = [
    {
      label: 'Display Name',
      field: (
        <EditableField
          touched={touchedFields['displayName']}
          error={errors['displayName']?.message}
          validationOptions={{
            required: {
              value: true,
              message: 'This is a required field',
            },
          }}
          name="displayName"
          register={register}
          type="text"
          placeholder={user.displayName}
        />
      ),
    },
    {
      label: (
        <>
          Your photo
          <span className={clsx('block text-sm font-normal')}>
            This will be displayed on your profile.
          </span>
        </>
      ),
      field: (
        <div className={clsx('flex items-center')}>
          <div
            className={clsx('avatar mr-10', {
              'placeholder': user?.photoURL || true,
            })}
          >
            <div
              className={clsx(
                'w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2',
                {
                  'bg-base-300': user?.photoURL || true,
                }
              )}
            >
              {user.photoURL ? (
                <LazyLoad height={'100%'}>
                  <figure className="h-full">
                    <img src={user.photoURL} alt={user.displayName} />
                  </figure>
                </LazyLoad>
              ) : (
                <span className="text-xl">{user.displayName.slice(0, 1)}</span>
              )}
            </div>
          </div>
          <AvatarInput name="avatar" register={register} />
        </div>
      ),
    },
    {
      label: (
        <>
          Email
          <span className={clsx('block text-sm font-normal')}>
            Your email is not verified yet! Let's{' '}
            <button className={clsx('link link-primary')}>Verify it</button>
          </span>
        </>
      ),
      field: (
        <EditableField
          touched={touchedFields['email']}
          error={errors['email']?.message}
          validationOptions={{
            required: {
              value: true,
              message: 'This is a required field',
            },
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: 'Invalid email address',
            },
          }}
          name="email"
          register={register}
          type="email"
          placeholder={user.email}
        />
      ),
    },
  ];

  useEffect(() => {
    if (isSuccess) {
      successToast('Your changes have been updated successfully!');
      dispatch(getUpdatedUser() as any);
    }
  }, [isSuccess, data, successToast, dispatch]);

  useEffect(() => {
    reset({
      displayName: user.displayName,
      email: user.email,
      avatar: new DataTransfer().files,
    });
  }, [reset, user]);

  useEffect(() => {
    if (isError) {
      errorToast('Something went wrong, please try again later');
    }
  }, [isError, errorToast]);

  return (
    <div>
      <h2 className={clsx('text-3xl font-semibold mb-10')}>
        Personal Information
      </h2>

      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        {FORM_FIELDS.map((field, idx) => (
          <div key={idx}>
            <div
              className={clsx('form-group flex flex-wrap items-center py-5')}
            >
              <label className={clsx('label w-2/5')}>
                <span className="label-text font-semibold text-lg">
                  {field.label}
                </span>
              </label>

              {field.field}
            </div>
            {idx < FORM_FIELDS.length - 1 && <div className="divider" />}
          </div>
        ))}
      </form>
      <div className={clsx('text-center mt-10 relative')}>
        <button
          onClick={() => {
            const toast = modalToast((t) => (
              <ReauthenticationForm
                toastId={t.id}
                onError={() => {
                  errorToast('Invalid password');
                }}
                onSuccess={() => {
                  handleSubmit(onSubmit)();
                }}
                onClose={() => toast.dismiss(t.id)}
              />
            ));
          }}
          className={clsx('btn btn-primary', {
            'loading': isLoading,
            'btn-disabled': !isDirty,
            // 'btn-disabled': false,
          })}
        >
          Save changes
        </button>
      </div>
    </div>
  );
};
const AccountSettings = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<{ password: string }>({
    mode: 'onBlur',
    defaultValues: {
      'password': '',
    },
  });
  const { modalToast, errorToast, successToast } = useToast();

  const { isLoading, isError, isSuccess, mutate } = useMutation({
    mutationKey: ['updatePassword'],
    mutationFn: (newPassword: string) => {
      return updatePassword(newPassword);
    },
  });

  const onSubmit = (values: { password: string }) => {
    const newPassword = values.password;
    //call api
    mutate(newPassword);
  };

  useEffect(() => {
    if (isError) {
      errorToast('Something went wrong, please try again later');
    }
  }, [isError, errorToast]);

  useEffect(() => {
    if (isSuccess) {
      successToast('Your password has been updated successfully!');
    }
  }, [isSuccess, successToast]);

  return (
    <div>
      <h2 className={clsx('text-3xl font-semibold mb-10')}>Account settings</h2>
      <div className={clsx('flex items-center py-5')}>
        <p className="label-text font-semibold text-lg flex-1">
          Update password
        </p>
        <div className={clsx('flex gap-2 w-3/5')}>
          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className={clsx('flex-1')}
          >
            <div className={clsx('form-group')}>
              <input
                {...register('password', {
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                type={'password'}
                placeholder={'Enter your new password'}
                className={clsx('input input-bordered w-full')}
              />
              {errors.password && (
                <p className="error text-sm">{errors.password.message}</p>
              )}
            </div>
          </form>
          <button
            onClick={() => {
              if (errors.password) return;

              const toast = modalToast((t) => (
                <ReauthenticationForm
                  toastId={t.id}
                  onError={() => {
                    errorToast('Invalid password');
                  }}
                  onSuccess={() => {
                    handleSubmit(onSubmit)();
                  }}
                  onClose={() => toast.dismiss(t.id)}
                />
              ));
            }}
            className={clsx('btn btn-primary', {
              'btn-disabled': !isDirty,
              'loading': isLoading,
            })}
          >
            Update
          </button>
        </div>
      </div>

      <div className={clsx('divider')} />
    </div>
  );
};

// TODO 401 page
const DeleteAccount = () => {
  const { successToast, errorToast, modalToast } = useToast();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { mutate, isLoading, isError, isSuccess } = useMutation({
    mutationKey: ['deleteUser'],
    mutationFn: () => {
      return deleteAccount();
    },
  });

  const handleDeleteAccount = () => {
    const toast = modalToast((t) => {
      return (
        <Prompt
          title={'Delete account'}
          content={`Are you sure you want to delete your account? All of
          your data will be permanently removed. This action
          cannot be undone.`}
          onAccept={() => {
            modalToast((t) => (
              <ReauthenticationForm
                toastId={t.id}
                onError={() => {
                  errorToast('Invalid password');
                }}
                onSuccess={() => {
                  mutate();
                }}
                onClose={() => {
                  toast.dismiss(t.id);
                }}
              />
            ));
            toast.dismiss(t.id);
          }}
          onDecline={() => {
            toast.dismiss(t.id);
          }}
        />
      );
    });
  };
  useEffect(() => {
    if (isSuccess) {
      navigate('/');
      successToast('Your account has been deleted. Hope you come back one day');
      dispatch(logout());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, successToast]);

  useEffect(() => {
    if (isError) {
      errorToast('Something went wrong, please try again later');
    }
  }, [isError, errorToast]);

  return (
    <div>
      <button
        onClick={handleDeleteAccount}
        className={clsx(
          'btn btn-error text-primary-content hover:bg-error/90',
          {
            'loading': isLoading,
          }
        )}
      >
        Delete account
      </button>
    </div>
  );
};

export const ProfileDetail = () => {
  const { user } = useAuthSelector();

  if (!user) {
    return <Navigate to={'/auth/login'} />;
  }

  return (
    <div className={clsx('p-6 pb-20')}>
      {/* <div className={clsx('divider mt-0 px-4')} /> */}

      <div id="profile">
        <div className={clsx('rounded-tl-3xl rounded-br-3xl overflow-hidden')}>
          <LazyLoad height={'100%'}>
            <figure className="h-full">
              <img src={'./default_profile_cover_2.jpeg'} alt={'spiderman'} />
            </figure>
          </LazyLoad>
        </div>
        <div className={clsx('-mt-8 flex items-center')}>
          <div
            className={clsx('avatar ml-10 mr-10', {
              'placeholder': user.photoURL || true,
            })}
          >
            <div
              className={clsx(
                'w-44 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2',
                {
                  'bg-base-300': user.photoURL || true,
                }
              )}
            >
              {user.photoURL ? (
                <LazyLoad height={'100%'}>
                  <figure className="h-full">
                    <img src={user.photoURL} alt={user.displayName} />
                  </figure>
                </LazyLoad>
              ) : (
                <span className="text-4xl">{user.displayName.slice(0, 1)}</span>
              )}
            </div>
          </div>

          <div>
            <h1 className={clsx('text-4xl font-semibold mb-2')}>
              {user.displayName}
            </h1>
            <p>Update your photo and personal details.</p>
          </div>
        </div>

        <div className={clsx('mt-20 w-4/5 mx-auto max-w-5xl space-y-20')}>
          <Form user={user} />
          <AccountSettings />
          <DeleteAccount />

          {/* 
           {
      label: 'Password',
      field: (
        <EditableField
          touched={touchedFields['password']}
          error={errors['password']?.message}
          validationOptions={{
            required: {
              value: true,
              message: 'This is a required field',
            },
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          }}
          name="password"
          register={register}
          type="password"
          placeholder="••••••••"
        />
      ),
    },
          */}
        </div>

        {/* {errors.firstName && (
 <p className="error">{errors.firstName.message}</p>
)} */}
      </div>
    </div>
  );
};
