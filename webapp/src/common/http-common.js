import axios from 'axios'

export const http = axios.create({
  baseURL: `http://localhost:8000/api/`
})

export const httpAuth = axios.create({
  baseURL: `http://localhost:8000/api/`,
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
})

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
