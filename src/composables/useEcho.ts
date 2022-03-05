import { echoKey } from 'src/boot/echo';
import { inject } from 'vue';

export const useEcho = () => {
  const echo = inject(echoKey);

  return {
    echo,
  };
};
