<template>


  <!-- <input :id="control" type="text" :autocomplete="settings.autocomplete || 'off'"
    :placeholder="settings.placeholder || ''" :autofocus="settings.autofocus || false"
    :disabled="settings.disabled || false" :readonly="settings.readonly || false"
    :inputmode="settings.inputmode || 'text'" :value="value" @input="onInput" @blur="onBlur" :class="{ invalid: error }"> -->

  <!-- <select
    :id="control"
    :disabled="settings.disabled || false"
    :readonly="settings.readonly || false"
    :value="value"
    @change="onChange"
    @blur="onBlur"
    :class="{ invalid: error }">
    <option v-for="option in settings.options"
      :value="option.value"
    >
    {{ option.label }}
    </option>
  </select> -->
  <div class="select-container" ref="container">
    <input :id="control" type="text" :autocomplete="settings.autocomplete || 'off'"
      :placeholder="settings.placeholder || ''" :autofocus="settings.autofocus || false"
      :disabled="settings.disabled || false" :readonly="settings.readonly || false"
      :inputmode="settings.inputmode || 'decimal'" :value="inputValue" @input="onInput" @blur="onBlur"
      @focus="showOptions = true">
    <transition name="slide-down">
      <ul v-if="showOptions">
        <li v-for="option in settings.options" @click="onOptionClick(option)">{{ option.label }}</li>
      </ul>
    </transition>
  </div>

</template>

<script>

// document.removeEventListener('click', functionName)


export default {
  name: 'TSelect',
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
    document.addEventListener('click', this.onDocClick)
  },
  mounted () {
    console.log(window)
  },
  beforeUnmount () {
    document.removeEventListener('click', this.onDocClick)
  },
  data () {
    return {
      value: '',
      inputValue: '',
      showOptions: false
    }
  },

  methods: {
    onDocClick (event) {
      const container = this.$refs.container
      if (container && !container.contains(event.target)) {
        this.showOptions = false
      }
    },
    onBlur (e) {
      const container = this.$refs.container
      if (!container.contains(e.target)) {
        this.showOptions = false
      }
    },
    onOptionClick (option) {
      this.inputValue = option.label
      this.showOptions = false
      this.value = option.value
      this.$emit('inputed', this.value)
      this.$emit('blured')
    }
  }
}

</script>

<style lang="stylus" scoped>
.select-container {
  display: flex;
  flex-direction: column;
  position: relative
}

select {
  padding: .4em .8em;
  font-size: 1.1rem;
  border-image: none;
}

.invalid {
  border-color: red;
}

input {
  padding: .4em .8em;
  font-size: 1.1rem;
  border-image: none;
}
ul {
  list-style-type: none
  margin: 0
  padding: 0
  border: 1px solid #cdcdcd;
  position: absolute
  left: 0
  top: calc(100% + 5px)
  z-index: 10
  background: white;
  width: 100%
}
li {
  padding: .3em .7em
  cursor: pointer
  transition: background-color .3s ease;
}
li:hover {
  background: #efefef;
}
li:not(:last-child) {
  border-bottom: 1px solid #efefef;
}
.slide-down-enter-from, .slide-down-leave-to
  opacity: 0
  transform: scaleY(0)
.slide-down-enter-to, .slide-down-leave-from
  opacity: 1
  transform: scaleY(1)
.slide-down-leave-active, .slide-down-enter-active
  transition: all .3s linear
  transform-origin: top
</style>