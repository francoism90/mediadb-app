import { AxiosError, AxiosResponse } from 'axios';
import { resetErrors, setErrors } from 'components/shared/forms';
import { authenticate, store } from 'components/shared/sessions';
import { Platform } from 'quasar';
import { api } from 'src/boot/axios';
import { LoginForm, LoginResponse, ValidationResponse } from 'src/interfaces';
import { router } from 'src/router';
import { reactive } from 'vue';

export const state = reactive<LoginForm>({
  email: '',
  password: '',
  device_name: Platform.userAgent,
  remember: true,
});

export const onSubmit = async (): Promise<void> => {
  resetErrors();

  try {
    const response = await api.post<LoginForm, AxiosResponse<LoginResponse>>('login', state);

    await authenticate(response.data);

    await router.replace(store.redirectUri);
  } catch (e: unknown) {
    const error = e as AxiosError<ValidationResponse>;

    if (error.response) {
      setErrors(error.response.data);
      return;
    }

    throw error;
  }
};
