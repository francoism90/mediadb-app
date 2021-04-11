<template>
  <div class="container fluid">
    <div class="drawer-avatar q-py-lg text-center">
      <q-icon
        color="white"
        size="56px"
        class="q-mb-sm"
        name="account_circle"
      />

      <div class="text-body1 text-weight-bold text-white">
        {{ user.name }}
      </div>
    </div>

    <q-separator dark />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useSession from 'src/composables/useSession'

export default defineComponent({
  name: 'MainDrawer',

  setup () {
    const { user } = useSession()
    //

    return {
      user
    }
  }
})
</script>
