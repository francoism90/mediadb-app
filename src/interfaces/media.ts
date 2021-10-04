import { Model } from 'src/interfaces/repository';

export interface MediaProperties {
  'codec_name'?: string | null,
  'display_aspect_ratio'?: string | null,
  'probe_score'?: number | null,
  'start_time'?: string | null,
  bitrate?: number | null,
  duration?: number | null,
  height?: number | null,
  width?: number | null,
}

export interface MediaModel extends Model {
  'mime_type': string,
  properties?: MediaProperties,
  size?: number,
  type: string,
}

export interface MediaResponse {
  data: MediaModel,
  meta: null,
}
