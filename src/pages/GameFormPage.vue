<template>
  <TPage :title="$route.params.id ? 'edit game' : 'add game'" :loading="loading">
    <TForm :formSettings="formSettings" @submited="onSubmited" cancelBtn @cancel-clicked="onCancelClicked"
    @data-changed="onDataChanged"/>
  </TPage>
</template>

<script> 

/*
(id)
hometeamid
awateamid
date
hometeamgoals
awayteamgoals
*/
import TPage from '@/components/TPage.vue'
import TForm from '@/components/form/TForm.vue'
import db from '@/utils/db.js'

export default {
  name: 'GameFormPage',
  created () {
    const promises =
    [
      db.get('teams').then(teams => {
        this.formSettings.hometeamid.options = teams.map(team => {
          return { value: team.id, label: team.team + ' ' + team.city }
        })
        // this.formSettings.hometeamid.options.unshift({ value: '', label: '' })
        this.formSettings.awayteamid.options = teams.map(team => {
          return { value: team.id, label: team.team + ' ' + team.city }
        })
        // this.formSettings.awayteamid.options.unshift({ value: '', label: '' })
      })
    ]
    if (this.$route.params.id) {
      promises.push(
        db.get('games/' + this.$route.params.id).then(record => {
          Object.keys(this.formSettings).forEach(control => {
            this.formSettings[control].initialValue = record[control]
          })
        })
      )
    }
    Promise.all(promises).then(() => {
      this.loading = false
    })
  },
  data () {
    return {
      loading: true,
      formSettings: {
        date: {
          type: 'date',
          label: 'date of the game',
          valRules: [
            { rule: 'required', message: 'this field is required' },
            { rule: 'isValidDate', message: 'the date is not valid' },
          ]
        },
        hometeamid: {
          type: 'select',
          label: 'home team',
          valRules: [
            { rule: 'required', message: 'this field is required' },
          ]
        },
        awayteamid: {
          type: 'select',
          label: 'away team',
          valRules: [
            { rule: 'required', message: 'this field is required' },
          ]
        },
        hometeamgoals: {
          type: 'number',
          label: 'home team goals',
          min: 0,
          valRules: [
            { rule: 'required', message: 'this field is required' },
          ]
        },
        awayteamgoals: {
          type: 'number',
          label: 'away team goals',
          min: 0,
          valRules: [
            { rule: 'required', message: 'this field is required' },
          ]
        },
      }
    }
  },
  methods: {
    onCancelClicked () {
      this.$router.back()
    },
    onSubmited (payload) {
      // TODO
      // POKUD payload.hometeamid === payload.awayteamid - je to problém
      // neukládat záznam
      // nějak o tom říct uživateli
      if (payload.hometeamid !== payload.awayteamid) {
        const myPromise = !this.$route.params.id
          ? db.post('games', payload)
          : db.put('games', Object.assign({ id: this.$route.params.id }, payload))
        myPromise.then(() => {
          this.$router.push('/games')
        })
        return
      }
      // otevřít modálové okno
    },
    onDataChanged (formData) {
      // condition - existuje hometeamid
      // pokud ano, tak vyhodíme z awayteamid.options tu option, kterou to tam má
      if (formData.hometeamid) {
        const foundOptionIndex = this.formSettings.awayteamid.options.find(option => '' + option.id === '' + formData.hometeamid)
        this.formSettings.awayteamid.options.splice(foundOptionIndex, 1)
      }
    }
  },
  components: { TForm, TPage }
}

</script>