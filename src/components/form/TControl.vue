<template>
  <div class="form-control">
    <label v-if="settings.label" :for="control">{{ settings.label }}</label>

    <!-- <TInputText v-if="settings.type === 'text'" :control="control" :settings="settings" @inputed="onInputed"
      :error="error" @blured="$emit('control-blured')" />
    <TInputNumber v-else-if="settings.type === 'number'" :control="control" :settings="settings" @inputed="onInputed"
      :error="error" @blured="$emit('control-blured')" />
    <TTextarea v-else-if="settings.type === 'textarea'" :control="control" :settings="settings" @inputed="onInputed"
      :error="error" @blured="$emit('control-blured')" /> -->

    <component :is="myComponent" :control="control" :settings="settings" @inputed="onInputed" :error="error"
      @blured="$emit('control-blured')"></component>

    <transition name="fade">
      <div class="error-message" v-if="error">{{ errorMessage }}</div>
    </transition>
  </div>
</template>

<script>
import TInputText from '@/components/form/TInputText.vue'
import TInputNumber from '@/components/form/TInputNumber.vue'
import TTextarea from '@/components/form/TTextarea.vue'
import TInputDate from '@/components/form/TInputDate.vue'
import TSelect from '@/components/form/TSelect.vue'


export default {
  name: 'TControl',
  props: {
    settings: Object,
    control: String,
    error: Boolean,
    errorMessage: String
  },
  data () {
    return {
      value: ''
    }
  },
  computed: {
    myComponent () {
      const obj = {
        text: 'TInputText',
        number: 'TInputNumber',
        textarea: 'TTextarea',
        select: 'TSelect',
        date: 'TInputDate'
      }
      return obj[this.settings.type]
    }
  },
  methods: {
    onInputed(value) {
      this.value = value
      this.$emit('control-inputed', { control: this.control, value: this.value })
    },

  },
  components: { TInputText, TInputNumber, TTextarea, TInputDate, TSelect }
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
.error-message {
  color: red;
  font-style: italic;
  font-size: 0.9rem;
  position: absolute;
  top: 100%;
}
</style>