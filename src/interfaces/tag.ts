import { Model, RepositoryParams, RepositoryResponse } from 'src/interfaces';

export interface TagsParams extends RepositoryParams {
  type?: string | string[] | null,
}

export interface TagsState extends RepositoryResponse {
  id: string | number | null,
  params: TagsParams,
}

export interface TagModel extends Model {
  type: string,
  items?: number,
}
