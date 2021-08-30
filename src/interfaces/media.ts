import { Model } from 'src/interfaces/repository';

export interface MediaResolution {
  icon: string,
  label: string,
  width: string,
}

export interface MediaModel extends Model {
  'mime_type': string,
  kind: string,
  bitrate?: number | null,
  duration?: number | null,
  height?: number | null,
  locale?: string | null,
  resolution?: MediaResolution,
  size?: number | null,
  width?: number | null,
}

export interface MediaResponse {
  data: MediaModel,
  meta: null,
}
