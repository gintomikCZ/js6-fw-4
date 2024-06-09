import axios from 'axios'

axios.defaults.baseURL = 'https://sdaapi.glabazna.eu'
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common.Accept = 'json'

const checkUrl = (url) => {
  return url.substr(0, 1) === '/' ? url : '/' + url
}


export default {
  get (path) {
    console.log('db is loading data')
    return axios({
      method: 'get',
      url: checkUrl(path),
    }).then((response) => {
      return response.data.data
    }).catch((error) => {
      console.error(error)
    })
  },

  post (path, body) {
    return axios({
      method: 'post',
      url: checkUrl(path),
      data: body
    }).then((response) => {
      return response.data.data
    }).catch((error) => {
      console.error(error)
    })
  },
  put (path, body) {
    return axios({
      method: 'put',
      url: checkUrl(path),
      data: body
    }).then((response) => {
      return response.data.data
    }).catch((error) => {
      console.error(error)
    })
  },
  delete (path, body) {
    return axios({
      method: 'delete',
      url: checkUrl(path),
      data: body
    }).then((response) => {
      return response.data.data
    }).catch((error) => {
      console.error(error)
    })
  }

}