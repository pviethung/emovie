import {
  logout as logoutAction,
  useAuthSelector,
  useLogout,
} from '@/features/auth';
import { SearchBar } from '@/features/filter';
import { useToast } from '@/hooks/useToast';
import { useAppDispatch } from '@/store/hooks';
import {
  ArrowTrendingUpIcon,
  Bars3Icon,
  BookmarkIcon,
  ClockIcon,
  GlobeAltIcon,
  HeartIcon,
  HomeIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  Link,
  NavLink,
  useLocation,
  useMatch,
  useNavigate,
} from 'react-router-dom';
import { SwitchThemeButton } from '../Elements';

type NavigationItems = {
  name: string;
  to: string;
  icon: (
    props:
      | React.SVGProps<SVGSVGElement> & {
          title?: string | undefined;
          titleId?: string | undefined;
        }
  ) => JSX.Element;
  id?: string;
};

const navigation: NavigationItems[] = [
  { name: 'Home', to: '/', icon: HomeIcon },
  {
    name: 'Discovery',
    to: '/discovery?type=movie',
    icon: GlobeAltIcon,
  },
  { name: 'Trending', to: '/trending', icon: ArrowTrendingUpIcon },
];

const personalNavigation: NavigationItems[] = [
  { name: 'Favorites', to: '/lists/favorites', icon: HeartIcon },
  { name: 'Bookmarks', to: '/lists/bookmarked', icon: BookmarkIcon },
  { name: 'Recent', to: '/lists/recent', icon: ClockIcon },
];

