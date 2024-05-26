<template>
  <div class="container">
    <div>Welcome :-)</div>
  </div>
</template>

<script>

export default {
  name: 'HomePage',
}

</script>

<style lang="stylus" scoped>
@import '../stylus/variables.styl'

.container {
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  color: $text-color
  font-size: 3rem;
}
</style>