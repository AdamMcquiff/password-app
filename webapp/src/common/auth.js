import jwt_decode from 'jwt-decode'

export function isJWTTokenValid () {
  let isExpired = false
  try {
    let token = localStorage.getItem('token')
    let decodedToken = jwt_decode(token)
    let dateNow = new Date()
    if (decodedToken.exp < dateNow.getTime()) isExpired = true
    return isExpired
  } catch (e) {
    return isExpired
  }
}
