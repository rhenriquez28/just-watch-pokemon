import { env } from "env";

const tmdbFetcher = async <T>(path: string): Promise<T> => {
  const res = await fetch(`https://api.themoviedb.org/3${path}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${env.MOVIE_DB_API_KEY}`,
    },
  });

  return res.json();
};

interface Movie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: Date;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface TvSeries {
  adult: boolean;
  backdrop_path: string;
  created_by: CreatedBy[];
  episode_run_time: number[];
  first_air_date: Date;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: Date;
  last_episode_to_air: LastEpisodeToAir;
  name: string;
  next_episode_to_air: null;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Network[];
  production_countries: ProductionCountry[];
  seasons: Season[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

interface TvSeason {
  _id: string;
  air_date: Date;
  episodes: Episode[];
  name: string;
  overview: string;
  id: number;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

interface Episode {
  air_date: Date;
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
  crew: Crew[];
  guest_stars: Crew[];
}

interface Crew {
  department?: Department;
  job?: Job;
  credit_id: string;
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: Department;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: null | string;
  character?: string;
  order?: number;
}

enum Department {
  Acting = "Acting",
  Camera = "Camera",
  Directing = "Directing",
  Editing = "Editing",
  Production = "Production",
  Writing = "Writing",
}

enum Job {
  Director = "Director",
  DirectorOfPhotography = "Director of Photography",
  Editor = "Editor",
  Story = "Story",
  Teleplay = "Teleplay",
  Writer = "Writer",
}

interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}

interface LastEpisodeToAir {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: Date;
  episode_number: number;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
}

interface Network {
  id: number;
  logo_path: null | string;
  name: string;
  origin_country: string;
}

interface Season {
  air_date: Date;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

interface Genre {
  id: number;
  name: string;
}

interface ProductionCompany {
  id: number;
  logo_path: null | string;
  name: string;
  origin_country: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

interface WatchProviderInfo {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

interface WatchProvidersResponse {
  id: string;
  results: Record<
    string,
    {
      link: string;
      rent?: WatchProviderInfo[];
      flatrate?: WatchProviderInfo[];
      buy?: WatchProviderInfo[];
    }
  >;
}

export const fetchMovieWatchProviders = async (
  movieId: number
): Promise<WatchProvidersResponse> => {
  return tmdbFetcher(`/movie/${movieId}/watch/providers`);
};

export const fetchTVSeasonWatchProviders = async (
  seriesId: number,
  seasonNumber: number
): Promise<WatchProvidersResponse> => {
  return tmdbFetcher(`/tv/${seriesId}/season/${seasonNumber}/watch/providers`);
};

export const fetchMovieDetails = async (movieId: number): Promise<Movie> => {
  return tmdbFetcher(`/movie/${movieId}`);
};

export const fetchTvSeriesDetails = async (
  seriesId: number
): Promise<TvSeries> => {
  return tmdbFetcher(`/tv/${seriesId}`);
};

export const fetchTvSeasonDetails = async (
  seriesId: number,
  seasonNumber: number
): Promise<TvSeason> => {
  return tmdbFetcher(`/tv/${seriesId}/season/${seasonNumber}`);
};
