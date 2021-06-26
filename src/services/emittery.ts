import Emittery from 'emittery';
import { PlayerRequest } from 'src/interfaces/player';
import { InjectionKey } from 'vue';

type Events = {
  player?: PlayerRequest;
};

export const emitteryKey: InjectionKey<Emittery<Events>> = Symbol('emittery-key');

export const emittery: Emittery<Events> = new Emittery<Events>();
