import { echoKey } from 'src/boot/echo';
import { inject } from 'vue';

export default function useEcho() {
  const echo = inject(echoKey);

  return {
    echo,
  };
}
