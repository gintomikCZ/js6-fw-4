<template>
  <div class="container">
    <h1>new employee form</h1>
    <TLoading v-if="loading"></TLoading>
    <TForm v-else :formSettings="formSettings" @submited="onSubmited"/>
  </div>
</template>

<script>
import TForm from '@/components/form/TForm.vue'
import TLoading from '@/components/TLoading.vue'
import db from '@/utils/db.js'
export default {
  name: 'EmployeeFormPage',
  data () {
    return {
      formSettings: {
        firstname: {
          type: 'text',
          label: 'first name',
          valRules: [
            { rule: 'required', message: 'this field is required' }
          ]
        },
        lastname: {
          type: 'text',
          label: 'last name',
          valRules: [
            { rule: 'required', message: 'this field is required' }
          ]
        },
        position: {
          type: 'text',
          label: 'position',
          valRules: [
            { rule: 'required', message: 'this field is required' }
          ]
        },
        salary: {
          type: 'number',
          label: 'salary',
          valRules: [
            { rule: 'required', message: 'this field is required' }
          ]
        },
        dateofbirth: {
          type: 'date',
          label: 'your birthdate',
          valRules: [
            { rule: 'required', message: 'this field is required' },
            { rule: 'isPast', message: 'the date must be in past' }
          ]
        }
      },
      loading: true
    }
  },
  created () {
    if (!this.$route.params.id) {
      this.loading = false
      return
    }
    db.get('employees/' + this.$route.params.id).then(record => {
      Object.keys(this.formSettings).forEach(control => {
        this.formSettings[control].initialValue = record[control]
      })
      this.loading = false
    })
  },
  methods: {
    onSubmited(data) {
      const promise = this.$route.params.id
        ? db.put('employees', Object.assign({ id: this.$route.params.id }, data))
        : db.post('employees', data)
      promise.then(() => {
        this.$router.push('/employees')
      })
    }
  },
  components: { TForm, TLoading }
}

</script>

<style scoped>
.container {
  margin: 2rem;
}
</style>