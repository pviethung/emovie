export const formatRuntime = (runtime: number) =>
  `${(runtime / 60) ^ 0}h ${runtime % 60}m`;
