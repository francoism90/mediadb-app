<template>
  <div class="drawer-container">
    <div class="drawer-avatar q-py-lg text-center">
      <q-icon
        color="white"
        size="56px"
        class="q-mb-sm"
        name="account_circle"
      />

      <div class="text-body1 text-weight-bold text-white ellipsis">
        {{ user.name }}
      </div>
    </div>

    <q-separator dark />

    <q-list
      dark
      padding
    >
      <template
        v-for="(menuItem, index) in menuList"
        :key="index"
      >
        <q-item
          v-ripple
          :to="menuItem.route"
          active-class="bg-grey-10"
          clickable
          dark
        >
          <q-item-section side>
            <q-icon :name="menuItem.icon" />
          </q-item-section>

          <q-item-section>
            {{ menuItem.label }}
          </q-item-section>
        </q-item>
      </template>
    </q-list>

    <q-separator dark />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useSession from 'src/composables/useSession'

const menuList = [
  {
    icon: 'o_home',
    label: 'Home',
    route: { name: 'home' }
  },
  {
    icon: 'o_bookmarks',
    label: 'Bookmarks',
    route: { name: 'settings' }
  },
  {
    icon: 'o_watch_later',
    label: 'Watch Later',
    route: { name: 'settings' }
  },
  {
    icon: 'o_history',
    label: 'History',
    route: { name: 'settings' }
  },
  {
    icon: 'o_settings',
    label: 'Settings',
    route: { name: 'settings' }
  }
]

export default defineComponent({
  name: 'MainDrawer',

  setup () {
    const { user } = useSession()
    //

    return {
      menuList,
      user
    }
  }
})
</script>
