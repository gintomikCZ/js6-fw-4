<template>
  <TNavBar :links="links"/>

  <RouterView />

</template>

<script>
import TNavBar from '@/components/TNavBar.vue'
export default {
  name: 'App',
  // computed: {
  //   loading() {
  //     return this.$store.state.loading
  //   }
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
  components: { TNavBar }
}

</script>