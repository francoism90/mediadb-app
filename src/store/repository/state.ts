import { RepositoryParams } from 'src/interfaces/repository';
import { RepositoryState } from 'src/interfaces/store';

function state(): RepositoryState {
  return {
    ready: false,
    id: null,
    params: <RepositoryParams>{},
    data: [],
    meta: {},
  };
}

export default state;
