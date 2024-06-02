<template>
  <table>
    <thead>
      <TTableRow :items="headers" isHeader />
    </thead>
    <tbody>
      <TTableRow v-for="(rowData, index) in bodyData" :items="rowData" @clicked="$emit('row-clicked', index)"/>
    </tbody>
    <tfoot v-if="footers.length">
      <TTableRow :items="footers" isHeader />
    </tfoot>

  </table>
</template>

<script>
import TTableRow from '@/components/TTableRow.vue'
export default {
  name: 'TTable',
  props: {
    headers: {
      type: Array
    },
    bodyData: {
      type: Array
    },
    footers: {
      type: Array,
      default: () => []
    }
  },

  components: { TTableRow }
}
</script>

<style lang="stylus" scoped>
table
  border-collapse: collapse
</style>