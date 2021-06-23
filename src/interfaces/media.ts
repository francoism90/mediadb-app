import { Model } from 'src/interfaces/repository';

export interface MediaModel extends Model {
  id: string,
  duration?: number | null,
  kind?: string | null,
  locale?: string | null,
  size?: number | null,
  width?: number | null,
  height?: number | null,
  resolution?: string | null,
  thumbnail?: number | null,
  'mime_type'?: string | null,
  'stream_url'?: string | null,
  'sprite_url'?: string | null,
  'thumbnail_url'?: string | null,
}

export interface MediaResponse {
  data: MediaModel,
  meta: null,
}
