import { Model, RepositoryLinks, RepositoryMeta } from 'src/interfaces';

export interface TagModel extends Model {
  id: string,
  slug: string,
  name: string,
  type: string,
  items?: number,
}

export interface TagsFilters {
  query?: string | null,
  size?: number | null,
  sort?: string | null,
  type?: string | null,
}

export interface TagsState {
  id: number | string | null,
  data: TagModel[],
  meta: RepositoryMeta | undefined,
  links: RepositoryLinks | undefined,
  error: unknown | undefined,
  filters: TagsFilters | undefined,
}

export interface TagsResponse {
  data: TagModel[],
  meta: RepositoryMeta | undefined,
  links: RepositoryLinks | undefined,
}
