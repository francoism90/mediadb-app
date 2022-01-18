<template>
  <div class="hero">
    <h1><span><slot /></span></h1>
    <p><slot name="meta" /></p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageHero',
});
</script>
