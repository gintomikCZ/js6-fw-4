<template>
  <TNavBar :links="links"/>
  <ErrorPage v-if="error" />
  <RouterView v-else />
</template>

<script>
import TNavBar from '@/components/TNavBar.vue'
import ErrorPage from '@/pages/ErrorPage.vue'
export default {
  name: 'App',
  // computed: {
  //   loading() {
  //     return this.$store.state.loading
  //   }
  // },
  computed: {
    error () {
      return this.$store.state.error
    }
  },
  // created () {
  //   const obj = null
  //   console.log(obj.ahoj)
  // },
  data () {
    return {
      links: [
        { link: '/', label: 'Home' },
        { link: '/table', label: 'Table' },
        { link: '/games', label: 'Games' },
        { link: '/employees', label: 'Employees' }
      ]
    }
  },
  // watch: {
  //   loading (nv, ov) {
  //     console.log('changed from ' + ov + ' to ' + nv)
  //   }
  // },
  components: { TNavBar, ErrorPage }
}

</script>