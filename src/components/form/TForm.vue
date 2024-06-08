<template>
  <form @submit.prevent="onSubmit">
    <TControl v-for="control in Object.keys(formSettings)" :control="control" :settings="formSettings[control]"
      @control-inputed="onControlInputed" @control-blured="validate(control)" :error="formErrors[control]"
      :errorMessage="formErrorMessages[control]" />
    <div>
      <button v-if="cancelBtn" @click="$emit('cancel-clicked')" type="button">{{ cancelBtnLabel }}</button>
      <button>{{ submitBtnLabel }}</button>
    </div>
  </form>
</template>

<script>
import TControl from '@/components/form/TControl.vue'
import validator from '@/utils/validator.js'

export default {
  name: 'TForm',
  props: {
    formSettings: Object,
    cancelBtn: {
      type: Boolean,
      default: false
    },
    cancelBtnLabel: {
      type: String,
      default: 'cancel'
    },
    submitBtnLabel: {
      type: String,
      default: 'submit'
    }
  },
  created () {
    Object.keys(this.formSettings).forEach(control => {
      this.formData[control] = this.formSettings[control].initialValue || ''
      this.formErrors[control] = false
      this.formErrorMessages[control] = ''
    })
  },
  data () {
    return {
      formData: {},
      formErrors: {},
      formErrorMessages: {}
    }
  },
  methods: {
    onControlInputed (payload) {
      this.formData[payload.control] = payload.value
      this.$emit('data-changed', this.formData)
    },
    onSubmit () {
      Object.keys(this.formSettings).forEach(control => {
        this.validate(control)
      })
      if (Object.keys(this.formErrors).every(control => !this.formErrors[control])) {
        this.$emit('submited', this.formData)
      }
    },
    validate (control) {
      if (!this.formSettings[control].valRules) {
        return
      }
      let error = false
      this.formSettings[control].valRules.forEach((ruleObj) => {
        if (!error) {
          if (!validator[ruleObj.rule](this.formData[control], ruleObj.par)) {
            error = true
            this.formErrors[control] = true
            this.formErrorMessages[control] = ruleObj.message
          }
        }
      })
      if (!error) {
        this.formErrors[control] = false
        this.formErrorMessages[control] = ''
      }
    }
  },
  components: { TControl }
}

</script>

<style scoped>
form {
  width: 300px;
}
</style>
