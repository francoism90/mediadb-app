import { AxiosResponse } from 'axios';
import { api } from 'boot/axios';
import { useQuasar } from 'quasar';
import { CsrfCookie } from 'src/interfaces/session';

export async function setCsrfCookie(): Promise<void> {
  const $q = useQuasar();

  // CSRF is only useful on SPA/PWA
  if ($q.platform.is.capacitor || $q.platform.is.cordova) {
    return;
  }

  await api.get<CsrfCookie, AxiosResponse<CsrfCookie>>('sanctum/csrf-cookie');
}
