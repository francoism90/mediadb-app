import { emitteryKey } from 'src/services/emittery';
import { inject } from 'vue';

export default function useEmittery() {
  const emitter = inject(emitteryKey);

  return {
    emitter,
  };
}
