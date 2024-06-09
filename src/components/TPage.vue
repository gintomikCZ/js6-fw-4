<template>
  <div class="page-container">
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
    title: String
  },
  computed: {
    loading () {
      return this.$store.state.loading
    }
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
.page-container
  margin-bottom: 2rem
</style>