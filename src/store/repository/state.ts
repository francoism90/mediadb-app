import { RepositoryState } from 'src/interfaces/store'

function state (): RepositoryState {
  return {
    id: null,
    data: null,
    meta: null,
    options: null
  }
}

export default state
