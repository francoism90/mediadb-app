export interface RepositoryMeta {
  'current_page': number,
  'last_page': number,
  'per_page': number,
  from: number,
  path: string,
  to: number,
  total: number,
}

export interface RepositoryOption {
  [key: string]: string | number | null
}

export interface RepositoryParams {
  include?: string | null,
  fields?: string | null,
  append?: string | null,
  sort?: string | number | null,
  page?: number,
  limit?: number,
}

export interface RepositoryVideosParams extends RepositoryParams {
  query?: string | number | null
}
