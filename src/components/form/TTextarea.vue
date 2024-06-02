<template>
<div class="textarea-container">
  <textarea :id="control" :autocomplete="settings.autocomplete || 'off'" :placeholder="settings.placeholder || ''"
    :autofocus="settings.autofocus || false" :disabled="settings.disabled || false"
    :readonly="settings.readonly || false" :inputmode="settings.inputmode || 'text'" :rows="settings.rows || 8"
    :cols="settings.cols || 60" :value="value" @input="onInput" @blur="onBlur" :class="{
      invalid: error,
      'no-resize': settings.resize === false
    }">

  </textarea>
    <div
      v-if="settings.counter"
      class="counter"
      :class="{'text-red': value.length > settings.limit }"
    >
      {{ value.length + '/' + settings.limit }}
    </div>
  </div>

</template>

<script>

export default {
  name: 'TTextarea',
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


textarea {
  padding: .4em .8em;
  font-size: 1.1rem;
  border-image: none;

}

.no-resize {
  resize: none;
}

.invalid {
  border-color: red;
}

.textarea-container {
  align-self: flex-start;
  position: relative;
}
.counter {
  position: absolute;
  bottom: 5px;
  right: 5px;
  font-size: .8rem;
  font-style: italic;
}
.text-red {
  color: red;
}

</style>