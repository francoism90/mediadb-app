import { Model } from 'src/interfaces/repository';

export interface MediaMetadata {
  duration?: number | null
  height?: number | null
  width?: number | null
}

export interface MediaModel extends Model {
  'mime_type': string,
  metadata: MediaMetadata,
}

export interface MediaResponse {
  data: MediaModel,
  meta: null,
}
