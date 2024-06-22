import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuex from './store'

const app = createApp(App)

app.use(router)
app.use(vuex)

app.config.errorHandler = (error) => {
  vuex.commit('setErrorMsg', 'Something wrong happened')
  router.push('/error')
  // TODO delete for production
  console.error(error)
}

app.mount('#app')
