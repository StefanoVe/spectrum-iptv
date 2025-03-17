export interface IXtremeCodesConfig {
  baseUrl: string;
  auth: {
    username: string;
    password: string;
  };
}

export interface IXtremeCodesUserResponse {
  user: Record<string, unknown>;
  user_info: { status: string; auth: number };
  info: string;
}

export interface IXtreamCodesShow {
  num: number;
  name: string;
  series_id: number;
  cover: string;
  plot: string;
  cast: string;
  director: string;
  genre: string;
  releaseDate: string;
  last_modified: string;
  rating: number;
  rating_5based: string;
  backdrop_path: string[];
  youtube_trailer: string;
  tmdb: string;
  episode_run_time: string;
  category_id: string;
  category_ids: number[];
}
export interface IXtreamCodesMovie {
  num: number;
  name: string;
  stream_type: string;
  stream_id: number;
  stream_icon: string;
  rating: number;
  rating_5based: number;
  tmdb: string;
  trailer: string;
  added: string;
  is_adult: number;
  category_id: string;
  category_ids: number[];
  container_extension: string;
  custom_sid: null;
  direct_source: string;
}

export type XtreamCatalog = (IXtreamCodesShow & IXtreamCodesMovie)[];
