import { MovieDetail, TvDetail } from '@/services/tmdb';

export function isMovieDetail(
  media: MovieDetail | TvDetail
): media is MovieDetail {
  return 'title' in media;
}
