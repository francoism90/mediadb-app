import {
  Model, RepositoryLinks, RepositoryMeta, RepositoryQuery,
} from 'src/interfaces/repository';

export type TagsMeta = RepositoryMeta
export type TagsLinks = RepositoryLinks

export interface TagModel extends Model {
  overview: string | null,
  type: string | null,
  items: number | null,
  views: number | null,
}

export interface TagResponse {
  data: TagModel,
  meta: null,
}

export interface TagsFilters {
  id?: string[] | null,
  type?: string | null,
  query?: string | null
}

export interface TagsQuery extends RepositoryQuery {
  filter?: TagsFilters
}

export interface TagsState {
  id: string | number | null,
  query: TagsQuery,
  data: TagModel[],
  meta: TagsMeta,
  links: TagsLinks,
}

export interface TagsResponse {
  data: TagModel[],
  meta: TagsMeta,
  links: TagsLinks
}
