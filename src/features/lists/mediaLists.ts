// const watch_region = 'US'
// const with_watch_providers = '8,9';
// const with_original_language= 'en'

export const mediaLists = {
  relatedList: {
    recommendations: {
      title: 'recommendations',
      url: (mediaId: string, mediaType: 'tv' | 'movie') =>
        `/${mediaType}/${mediaId}/recommendations`,
    },
    similar: {
      title: 'Similar',
      url: (mediaId: string, mediaType: 'tv' | 'movie') =>
        `/${mediaType}/${mediaId}/similar`,
    },
  },
  publicList: {
    trendingMovies: {
      title: 'Most popular movies right now',
      url: '/trending/movie/day',
    },
    trendingTv: {
      title: 'Most popular movies right now',
      url: '/trending/tv/day',
    },
    discoverMovies: {
      title: 'Discovery',
      url: '/discover/movie',
    },
    discoverTv: {
      title: 'Discovery',
      url: '/discover/tv',
    },
    airingTodayTv: {
      title: 'Airing today',
      url: '/tv/airing_today',
    },
    onTheAirTv: {
      title: 'On the air',
      url: '/tv/on_the_air',
    },
    popularTv: {
      title: 'Popular TV shows',
      url: '/tv/popular',
    },
    topRatedTv: {
      title: 'Top rated TV shows',
      url: '/tv/top_rated',
    },
    mayLikeTv: {
      title: 'You may like',
      url: `/trending/tv/week?page=6`,
    },
    nowPlayingMovies: {
      title: 'Movies in Theaters',
      url: `/movie/now_playing`,
    },
    mayLikeMovies: {
      title: 'You may like',
      url: `/trending/movie/week?page=6`,
    },
    popularMovies: {
      title: 'Popular movies',
      url: '/movie/popular',
    },
    topRatedMovies: {
      title: 'Top rated movies',
      url: '/movie/top_rated',
    },
    upcomingMovies: {
      title: 'Upcoming movies',
      url: '/movie/upcoming',
    },
  },
  privateList: {
    favorite: {
      title: 'created lists',
      url: (accountId: string) => `/account/${accountId}/favorite/movies`,
    },
  },
};
