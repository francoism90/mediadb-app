import { SessionState } from 'src/interfaces/store';
import { User } from 'src/interfaces/user';

function state(): SessionState {
  return {
    redirectPath: null,
    drawer: false,
    timestamp: null,
    token: null,
    user: <User>{},
  };
}

export default state;
