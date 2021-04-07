export interface RepositoryOption {
  [key: string]: string | number | null
}

export interface RepositoryWhere {
  [key: string]: string | number | null
}

export interface RepositoryParams {
  where?: RepositoryWhere[],
  include?: string | null,
  select?: string | null,
  append?: string | null,
  orderBy?: string | number | null,
  page?: number,
  limit?: number,
}

export interface RepositoryMeta {
  'current_page': number,
  'last_page': number,
  'per_page': number,
  from: number,
  path: string,
  to: number,
  total: number,
}
