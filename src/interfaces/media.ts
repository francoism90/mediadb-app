import { Model, ModelResponse } from './repository'

export interface Media extends Model {
  duration?: number | null,
  kind?: string | null,
  locale?: string | null,
  size?: number | null,
  width?: number | null,
  height?: number | null,
  resolution?: string | null,
  'mime_type'?: string | null,
  'thumbnail_url'?: string | null,
}

export interface MediaResponse extends ModelResponse {
  data: Media,
  meta: null
}
