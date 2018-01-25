import jwtDecode from 'jwt-decode'

export function isJWTTokenValid () {
  let isValid = false
  try {
    let token = localStorage.getItem('token')
    let decodedToken = jwtDecode(token)
    let dateNow = new Date()
    if (decodedToken.exp < dateNow.getTime()) {
      isValid = true
    } else {
      localStorage.removeItem('token')
    }
  } catch (e) {
    isValid = false
  }
  return isValid
}
