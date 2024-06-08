<template>
  <div>
    <div class="container">
      <h1>{{ title }}</h1>
    </div>
    <div class="content-container">
      <TLoading v-if="loading" />
      <slot v-else></slot>
    </div>
  </div>


</template>

<script>

import TLoading from '@/components/TLoading.vue'

export default {
  name: 'TPage',
  props: {
    title: String,
    loading: Boolean
  },
  components: {TLoading}
}


</script>

<style lang="stylus" scoped>
.container
  padding: 1rem 2rem
.content-container
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
</style>