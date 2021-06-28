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
import { favorite } from 'src/repositories/user';
import {
  computed, defineComponent, reactive,
} from 'vue';
import useFormValidation from 'src/composables/useFormValidation';

export default defineComponent({
  name: 'FavoriteControl',

  setup() {
    const { store } = usePlayer();
    const { setResponse } = useFormValidation();

    const form = reactive(<Model>{
      id: store.model.id,
      favorite: store.model.favorite,
    });

    const icon = computed(() => (form.favorite === true ? 'favorite' : 'favorite_border'));

    const onSubmit = async (): Promise<void> => {
      try {
        const response = await favorite(form);
        form.favorite = response.data.favorite || false;
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
