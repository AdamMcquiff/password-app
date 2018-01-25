import { ipApi } from './http-common'

export function isEmailValid (email) {
  let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(email)
}

export function getForenameFromName (name) {
  return name.replace(/ .*/,'')
}

export async function getClientData () {
  let ip = ''
  await ipApi.get('').then(response => {
    let json = (response.data).substr(2)
    json = json.slice(0, -2)
    ip = JSON.parse(json)
  })
  return ip
}
