<template>
  <q-icon
    :name="icon"
    color="white"
    class="cursor-pointer"
    size="24px"
    @click="onSubmit"
  />
</template>

<script lang="ts">
import { AxiosError } from 'axios';
import { ValidationResponse } from 'src/interfaces/form';
import usePlayer from 'src/composables/usePlayer';
import { Model } from 'src/interfaces/repository';
import { follow } from 'src/repositories/user';
import {
  computed, defineComponent, reactive,
} from 'vue';
import useFormValidation from 'src/composables/useFormValidation';

export default defineComponent({
  name: 'FollowControl',

  setup() {
    const { store } = usePlayer();
    const { resetResponse, setResponse } = useFormValidation();

    const form = reactive(<Model>{
      id: store.model.id,
      following: store.model.following || false,
    });

    const icon = computed(() => (form.following === true ? 'watch_later' : 'o_watch_later'));

    const onSubmit = async (): Promise<void> => {
      resetResponse();

      try {
        const response = await follow(form);
        form.following = response.data?.following || false;
      } catch (e: unknown) {
        const error = e as AxiosError<ValidationResponse>;

        if (error.response) {
          setResponse(error.response.data);
          return;
        }

        throw error;
      }
    };

    return {
      store,
      icon,
      onSubmit,
    };
  },
});
</script>
