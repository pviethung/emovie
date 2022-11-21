import { axiosInstance } from '@/services/tmdb';
import { useAppDispatch } from '@/store/hooks';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { updateSearchHistory, useFilterSelector } from '../filterSlice';
import { FilterState } from '../types';

export const SearchBar = ({
  currentSeachType,
  initialValue,
  toggle: toggleSidebar,
  handleToggleSidebar,
  onSearch,
}: {
  initialValue?: string;
  currentSeachType?: FilterState['searchType'];
  toggle: boolean;
  handleToggleSidebar: () => void;
  onSearch: (query: string) => void;
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const [toggleSearchbar, setToggle] = useState(false);
  const [input, setInput] = useState<string>(initialValue ? initialValue : '');
  const [keyword, setKeyword] = useState(input);
  const [touching, setTouching] = useState(false);
  const [currentFocusKey, setCurrentFocusKey] = useState(-1);

  const { searchHistory } = useFilterSelector();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { data: results } = useQuery({
    queryKey: ['search/keyword', keyword],
    queryFn: async ({ queryKey }) => {
      const res = await axiosInstance({
        url: queryKey[0],
        params: {
          query: queryKey[1],
        },
      });
      return res.data.results as any[];
    },
    keepPreviousData: true,
    enabled: !!keyword,
  });
  const [keywords, setKeywords] = useState(results);

  console.log('render');

  useEffect(() => {
    // handle events
    const escapeHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setTouching(false);
      }
    };
    const clickOutsideHandler = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest('#search-bar') || target.closest('#show-search-bar')) {
        setTouching(true);
      } else {
        setTouching(false);
      }
    };

    document.addEventListener('click', clickOutsideHandler);
    document.addEventListener('keydown', escapeHandler);

    return () => {
      document.removeEventListener('click', clickOutsideHandler);
      document.removeEventListener('keydown', escapeHandler);
    };
  }, []);

  useEffect(() => {
    setCurrentFocusKey(-1);
  }, [keywords]);

  useEffect(() => {
    if (!keywords || keywords.length === 0) return;
    if (currentFocusKey > -1 && ref.current && keywords[currentFocusKey]) {
      ref.current.value = keywords[currentFocusKey].name;
    }

    const suggestionSize = keywords.length > 8 ? 8 : keywords.length;
    const keyBoardDirectionHandler = (e: KeyboardEvent) => {
      if (!['ArrowDown', 'ArrowUp'].includes(e.key)) return;
      e.preventDefault();

      if (e.key === 'ArrowDown') {
        if (currentFocusKey === suggestionSize - 1) {
          setCurrentFocusKey(-1);
          return;
        }
        setCurrentFocusKey((prev) => prev + 1);
      }
      if (e.key === 'ArrowUp') {
        if (currentFocusKey === -1) {
          setCurrentFocusKey(suggestionSize - 1);
          return;
        }
        setCurrentFocusKey((prev) => prev - 1);
      }
    };
    document.addEventListener('keydown', keyBoardDirectionHandler);

    return () => {
      document.removeEventListener('keydown', keyBoardDirectionHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFocusKey, keywords]);

  useEffect(() => {
    //sync with api response
    setKeywords(results);
  }, [results]);

  useEffect(() => {
    //ensure data sync when reusing old keywords
    if (keyword.trim() !== '' && results) {
      setKeywords(results);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  useEffect(() => {
    // show fallback if has no input
    if (input === '') {
      setKeywords(searchHistory);
    }

    // debounce input
    const timeoutId = setTimeout(() => {
      setKeyword(input);
    }, 500);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  useEffect(() => {
    // for ui
    if (!toggleSidebar && toggleSearchbar) {
      ref.current?.focus();
    } else {
      setToggle(false);
    }
  }, [toggleSidebar, toggleSearchbar]);

  useEffect(() => {
    // keep focus current search input when redirect to /search
    if (location.pathname === '/search') {
      ref.current?.focus();
      setTouching(false);
    }
  }, [location]);

  useEffect(() => {
    // set initial value if any
    if (initialValue) setInput(initialValue);
  }, [initialValue]);

  return (
    <div className="p-4 relative text-base-content py-0 h-[60px]">
      {toggleSidebar && (
        <button
          id="show-search-bar"
          onClick={() => {
            handleToggleSidebar();
            setToggle(true);
          }}
          className={clsx(
            'w-14 flex justify-center px-4 py-3 rounded-lg hover:bg-base-content/10 focus:bg-base-content/10 active:bg-primary absolute top-3 left-4 transition-all',
            { 'pointer-events-none': !toggleSidebar }
          )}
        >
          <MagnifyingGlassIcon className={clsx('w-6 h-6')} />
        </button>
      )}
      <form
        id="search-bar"
        onSubmit={(e) => {
          e.preventDefault();
          setTouching(false);
          const query =
            keywords && keywords[currentFocusKey]
              ? keywords[currentFocusKey].name
              : input;

          dispatch(updateSearchHistory(query));
          setInput(query);
          onSearch(query);
        }}
        className={clsx('pt-3', { 'hidden': toggleSidebar })}
      >
        <input
          onChange={(e) => {
            setInput(e.target.value);
            setTouching(true);
          }}
          onFocus={() => {
            setTouching(true);
          }}
          ref={ref}
          value={input}
          type="text"
          placeholder="Search..."
          className={clsx(
            'input input-bordered w-full transition-all pr-10 bg-base-300',
            {
              'rounded-b-none': touching && input.trim() !== '',
            }
          )}
        />
        {!!input && (
          <XMarkIcon
            onClick={() => {
              setInput('');
              setKeyword('');
              ref.current?.focus();
              // setToggle(true);
            }}
            className={clsx('w-6 h-6 absolute right-8 top-6 cursor-pointer')}
          />
        )}
      </form>
      {touching && (
        <div className="overflow-hidden">
          {!!keywords?.length && (
            <AnimatePresence>
              <ul
                className={clsx(
                  'bg-base-100',
                  'relative z-10',
                  'search-results overflow-hidden py-4 mt-2 rounded-b-lg'
                )}
              >
                {keywords?.slice(0, 8).map((k, idx) => (
                  <motion.li layout key={k.id}>
                    <button
                      onClick={() => {
                        setTouching(false);
                        dispatch(updateSearchHistory(k.name));
                        onSearch(k.name);
                      }}
                      className={clsx(
                        'flex gap-4 cursor-pointer py-2 px-4 w-full text-left',
                        'hover:bg-base-300',
                        { 'bg-base-300': currentFocusKey === idx }
                      )}
                    >
                      <MagnifyingGlassIcon className={clsx('w-6 h-6')} />
                      <span className={clsx('line-clamp-1 flex-1')}>
                        {k.name}
                      </span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </AnimatePresence>
          )}
        </div>
      )}
    </div>
  );
};
