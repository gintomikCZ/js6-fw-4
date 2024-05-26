<template>
  <TNavBar :links="links"/>

  <RouterView />
</template>

<script>
import TNavBar from '@/components/TNavBar.vue'
export default {
  name: 'App',
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
  components: { TNavBar }
}

</script>