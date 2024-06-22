<template>
  <div class="container">
    <div class="header">error !!</div>
    <div class="description">{{ msg }}</div>
    <div class="buttons">
      <button @click="onClick">OK</button>
    </div>
  </div>

</template>


<script>

export default {
  name: 'ErrorPage',
  computed: {
    msg () {
      return this.$store.state.errorMsg
    }
  },
  methods: {
    onClick () {
      this.$store.commit('setError', false)
      this.$router.push('/')
      // this.$router.go(-2)
    }
  }
}

</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 3rem;
}
.header {
  color: red;
  font-size: 2rem;
  font-weight: bold;
}
.description {
  text-align: center;
}
</style>