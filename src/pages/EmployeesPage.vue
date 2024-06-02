<template>
  <div class="container">
    <h1>employees</h1>
    <button @click="addNew">add new employee</button>
  </div>

  <div class="table-container">
    <TLoading v-if="loading" />
    <TTable v-else :headers="headers" :bodyData="employeesToDisplay" @row-clicked="onRowClicked"/>
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
  methods: {
    addNew () {
      this.$router.push('/employeeform')
    },
    onRowClicked(index) {
      this.$router.push('/employeeform/' + this.employees[index].id)
    }
  },
  components: { TTable, TLoading }
}

</script>