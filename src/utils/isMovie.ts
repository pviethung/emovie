import { Movie, Tv } from '@/services/tmdb';

export function isMovie(media: Movie | Tv): media is Movie {
  return 'title' in media;
}
