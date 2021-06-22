import { SessionState } from 'src/interfaces/session';
import { UserModel } from 'src/interfaces/user';

function state(): SessionState {
  return {
    redirectPath: null,
    timestamp: null,
    token: null,
    user: <UserModel>{},
  };
}

export default state;
