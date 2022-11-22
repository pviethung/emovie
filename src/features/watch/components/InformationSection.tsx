import { MediaGenreTag, PeopleCard, Scrollable } from '@/components/Elements';
import { useAuthSelector } from '@/features/auth';
import { getList, ToggleMediaInList } from '@/features/lists';

import { useToast } from '@/hooks/useToast';
import { MovieDetail, TMDB_IMAGE_URL, TvDetail } from '@/services/tmdb';
import { formatMoney } from '@/utils/formatMoney';
import { formatRuntime } from '@/utils/formatRuntime';
import { isMovieDetail } from '@/utils/isMovieDetail';
import {
  BookmarkIcon,
  CalendarDaysIcon,
  ClockIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';
import {
  BookmarkIcon as BookmarkIconSolid,
  HeartIcon as HeartIconSolid,
} from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import LazyLoad from 'react-lazy-load';
import { useLocation, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MediaSuggestion } from './MediaSuggestion';
import { RatingSection } from './RatingSection';

export const InformationSection = ({
  mediaDetail,
}: {
  mediaDetail: MovieDetail | TvDetail;
}) => {
  const { successToast } = useToast();
  const { pathname } = useLocation();
  const pathArr = pathname.split('/');
  const mediaType = pathArr[1] as 'tv' | 'movie';
  const mediaId = pathArr[2];
  const watch = pathArr[3];
  const navigate = useNavigate();

  let title = '';
  let releaseDate = '';
  let endDate = '';
  let runtime = 0;
  let budget = 0;
  let revenue = 0;
  let director: React.ReactNode[] = [];
  let creator: React.ReactNode[] = [];
  let seasons = [] as TvDetail['seasons'];

  if (mediaDetail) {
    const mediaIsMovie = isMovieDetail(mediaDetail);
    title = mediaIsMovie ? mediaDetail.title : mediaDetail.name;
    releaseDate = mediaIsMovie
      ? mediaDetail.release_date
      : mediaDetail.first_air_date;

    runtime = mediaIsMovie
      ? mediaDetail.runtime
      : mediaDetail.episode_run_time[0];
    endDate = !mediaIsMovie ? mediaDetail.last_air_date : endDate;
    seasons = !mediaIsMovie ? mediaDetail.seasons : seasons;

    budget = mediaIsMovie ? mediaDetail.budget : 0;
    revenue = mediaIsMovie ? mediaDetail.revenue : 0;
    creator = !mediaIsMovie
      ? mediaDetail.created_by.map((c) => {
          return (
            <div key={c.id} className={clsx('-mr-4')}>
              <div className={clsx('pr-4 w-40')}>
                <PeopleCard imgSrc={c.profile_path} name={c.name} />
              </div>
            </div>
          );
        })
      : creator;

    mediaDetail.credits.crew.forEach((c) => {
      if (c.job === 'Director') {
        director.push(
          <div key={c.id} className={clsx('-mr-4')}>
            <div className={clsx('pr-4 w-40')}>
              <PeopleCard name={c.name} imgSrc={c.profile_path} />
            </div>
          </div>
        );
      }
    });
  }

  const { user } = useAuthSelector();

  const [mediaInBookmaked, setMediaInBookmarked] = useState(false);
  const [mediaInFavorites, setMediaInFavorites] = useState(false);

  useEffect(() => {
    if (user) {
      getList(mediaType, user.uid, 'bookmarked').then((res) => {
        setMediaInBookmarked(res.includes(+mediaId));
      });
      getList(mediaType, user.uid, 'favorites').then((res) => {
        setMediaInFavorites(res.includes(+mediaId));
      });
    }
  }, [user, mediaType, mediaId]);

  return (
    <div
      className={clsx(
        'relative bg-base-100 min-h-screen flex p-4 pt-8 items-start'
      )}
    >
      <div className={clsx('space-y-6 max-w-none w-4/6')}>
        <div className={clsx('flex items-start mb-10 pr-4')}>
          <h1 className={clsx('text-5xl  font-bold')}>{title}</h1>
          <div className={clsx('flex ml-auto gap-2')}>
            <ToggleMediaInList
              onToggleSuccess={(state) => {
                setMediaInFavorites((prev) => !prev);
                successToast(
                  <>
                    <span className={clsx('font-bold')}>{title}</span> has been{' '}
                    {`${state} ${state === 'added' ? 'to' : 'from'}`} your{' '}
                    <span className={clsx('font-bold capitalize')}>
                      favorite
                    </span>{' '}
                    list
                  </>
                );
              }}
              listTitle={'favorites'}
              mediaType={mediaType as 'tv' | 'movie'}
              mediaId={mediaDetail.id}
            >
              <button
                className={clsx(
                  'group absolute',
                  'border-none',
                  'hover:bg-transparent hover:text-primary',
                  {
                    'text-base-content': !mediaInFavorites,
                    'text-primary': mediaInFavorites,
                  }
                )}
              >
                {!mediaInFavorites && (
                  <HeartIcon
                    className={clsx('w-7 h-7', 'group-hover:hidden')}
                  />
                )}
                <HeartIconSolid
                  className={clsx('w-7 h-7', 'group-hover:block', {
                    'hidden': !mediaInFavorites,
                  })}
                />
              </button>
            </ToggleMediaInList>

            <ToggleMediaInList
              onToggleSuccess={(state) => {
                setMediaInBookmarked((prev) => !prev);
                successToast(
                  <>
                    <span className={clsx('font-bold')}>{title}</span> has been{' '}
                    {`${state} ${state === 'added' ? 'to' : 'from'}`} your{' '}
                    <span className={clsx('font-bold capitalize')}>
                      bookmarked
                    </span>{' '}
                    list
                  </>
                );
              }}
              listTitle={'bookmarked'}
              mediaType={mediaType as 'tv' | 'movie'}
              mediaId={mediaDetail.id}
            >
              <button
                className={clsx(
                  'group absolute',
                  'border-none',
                  'hover:bg-transparent hover:text-primary',
                  {
                    'text-base-content': !mediaInBookmaked,
                    'text-primary': mediaInBookmaked,
                  }
                )}
              >
                {!mediaInBookmaked && (
                  <BookmarkIcon
                    className={clsx('w-7 h-7', 'group-hover:hidden')}
                  />
                )}
                <BookmarkIconSolid
                  className={clsx('w-7 h-7', 'group-hover:block', {
                    'hidden': !mediaInBookmaked,
                  })}
                />
              </button>
            </ToggleMediaInList>
          </div>
        </div>
        <div className={clsx('flex gap-4 flex-wrap')}>
          {mediaDetail.genres.map((genre) => (
            <MediaGenreTag key={genre.id} genre={genre.name} />
          ))}
        </div>
        <div className={clsx('flex items-center gap-6 flex-wrap')}>
          <div className={clsx('flex gap-2 items-center')}>
            <div
              className={clsx('radial-progress text-primary')}
              style={{
                /* @ts-ignore */
                '--value': mediaDetail.vote_average.toFixed(1) * 10,
                '--size': '3rem',
              }}
            >
              <span className={clsx('text-base-content text-sm')}>
                {mediaDetail.vote_average.toFixed(1)}
              </span>
            </div>
            <img
              className={clsx('w-10 h-10 m-0')}
              src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
              alt="imdb"
            />
          </div>
          {!!releaseDate && (
            <div className={clsx('flex gap-2 items-center')}>
              <CalendarDaysIcon className={clsx('w-6 h-6')} />
              <span>{releaseDate}</span>
              {endDate ? <span>- {endDate}</span> : null}
            </div>
          )}

          {runtime > 0 ? (
            <div className={clsx('flex gap-2 items-center')}>
              <ClockIcon className={clsx('w-6 h-6')} />
              <span>
                {runtime > 60 ? formatRuntime(runtime) : runtime + 'm'}
                {!isMovieDetail(mediaDetail) && ' / Episode'}
              </span>
            </div>
          ) : null}
        </div>
        <div>
          <span className={clsx('italic')}>{mediaDetail.tagline}</span>
        </div>

        {mediaDetail.overview && (
          <div className={clsx('pr-4')}>
            <h3 className={clsx('mb-2 font-bold text-xl')}>Overview</h3>
            <span>{mediaDetail.overview}</span>
          </div>
        )}

        {director.length > 0 || creator.length > 0 ? (
          <div>
            <h3 className={clsx('mb-2 font-bold text-xl')}>
              {director.length > 0 ? 'Director' : 'Creator'}
            </h3>
            <div className={clsx('flex flex-wrap gap-4')}>
              {director.length > 0 ? director : creator}
            </div>
          </div>
        ) : (
          <div>
            <h3 className={clsx('mb-2 font-bold text-xl')}>
              {mediaType === 'movie' ? 'Director' : 'Creator'}
            </h3>
            <div className={clsx('flex flex-wrap gap-6')}>
              <div className={clsx('-mr-4')}>
                <div className={clsx('pr-4 w-40')}>
                  <PeopleCard name={'Unknown'} />
                </div>
              </div>
            </div>
          </div>
        )}

        {mediaDetail.credits.cast.length > 0 && (
          <div className={clsx('w-full overflow-hidden')}>
            <h3 className={clsx('mt-2 font-bold text-xl')}>Top Billed Cast</h3>
            <Swiper
              slidesPerView={'auto'}
              spaceBetween={0}
              className={clsx('pb-10 mt-4')}
            >
              {mediaDetail.credits.cast.map((c) => {
                return (
                  <SwiperSlide className="w-auto" key={c.id}>
                    <div className={clsx('pr-4 w-40')}>
                      <PeopleCard
                        name={c.name}
                        imgSrc={c.profile_path}
                        character={c.character}
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        )}

        <RatingSection mediaDetail={mediaDetail} />
      </div>

      <div className="divider divider-horizontal mx-0 w-0" />

      <div className={clsx('flex-1 pl-4')}>
        {/* TODO move to detail */}
        {watch ? (
          <MediaSuggestion mediaDetail={mediaDetail} />
        ) : (
          <>
            <div className={clsx('relative')}>
              <LazyLoad className="z-10">
                <img
                  src={
                    mediaDetail.poster_path
                      ? `${TMDB_IMAGE_URL}w780${mediaDetail.poster_path}`
                      : `https://dummyimage.com/780x1170/dddddd/000000.jpg&text=X`
                  }
                  alt={title}
                />
              </LazyLoad>

              <div
                className={clsx(
                  'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                )}
              >
                <button
                  onClick={() => {
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth',
                    });
                    setTimeout(() => {
                      navigate('../watch');
                    }, 500);
                  }}
                  className={clsx('btn btn-circle w-20 h-20 btn-primary', {
                    'hidden': false,
                  })}
                >
                  <svg
                    className={clsx('w-12 h-12')}
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
                  </svg>
                </button>
              </div>
            </div>

            <div className="divider"></div>

            <div className={clsx('space-y-4 mt-4')}>
              {mediaDetail.status ? (
                <div>
                  <h3 className={clsx('font-bold text-xl')}>Status</h3>
                  <p>{mediaDetail.status}</p>
                </div>
              ) : null}

              {mediaDetail.spoken_languages.length > 0 ? (
                <div>
                  <h3 className={clsx('font-bold text-xl')}>Spoken Language</h3>
                  <div className={clsx('flex flex-wrap space-x-2')}>
                    {mediaDetail.spoken_languages.map((l) => (
                      <p key={l.name}>{l.english_name}</p>
                    ))}
                  </div>
                </div>
              ) : null}

              {seasons.length > 0 ? (
                <div>
                  <h3 className={clsx('font-bold text-xl mb-2')}>Seasons</h3>
                  <Scrollable
                    className={clsx('space-y-2 h-[432px] overflow-y-auto')}
                  >
                    {seasons
                      .filter((s) => s.episode_count > 0)
                      .map((s) => (
                        <div key={s.id} className={clsx('flex gap-2')}>
                          <LazyLoad
                            className={clsx('w-24 rounded-md overflow-hidden')}
                          >
                            <figure>
                              <img
                                className={clsx('w-24 h-36 bg-[#ddd]')}
                                src={
                                  s.poster_path
                                    ? `${TMDB_IMAGE_URL}w780${s.poster_path}`
                                    : `https://ui-avatars.com/api/?size=64&name=x`
                                }
                                alt={s.name}
                              />
                            </figure>
                          </LazyLoad>
                          <div className={clsx('flex-1 pr-4')}>
                            <p className={clsx('font-bold')}>{s.name}</p>
                            <p className={clsx('font-semibold')}>
                              {s.air_date?.split('-')[0]} |{' '}
                              {s.episode_count + ' Episodes'}
                            </p>
                            <p className={clsx('line-clamp-3 mt-2')}>
                              {s.overview}
                            </p>
                          </div>
                        </div>
                      ))}
                  </Scrollable>
                </div>
              ) : null}
              {budget ? (
                <div>
                  <h3 className={clsx('font-bold text-xl')}>Budget</h3>
                  <p>{formatMoney(budget)}</p>
                </div>
              ) : null}
              {revenue ? (
                <div>
                  <h3 className={clsx('font-bold text-xl')}>Revenue</h3>
                  <p>{formatMoney(revenue)}</p>
                </div>
              ) : null}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
