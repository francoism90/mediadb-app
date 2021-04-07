export interface PaginateFilter {
  [key: string]: string | number | null
}
export interface PaginateMeta {
  'current_page': number,
  'last_page': number,
  'per_page': number,
  from: number,
  path: string,
  to: number,
  total: number,
}
