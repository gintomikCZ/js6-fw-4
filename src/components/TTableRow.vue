<template>
  <!-- <tr>
    <template v-if="isHeader">
      <th v-for="item in items">{{ item }}</th>
    </template>
    <template v-else>
      <td v-for="item in items">{{ item }}</td>
    </template>
  </tr> -->
  <!-- <tr v-if="isHeader">
    <th v-for="item in items">{{ item }}</th>
  </tr>
  <tr v-else>
    <td v-for="item in items">{{ item }}</td>
  </tr> -->
  <tr>

    <TTableCell v-for="(item, index) in items" :isHeader="isHeader"
      :label="typeof item === 'string' ? item : item.label"
      :align="(typeof item === 'string' || !('align' in item)) ? 'left' : item.align"
      :colspan="typeof item === 'string' || !('colspan' in item) ? 1 : item.colspan"
      :cellId="typeof item === 'string' || !('id' in item) ? null : item.id"
    />
    <!-- <th v-if="isHeader"
        :class="[typeof item === 'string' || !('align' in item) ? 'text-left' : 'text-' + item.align]"
        :colspan="typeof item === 'string' || !('colspan' in item) ? 1 : item.colspan"
      >{{ typeof item
        ===
        'string' ? item : item.label }}</th> -->
    <!-- <td
        v-else
        :class="[typeof item === 'string' || !('align' in item) ? 'text-left' : 'text-' + item.align]"
        :colspan="typeof item === 'string' || !('colspan' in item) ? 1 : item.colspan"
        @mouseenter="$emit('mouseentered', index)"
      >{{
        typeof item === 'string' ?
        item : item.label }}</td> -->
  </tr>
</template>

<script>
import TTableCell from '@/components/TTableCell.vue'
export default {
  name: 'TTableRow',
  props: {
    items: {
      type: Array
    },
    isHeader: {
      type: Boolean,
      default: false
    }
  },
  components: { TTableCell }
}


</script>

<style lang="stylus" scoped>
@import '../stylus/variables.styl'

th, td
  padding: .35em .7em
  border: 1px solid #cdcdcd;
th
  background: lighten($primary, 40%)
  font-weight: bold;
.text-left
  text-align: left
.text-right
  text-align: right
.text-center
  text-align: center
</style>