<template>
  <div class="drawer-container">
    <div class="drawer-avatar q-py-lg text-center">
      <q-icon
        class="q-mb-sm"
        color="white"
        name="play_circle_outline"
        size="56px"
      />

      <div class="text-body1 text-weight-bold text-white ellipsis">
        MediaDB
      </div>
    </div>

    <q-separator />

    <q-list padding>
      <template
        v-for="(menuItem, index) in menuList"
        :key="index"
      >
        <q-item
          v-ripple
          :to="menuItem.route"
          active-class="bg-grey-10"
          clickable
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

    <q-separator />
  </div>
</template>

<script lang="ts">
import useSession from 'src/composables/useSession';
import { defineComponent } from 'vue';

const menuList = [
  {
    icon: 'o_video_library',
    label: 'Videos',
    route: { name: 'home' },
  },
  {
    icon: 'o_tag',
    label: 'Tags',
    route: { name: 'tags' },
  },
  {
    icon: 'o_settings',
    label: 'Settings',
    route: { name: 'settings' },
  },
];

export default defineComponent({
  name: 'AppDrawer',

  setup() {
    const { store } = useSession();
    //

    return {
      menuList,
      store,
    };
  },
});
</script>
