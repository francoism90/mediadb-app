<template>
  <q-page class="container fluid">
    <q-card
      class="bg-grey-10 fixed-center"
      style="width: 400px; max-width: 100vw;"
      square
    >
      <q-card-section class="text-center q-pa-xl">
        Are you sure you want to sign out?
      </q-card-section>

      <q-card-actions
        align="center"
        class="q-pb-lg"
      >
        <q-btn
          no-caps
          unelevated
          rounded
          label="Sign Out"
          @click="logOut"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import useSession from 'src/composables/useSession'
import { logoutUser } from 'src/repositories/user'
import { router } from 'src/router'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LogoutPage',

  setup () {
    const { resetStore, token } = useSession()

    const logOut = async (): Promise<void> => {
      try {
        await logoutUser({ token: token.value || '' })
        await resetStore()
      } catch (e: unknown) {
        //
      } finally {
        await router.push({ name: 'home' })
      }
    }

    return {
      logOut
    }
  }
})
</script>
