import { Model } from 'src/interfaces/repository';

export interface MediaResolution {
  width: string,
  icon: string | null,
}

export interface MediaModel extends Model {
  id: string,
  'mime_type': string,
  kind: string,
  locale: string | null,
  size: number,
  bitrate?: number | null,
  'codec_name'?: string | null,
  duration?: number | null,
  resolution?: MediaResolution,
  height?: number | null,
  width?: number | null,
  thumbnail?: number,
  'download_url'?: string | null,
}

export interface MediaResponse {
  data: MediaModel,
  meta: null,
}
