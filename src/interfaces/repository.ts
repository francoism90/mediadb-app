export interface Model {
  id: string,
  name: string,
  slug?: string,
  description?: string,
  favorite?: boolean,
  following?: boolean,
  'created_at': string,
  'updated_at': string,
}
