import { echoKey } from 'src/boot/echo';
import { inject } from 'vue';

export const echo = inject(echoKey);
