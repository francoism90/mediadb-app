export interface MediaProperties {
  'codec_name'?: string,
  'display_aspect_ratio'?: string,
  'probe_score'?: number,
  'start_time'?: string,
  bitrate?: number,
  duration?: number,
  height?: number,
  width?: number,
}

export interface MediaModel {
  id: string,
  name: string,
  slug?: string,
  description?: string,
  'mime_type': string,
  properties?: MediaProperties,
  size?: number,
  type: string,
}
