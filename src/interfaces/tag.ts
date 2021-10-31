import { Model, RepositoryQuery, RepositoryResponse } from 'src/interfaces';

export interface TagsState extends RepositoryResponse {
  id: string | number | null,
  query: RepositoryQuery,
}

export interface TagModel extends Model {
  type: string,
  items?: number,
}
