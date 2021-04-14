import { RepositoryParameters } from 'src/interfaces/repository'
import { RepositoryState } from 'src/interfaces/store'

function state (): RepositoryState {
  return {
    ready: false,
    id: '',
    params: <RepositoryParameters>{},
    data: [],
    meta: {},
    lastFetch: null
  }
}

export default state
