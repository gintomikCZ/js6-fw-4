<template>
  <nav>
    <ul>
      <li v-for="link in links">
        <div v-if="$route.path === link.link" class="fake-link">{{ link.label }}</div>
        <RouterLink v-else :to="link.link">{{ link.label }}</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script> 

export default {
  name: 'TNavBar',
  props: {
    links: {
      type: Array,
      validator: (v) => v.every(link => (typeof link === 'object') && (link !== null) && (!Array.isArray(link)) && ('link' in link) && ('label' in link))
    }
  }
}

</script>

<style lang="stylus" scoped>

@import '../stylus/variables.styl'

nav
  background: $primary
  color: $text-color
  padding: .5rem

ul
  display: flex
  align-items: center
  margin: 0
  padding: 0
  list-style-type: none
  gap: 1rem

a
  text-decoration: none
  color: $text-color
  padding: .35em .7em
  transition: background-color .4s ease
  border-radius: 4px;

a:hover
  background: lighten($primary, 40%)

.fake-link
  padding: .35em .7em
</style>