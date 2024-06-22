import { createStore } from 'vuex'
import db from '../utils/db.js'

const store = createStore({
  state: {
    loading: true,
    employees: null,
    employee: null,
    error: false,
    errorMsg: ''
  },
  mutations: {
    switchLoading(state, value) {
      if (typeof value === 'boolean') {
        state.loading = value
      }
    },
    setEmployees(state, value) {
      state.employees = value
    },
    setEmployee(state, value) {
      state.employee = value
    },
    setError (state, value) {
      state.error = value
    },
    setErrorMsg (state, value) {
      state.errorMsg = value
    }
  },
  actions: {
    fetchEmployees (context) {
      return db.get('employees').then((employees) => {
        context.commit('setEmployees', employees)
        context.commit('switchLoading', false)
      })
    },
    fetchOneEmployee (context, id) {
      if (context.state.employees) {
        const guy = context.state.employees.find(item => '' + item.id === '' + id)
        if (guy) {
          context.commit('setEmployee', guy)
          return
        }
      }
      return db.get('employees/' + id).then((guy) => {
        context.commit('setEmployee', guy)
      })
    },
    editEmployee (context, data) {
      return db.put(employees, data)
    }
  }
})

export default store