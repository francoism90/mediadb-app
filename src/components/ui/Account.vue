<template>
  <q-icon
    right
    color="grey-5"
    class="cursor-pointer"
    name="expand_more"
    aria-label="Account"
    size="28px"
  >
    <q-menu
      class="menu"
      anchor="top left"
      self="top left"
      square
      transition-hide="none"
      transition-show="none"
      transition-duration="0"
    >
      <q-list
        bordered
        dense
        separator
        style="width: 250px; max-width: 100vw;"
      >
        <q-item>
          <q-item-section side>
            <q-icon
              name="account_circle"
              size="lg"
            />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-weight-bold ellipsis">
              {{ store.user?.name }}
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section side>
            <q-icon name="o_manage_accounts" />
          </q-item-section>

          <q-item-section>
            <q-item-label>
              Manage Account
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          :to="{ name: 'logout' }"
        >
          <q-item-section side>
            <q-icon name="o_logout" />
          </q-item-section>

          <q-item-section>
            <q-item-label>
              Sign Out
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-icon>
</template>

<script lang="ts">
import useSession from 'src/composables/useSession';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Account',

  setup() {
    const { store } = useSession();

    return {
      store,
    };
  },
});
</script>
