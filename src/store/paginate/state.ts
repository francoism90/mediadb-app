import { PaginateState } from 'src/interfaces/store'

function state (): PaginateState {
  return {
    id: null,
    ready: false,
    data: null,
    meta: null
  }
}

export default state
