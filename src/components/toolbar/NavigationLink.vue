<template>
  <q-item
    clickable
    :to="link"
    :exact="exact"
    active-class="md-drawer-item-active"
    exact-active-class="md-drawer-item-active"
  >
    <q-item-section
      v-if="icon"
      side
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-grey-5">{{ title }}</q-item-label>
      <q-item-label class="text-grey-6" caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NavigationLink',

  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      required: true
    },

    link: {
      type: Object,
      required: true
    },

    exact: {
      type: Boolean,
      default: false
    },

    icon: {
      type: String,
      required: true
    }
  }
})
</script>
