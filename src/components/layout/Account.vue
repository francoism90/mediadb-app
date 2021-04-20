<template>
  <q-btn
    dense
    round
    color="grey-10"
    class="cursor-pointer"
    icon="account_circle"
    aria-label="Account"
  >
    <q-menu
      anchor="top left"
      self="top left"
      square
      class="menu"
    >
      <q-list
        bordered
        padding
        style="width: 200px; max-width: 100vw;"
      >
        <q-item>
          <q-item-section side>
            <q-icon
              name="account_circle"
            />
          </q-item-section>

          <q-item-section>
            <q-item-label>
              {{ user.name }}
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator spaced />

        <q-item
          v-close-popup
          clickable
          :to="{ name: 'settings' }"
        >
          <q-item-section>Settings</q-item-section>
        </q-item>

        <q-item
          v-close-popup
          clickable
          :to="{ name: 'logout' }"
        >
          <q-item-section>Log Out</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script lang="ts">
import useSession from 'src/composables/useSession'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppAccount',

  setup () {
    const { user } = useSession()

    return {
      user
    }
  }
})
</script>
