export interface RepositoryFilter {
  [key: string]: string | number | null
}

export interface RepositoryParams {
  where?: RepositoryFilter[],
  page?: number,
  sorter?: string | number | null,
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
