<template>
  <div class="container">
    <h1>employees</h1>
  </div>

  <div class="table-container">
    <TLoading v-if="loading" />
    <TTable v-else :headers="headers" :bodyData="employeesToDisplay" />
    </div>
</template>

<script>
import TLoading from '@/components/TLoading.vue'
import TTable from '@/components/TTable.vue'
import db from '../utils/db.js'
import { formatDate } from '@/utils/dateUtils.js'

/*
  name | position | date of birth | salary
*/

export default {
  name: 'EmployeesPage',
  created () {
    db.get('employees').then(employees => {
      this.employees = employees
      this.loading = false
      console.log(this.employees)
    })
  },
  data () {
    return {
      loading: true,
      employees: null,
      headers: ['name', 'position', 'dateOfBirth', {label: 'salary', align: 'right'}]
    }
  },
  computed: {
    employeesToDisplay() {
      return !this.employees
        ? []
        : this.employees.map(guy => {
          return [
            `${guy.lastname} ${guy.firstname}`,
            guy.position,
            formatDate(guy.dateofbirth),
            {label:'' + guy.salary, align: 'right'}
          ]
        })
    }
  },
  components: { TTable, TLoading }
}

</script>