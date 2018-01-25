import jwtDecode from 'jwt-decode'

export function isJWTTokenValid () {
  let isExpired = false
  try {
    let token = localStorage.getItem('token')
    let decodedToken = jwtDecode(token)
    let dateNow = new Date()
    if (decodedToken.exp < dateNow.getTime()) isExpired = true
    return isExpired
  } catch (e) {
    return isExpired
  }
}
