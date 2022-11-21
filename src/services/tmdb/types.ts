interface Videos {
  results: {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    official: boolean;
    published_at: string;
    site: string;
    size: number;
    type: string;
  }[];
}
export interface Credits {
  cast: {
    adult: boolean;
    gender: number;
    id: number;
    cast_id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    character: string;
    credit_id: string;
    order: number;
  }[];
  crew: {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    credit_id: string;
    department: string;
    job: string;
  }[];
  id: number;
}

export interface Movie {
  poster_path: string;
  overview: string;
  adult: boolean;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

export interface MovieDetail extends Omit<Movie, 'genre_ids'> {
  belongs_to_collection: {
    backdrop_path: string;
    id: number;
    name: string;
    poster_path: string;
  };
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  imdb_id: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  videos: Videos;
  recommendations: {
    page: number;
    results: (Movie & { media_type: string })[];
    total_pages: number;
    total_results: number;
  };
  similar: {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  };
  credits: Omit<Credits, 'id'>;
  reviews: {
    page: number;
    results: {
      author: string;
      author_details: {
        avatar_path: string;
        name: string;
        rating: number;
        username: string;
      };
      content: string;
      created_at: string;
      id: string;
      updated_at: string;
      url: string;
    }[];
    total_pages: number;
    total_results: number;
  };
}

export interface Tv {
  poster_path: string;
  popularity: number;
  id: number;
  backdrop_path: string;
  vote_average: number;
  overview: string;
  first_air_date: string;
  origin_country: string;
  genre_ids: number[];
  original_language: string;
  vote_count: number;
  name: string;
  original_name: string;
}
export interface TvDetail extends Omit<Tv, 'genre_ids'> {
  adult: boolean;
  created_by: {
    id: number;
    gender: number;
    credit_id: string;
    name: string;
    profile_path: string;
  }[];
  episode_run_time: number[];
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
  };
  networks: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  next_episode_to_air: {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
  };
  number_of_episodes: number;
  number_of_seasons: number;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
  }[];
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  type: string;
  videos: Videos;
  recommendations: {
    page: number;
    results: (Tv & { adult: boolean; media_type: string })[];
    total_pages: number;
    total_results: number;
  };
  similar: {
    page: number;
    results: Tv[];
    total_pages: number;
    total_results: number;
  };
  credits: Omit<Credits, 'id'>;
  reviews: {
    page: number;
    results: {
      author: string;
      author_details: {
        avatar_path: string;
        name: string;
        rating: number;
        username: string;
      };
      content: string;
      created_at: string;
      id: string;
      updated_at: string;
      url: string;
    }[];
    total_pages: number;
    total_results: number;
  };
}
