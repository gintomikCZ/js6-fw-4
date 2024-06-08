<template>

  <div class="form-control-container" :class="{ invalid: error }">
    <input :id="control" type="text" :autocomplete="settings.autocomplete || 'off'"
      :placeholder="settings.placeholder || ''" :autofocus="settings.autofocus || false"
      :disabled="settings.disabled || false" :readonly="settings.readonly || false"
      :inputmode="settings.inputmode || 'decimal'" :value="value" @input="onInput" @blur="onBlur">
    <div class="arrows">
      <div @click="arrowUpClick" tabindex="0">↑</div>
      <div @click="arrowDownClick" tabindex="0">↓</div>
    </div>
  </div>

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
    // O is falsy, '0' is truthy
    this.value = this.settings.initialValue === 0
      ? '' + this.settings.initialValue
      : this.settings.initialValue || ''
    // this.value = (this.settings.initialValue || this.settings.initalValue === 0) ? this.settings.initialValue : ''
    this.$emit('inputed', this.value)
  },
  data () {
    return {
      value: ''
    }
  },
  computed: {
    step () {
      return this.settings.step || 1
    }
  },
  methods: {
    onInput (e) {
      e.target.value = e.target.value.replace(/\D/g, '')
      this.value = e.target.value
      this.$emit('inputed', this.value)
    },
    onBlur () {
      this.$emit('blured')
    },
    // onKeydown (e) {
    //   const re = /[0-9]/
    //   if (!re.test(e.key)) {
    //     e.preventDefault()
    //   }
    // }
    // if (condition1 && condition2) {}
    // if (!condition1 || !condition2) {}

    arrowUpClick () {
      if ((!this.settings.max && this.settings.max !== 0) || (+ this.value + this.step) <= this.settings.max) {
        this.value = '' + (+ this.value + this.step)
        this.$emit('inputed', this.value)
        this.$emit('blured')
      }
    },
    arrowDownClick () {
      if ((!this.settings.min && this.settings.min !== 0) || (+ this.value - this.step) >= this.settings.min) {
        this.value = '' + (+ this.value - this.step)
        this.$emit('inputed', this.value)
        this.$emit('blured')
      }
    }
  },

}

</script>

<style lang="stylus" scoped>
@import '../../styles/transitions.styl'

.form-control {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  position: relative;
}

input {
  padding: .4em .8em;
  font-size: 1.1rem;
  border-image: none;
  border: none;
  flex-grow: 1;
}
input:focus {
  outline: none;
}

.error-message {
  color: red;
  font-style: italic;
  font-size: 0.9rem;
  position: absolute;
  top: 100%;
}
.form-control-container.invalid {
  border-color: red;
}
.form-control-container {
  display: flex;
  border: 2px solid #222;
}

.form-control-container:focus-within {
  outline: 2px solid #2361ac;
  border-color: transparent;
}


.arrows {
  width: 50px;
}
.arrows > div {
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid #efefef;
  cursor: pointer;
  transition: background-color .4s ease;
}
.arrows > div:hover {
  background: #efefef;
}
.arrows > div:first-child {
  border-bottom: 1px solid #efefef;
}

</style>