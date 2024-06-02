<template>


    <input :id="control" type="text" :autocomplete="settings.autocomplete || 'off'"
      :placeholder="settings.placeholder || ''" :autofocus="settings.autofocus || false"
      :disabled="settings.disabled || false" :readonly="settings.readonly || false"
      :inputmode="settings.inputmode || 'text'" :value="value" @input="onInput"
      @blur="onBlur"
      :class="{invalid: error}"
    >


</template>

<script>

export default {
  name: 'TInput',
  props: {
    control: String,
    settings: Object,
    error: {
      type: Boolean,
      default: false
    }
  },
  created () {
    this.value = this.settings.initialValue || ''
    this.$emit('inputed', this.value)
  },
  data () {
    return {
      value: ''
    }
  },
  methods: {
    onInput (e) {
      this.value = e.target.value
      this.$emit('inputed', this.value)
    },
    onBlur () {
      this.$emit('blured')
    }
  }
}

</script>

<style lang="stylus" scoped>


input {
  padding: .4em .8em;
  font-size: 1.1rem;
  border-image: none;
}

.invalid {
  border-color: red;
}

</style>