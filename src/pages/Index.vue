<template>
  <q-page class="container">

  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage',

  setup () {
    // const $store = useStore()

    // const twiceTheCounter = computed(() => $store.state.session.user)

    // console.log(twiceTheCounter.value)
    // console.log($store.state.session.token)
    // console.log($store.state.session.user.id)

    // const test = store.dispatch('foo/bar')

    // console.log(test)

    // How to call getters/dispatch/etc. here?
  }

  // computed: {
  //   // mix the getters into computed with object spread operator
  //   ...mapGetters([
  //     'doneTodosCount',
  //     'anotherGetter'
  //     // ...
  //   ])
  // }

  // computed: {
  //   bla () {
  //     return this.$store.state.session.timestamp
  //   },

  // foo () {
  // return this.$store.getters['session/getTimestampDiff']
  // }
  // }
})
</script>
