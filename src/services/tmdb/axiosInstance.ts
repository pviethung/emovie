import axios from 'axios';

export const TMDB_IMAGE_URL = 'https://image.tmdb.org/t/p/';
export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const TMDB_API_KEY = import.meta.env.VITE_TMDB_KEY;

export const axiosInstance = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});
