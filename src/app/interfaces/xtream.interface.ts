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

export type XtreamCatalog = (IXtreamCodesShow &
  IXtreamCodesMovie & { type: 'show' | 'movie' })[];

export interface IXtreamVODInfoResponse {
  info: Info;
  movie_data?: Movie_data;
  episodes?: Episodes;
}
interface Info {
  tmdb_id: string;
  name: string;
  o_name: string;
  cover_big: string;
  movie_image: string;
  releasedate: string;
  youtube_trailer: string;
  director: string;
  actors: string;
  cast: string;
  description: string;
  plot: string;
  age: string;
  country: string;
  genre: string;
  backdrop_path: string[];
  duration_secs: number;
  duration: string;
  video: Video;
  audio: Audio;
  bitrate: number;
  rating: string;
  status: string;
}
interface Video {
  index: number;
  codec_name: string;
  codec_long_name: string;
  profile: string;
  codec_type: string;
  codec_tag_string: string;
  codec_tag: string;
  width: number;
  height: number;
  coded_width: number;
  coded_height: number;
  closed_captions: number;
  film_grain: number;
  has_b_frames: number;
  sample_aspect_ratio: string;
  display_aspect_ratio: string;
  pix_fmt: string;
  level: number;
  color_range: string;
  color_space: string;
  color_transfer: string;
  color_primaries: string;
  chroma_location: string;
  field_order: string;
  refs: number;
  is_avc: string;
  nal_length_size: string;
  id: string;
  r_frame_rate: string;
  avg_frame_rate: string;
  time_base: string;
  start_pts: number;
  start_time: string;
  duration_ts: number;
  duration: string;
  bit_rate: string;
  bits_per_raw_sample: string;
  nb_frames: string;
  extradata_size: number;
  disposition: Disposition;
  tags: Tags;
}
interface Disposition {
  default: number;
  dub: number;
  original: number;
  comment: number;
  lyrics: number;
  karaoke: number;
  forced: number;
  hearing_impaired: number;
  visual_impaired: number;
  clean_effects: number;
  attached_pic: number;
  timed_thumbnails: number;
  captions: number;
  descriptions: number;
  metadata: number;
  dependent: number;
  still_image: number;
}
interface Tags {
  language: string;
  handler_name: string;
  vendor_id: string;
}
interface Audio {
  index: number;
  codec_name: string;
  codec_long_name: string;
  profile: string;
  codec_type: string;
  codec_tag_string: string;
  codec_tag: string;
  sample_fmt: string;
  sample_rate: string;
  channels: number;
  channel_layout: string;
  bits_per_sample: number;
  id: string;
  r_frame_rate: string;
  avg_frame_rate: string;
  time_base: string;
  start_pts: number;
  start_time: string;
  duration_ts: number;
  duration: string;
  bit_rate: string;
  nb_frames: string;
  extradata_size: number;
  disposition: Disposition;
  tags: Tags;
}
interface Movie_data {
  stream_id: number;
  name: string;
  added: string;
  category_id: string;
  category_ids: number[];
  container_extension: string;
  custom_sid: null;
  direct_source: string;
}

interface SeasonsItem {
  name: string;
  episode_count: string;
  overview: string;
  air_date: string;
  cover: string;
  cover_tmdb: string;
  season_number: number;
  cover_big: string;
  releaseDate: string;
  duration: string;
}
type Episodes = Episode[];
interface Episode {
  id: string;
  episode_num: number;
  title: string;
  container_extension: string;
  info: Info;
  custom_sid: string;
  added: string;
  season: number;
  direct_source: string;
}
interface _3Item {
  id: string;
  episode_num: number;
  title: string;
  container_extension: string;
  info: Info;
  custom_sid: string;
  added: string;
  season: number;
  direct_source: string;
}
interface _4Item {
  id: string;
  episode_num: number;
  title: string;
  container_extension: string;
  info: Info;
  custom_sid: string;
  added: string;
  season: number;
  direct_source: string;
}
interface _5Item {
  id: string;
  episode_num: number;
  title: string;
  container_extension: string;
  info: Info;
  custom_sid: string;
  added: string;
  season: number;
  direct_source: string;
}
interface _6Item {
  id: string;
  episode_num: number;
  title: string;
  container_extension: string;
  info: Info;
  custom_sid: string;
  added: string;
  season: number;
  direct_source: string;
}
interface _7Item {
  id: string;
  episode_num: number;
  title: string;
  container_extension: string;
  info: Info;
  custom_sid: string;
  added: string;
  season: number;
  direct_source: string;
}
interface _8Item {
  id: string;
  episode_num: number;
  title: string;
  container_extension: string;
  info: Info;
  custom_sid: string;
  added: string;
  season: number;
  direct_source: string;
}
interface _9Item {
  id: string;
  episode_num: number;
  title: string;
  container_extension: string;
  info: Info;
  custom_sid: string;
  added: string;
  season: number;
  direct_source: string;
}
interface _10Item {
  id: string;
  episode_num: number;
  title: string;
  container_extension: string;
  info: Info;
  custom_sid: string | null;
  added: string;
  season: number;
  direct_source: string;
}
interface _11Item {
  id: string;
  episode_num: number;
  title: string;
  container_extension: string;
  info: Info;
  custom_sid: null;
  added: string;
  season: number;
  direct_source: string;
}
interface _12Item {
  id: string;
  episode_num: number;
  title: string;
  container_extension: string;
  info: Info;
  custom_sid: null;
  added: string;
  season: number;
  direct_source: string;
}