const AccountButton = ({
  toggle,
  onToggle,
}: {
  toggle: boolean;
  onToggle: () => void;
}) => {
  const { user } = useAuthSelector();
  const { errorToast, successToast } = useToast();
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();
  const { logout, isLoading, isError, isSuccess } = useLogout();
  const profileRoute = useMatch('/profile');

  useEffect(() => {
    if (toggle) {
      setShow(false);
    }
  }, [toggle]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(logoutAction());
      successToast('You you have successfully logged out');
    }
  }, [isSuccess, successToast, dispatch]);

  useEffect(() => {
    if (isError) errorToast('Something went wrong');
  }, [isError, errorToast]);

  return (
    <div
      className="mt-auto menu p-4 w-64 text-base-content relative"
      onClick={() => {
        if (!user) return;
        if (toggle) {
          onToggle();
        }
        setShow((prev) => !prev);
      }}
    >
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className={clsx(
              'absolute w-[calc(100%_-_32px)] overflow-hidden rounded-md bg-base-100 bottom-[calc(100%_-_10px)] '
            )}
          >
            <ul className={clsx('p-4')}>
              <li>
                <Link to={'/profile'}>
                  <UserCircleIcon className={clsx('w-6 h-6')} />
                  View your profile
                </Link>
              </li>
              <li>
                <button
                  className={clsx({
                    'loading': isLoading,
                  })}
                  onClick={(e) => {
                    e.stopPropagation();
                    logout();
                    setShow(false);
                  }}
                >
                  <svg
                    className={clsx('w-6 h-6')}
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zM7 11V8l-5 4 5 4v-3h8v-2H7z"></path>
                    </g>
                  </svg>
                  Logout
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <ul>
        <li>
          {!user ? (
            // TODOs fix sidebar when logout

            <NavLink className={clsx({ 'w-[56px]': toggle })} to="/auth/login">
              <svg
                className={clsx('w-6 h-6')}
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M10 11H2.05C2.55 5.947 6.814 2 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10c-5.185 0-9.449-3.947-9.95-9H10v3l5-4-5-4v3z"></path>
                </g>
              </svg>
              {!toggle && 'Login'}
            </NavLink>
          ) : (
            <div
              className={clsx(
                'avatar placeholder transition-all justify-center',
                {
                  'bg-primary': profileRoute,
                },
                {
                  '-ml-4': toggle,
                  'w-[88px]': toggle,
                }
              )}
            >
              {user.photoURL ? (
                <div
                  className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                  onClick={() => {
                    // prompt('dasdas');
                    errorToast('3231');
                  }}
                >
                  <img src={user.photoURL} alt={user.displayName} />
                </div>
              ) : (
                <div>
                  <span className="text-xl">
                    {user.displayName.slice(0, 1)}
                  </span>
                </div>
              )}
              {!toggle && (
                <div
                  className={clsx(
                    'max-w-[135px]',
                    '!aspect-[unset] !flex justify-center !items-start flex-col'
                  )}
                >
                  <h3 className={clsx('font-bold')}>{user.displayName}</h3>
                  <p className={clsx('text-xs line-clamp-1')}>{user.email}</p>
                </div>
              )}
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export const LeftSidebar = ({
  toggle,
  onToggle,
}: {
  toggle: boolean;
  onToggle: () => void;
}) => {
  const { user } = useAuthSelector();
  const { errorToast } = useToast();
  const handleToggleSidebar = () => {
    onToggle();
  };
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div
      className={clsx(
        'flex flex-col min-h-screen overflow-hidden h-max',
        'sticky  top-0 left-0',
        'bg-base-300',
        'transition-all',
        {
          'w-64': !toggle,
          'w-[88px]': toggle,
        }
      )}
    >
      <ul className="menu p-4 overflow-y-auto w-64 text-base-content pb-0">
        <button
          onClick={handleToggleSidebar}
          className={clsx(
            'w-14 flex justify-center px-4 py-3 rounded-lg transition-colors',
            'hover:bg-base-content/10',
            'focus:bg-base-content/10',
            'active:bg-primary'
          )}
        >
          <Bars3Icon className={clsx('w-6 h-6')} />
        </button>
        <li className={clsx('flex-row max-w-none prose prose-sm')}>
          <Link
            to={'/'}
            className={clsx(
              'font-extrabold no-underline',
              'text-[inherit] bg-[unset]',
              'active:bg-[unset]',
              {
                'w-14': toggle,
              }
            )}
          >
            <h1
              className={clsx(
                'pointer-events-none',
                'prose text-4xl gap-0 m-0 p-0 flex-1 justify-center',
                'text-primary '
              )}
            >
              <span>E</span>
              {!toggle && (
                <span className={clsx('text-base-content')}>movie</span>
              )}
            </h1>
          </Link>

          {!toggle && <SwitchThemeButton />}
        </li>
      </ul>

      {pathname !== '/search' && (
        <SearchBar
          onSearch={(query) => {
            navigate(`/search?query=${encodeURIComponent(query)}`);
          }}
          handleToggleSidebar={handleToggleSidebar}
          toggle={toggle}
        />
      )}

      <div
        className={clsx('divider px-4 my-0', {
          'after:bg-transparent before:bg-transparent': !toggle,
        })}
      />

      <ul className="menu p-4 overflow-y-auto w-64 text-base-content py-0">
        {navigation.map((item, idx) => (
          <li key={idx}>
            <NavLink to={item.to} className={clsx({ 'w-[56px]': toggle })}>
              <item.icon className={clsx('w-6 h-6')} />
              {!toggle && <span>{item.name}</span>}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="divider px-4 my-0" />
      <ul className="menu p-4 overflow-y-auto w-64 text-base-content py-0">
        {personalNavigation.map((item, idx) => {
          if (!user)
            return (
              <li
                key={idx}
                onClick={() => {
                  errorToast('Please Login to view this page');
                }}
              >
                <button className={clsx({ 'w-[56px]': toggle })}>
                  <item.icon className={clsx('w-6 h-6')} />
                  {!toggle && <span>{item.name}</span>}
                </button>
              </li>
            );
          return (
            <li key={idx}>
              <NavLink to={item.to} className={clsx({ 'w-[56px]': toggle })}>
                <item.icon className={clsx('w-6 h-6')} />
                {!toggle && <span>{item.name}</span>}
              </NavLink>
            </li>
          );
        })}
      </ul>
      <AccountButton onToggle={onToggle} toggle={toggle} />
    </div>
  );
};
