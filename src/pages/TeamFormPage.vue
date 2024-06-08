<template>
  <TPage :title="$route.params.id ? 'edit employee' : 'add employee'" :loading="loading">
    <TForm :formSettings="formSettings" @submited="onSubmited" cancelBtn @cancel-clicked="onCancelClicked"/>
  </TPage>
</template>

<script>
import TPage from '@/components/TPage.vue'
import TForm from '@/components/form/TForm.vue'
import db from '@/utils/db.js'
export default {
  name: 'TeamFormPage',
  data () {
    return {
      formSettings: {
        team: {
          type: 'text',
          label: 'team',
          valRules: [
            { rule: 'required', message: 'this field is required' }
          ]
        },
        city: {
          type: 'text',
          label: 'city',
          valRules: [
            { rule: 'required', message: 'this field is required' }
          ]
        },
        description: {
          type: 'textarea',
          label: 'description',
          cols: 20,
          valRules: [
            { rule: 'required', message: 'this field is required' }
          ]
        },
      },
      loading: true
    }
  },
  computed: {
    mode () {
      return this.$route.params.id ?  'edit' : 'add'
    }
  },
  created () {
    if (this.mode === 'add') {
      this.loading = false
      return
    }
    db.get('teams/' + this.$route.params.id).then((teamObj) => {
      Object.keys(this.formSettings).forEach(element => {
        this.formSettings[element].initialValue = teamObj[element]
      })
      this.loading = false
    })
  },
  methods: {
    onSubmited (payload) {
      // pokud přidáváme, tak budeme volat db.post,
      // pokud editujeme, tak budeme volat db.put
      const myPromise = this.mode === 'add'
        ? db.post('teams', payload)
        : db.put('teams', Object.assign({ id: this.$route.params.id }, payload))
      myPromise.then(() => {
        this.$router.push('/table')
      })
    },
    onCancelClicked () {
      this.$router.back()
    }
  },
  components: { TPage, TForm }
}

</script>