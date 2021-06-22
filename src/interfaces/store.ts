import { SessionState } from 'src/interfaces/session';
import { VideosState } from 'src/interfaces/video';

export interface StoreState {
  session: SessionState,
  videos: VideosState,
}
