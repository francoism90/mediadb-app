<template>
  <div class="hero-section">
    <h1><span><slot /></span></h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SectionHero',
});
</script>
