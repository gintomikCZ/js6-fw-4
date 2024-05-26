<template>

  <th v-if="isHeader" :class="['text-' + align]" :colspan="colspan">{{ label }}</th>
  <td v-else :class="classArray" :colspan="colspan" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
    {{ label }}
    <div class="content" v-if="showContent">
      <div v-for="row in cellId">{{ row }}</div>
    </div>
  </td>

</template>

<script>

export default {
  name: 'TTableCell',
  props: {
    isHeader: Boolean,
    label: String,
    colspan: Number,
    align: String,
    cellId: {
      validator: (v) => Array.isArray(v) || !v
    }
  },
  data () {
    return {
      showContent: false
    }
  },
  computed: {
    classArray () {
      const ar = ['text-' + this.align]
      if (this.cellId) {
        ar.push('cursor-pointer')
      }
      return ar
    }
  },
  methods: {
    onMouseenter() {
      if (!this.cellId) {
        return
      }
      this.showContent = true
    },
    onMouseleave () {
      if (!this.cellId) {
        return
      }
      this.showContent = false
    }
  }
}

</script>

<style lang="stylus" scoped>
@import '../stylus/variables.styl'

th, td
  padding: .35em .7em
  border: 1px solid #cdcdcd;
  position: relative
th
  background: lighten($primary, 40%)
  font-weight: bold;
.text-left
  text-align: left
.text-right
  text-align: right
.text-center
  text-align: center

.content
  position: absolute
  bottom: 0
  box-shadow: -7px 16px 32px 4px rgba(5,2,5,0.49)
  padding: .5rem
  background: lightpink
  border-radius: 5px
  border: 1px solid #cdcdcd
  z-index: 1
.content > div
  white-space: nowrap
.cursor-pointer
  cursor: pointer
</style>