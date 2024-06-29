export interface tmdb_item {
  id: number;
  poster_path: string;
  backdrop_path: string;
  overview: string;

  name?: string;
  title?: string;

  release_date?: string;
  last_air_date?: string;
}
export interface ITmdb_movie {
  id: number;
  title: string;
  adult: boolean;
  backdrop_path: string;
  budget: number;
  homepage: string;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
export interface ITmdb_tv {
  adult: boolean;
  backdrop_path: string;
  first_air_date: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  name: string;
  number_of_episodes: number;
  number_of_seasons: number;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  seasons: ITmdb_tv_season[];
  status: string;
  tagline: string;
  type: string;
}
export interface ITmdb_tv_season {
  air_date: string | null;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: 0;
}

export interface ITmdb_tv_season_episode {
  _id: string;
  air_date: string | null;
  episodes: {
    air_date: string | null;
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
  }[];
}

export interface ITmdb_dienvien {
  id: number;
  cast: {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    cast_id: number;
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
}
export interface ITmdb_tuongtu {
  page: number;
  results: {
    adult: boolean;
    backdrop_path: string;
    id: number;
    title: string;
    original_language: string;
    original_title: string;
    overview: string;
    poster_path: string;
    media_type: string;
    genre_ids: number[];
    popularity: number;
    release_date: string;
    video: false;
    vote_average: number;
    vote_count: number;
  }[];
}
export type TTypeGetMovieTV = 'movie' | 'tv';

export interface ImagesTMDB {
  base_url: string;
  secure_base_url: string;
  backdrop_sizes: string[];
  logo_sizes: string[];
  poster_sizes: string[];
  profile_sizes: string[];
  still_sizes: string[];
}
