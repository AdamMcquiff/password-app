import axios from 'axios'

export default class HttpHelper {
  constructor () {
    this.token = localStorage.getItem('token')
    this.baseUrl = 'http://localhost:8000/api/'

    this.http = axios.create({
      baseURL: this.baseUrl
    })

    this.httpAuth = axios.create({
      baseURL: this.baseUrl,
      headers: {
        Authorization: 'Bearer ' + this.token
      }
    })
  }

  refreshToken () {
    this.token = localStorage.getItem('token')

    this.http = axios.create({
      baseURL: this.baseUrl
    })

    this.httpAuth = axios.create({
      baseURL: this.baseUrl,
      headers: {
        Authorization: 'Bearer ' + this.token
      }
    })
  }
}

export const commonPasswordsApi = axios.create({
  baseURL: 'https://moocher-io-common-passwords-v1.p.mashape.com/',
  headers: {
    'X-Mashape-Key': 'TO5gQ8nBo1mshnF8XKx1MRjWRk8Vp1d1539jsnvFibPUKRDX6s',
    'Accept': 'text/plain'
  }
})

export const ipApi = axios.create({
  baseURL: 'http://freegeoip.net/json/?callback=?'
})
