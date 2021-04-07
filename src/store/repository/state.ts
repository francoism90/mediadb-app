import { RepositoryState } from 'src/interfaces/store'

function state (): RepositoryState {
  return {
    id: null,
    ready: false,
    data: null,
    meta: null
  }
}

export default state
