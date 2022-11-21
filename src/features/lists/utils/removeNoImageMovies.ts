export const removeNoImageMovies = (list: any) => {
  return list.filter(
    (list: any) => list.poster_path !== null && list.backdrop_path !== null
  );
};
