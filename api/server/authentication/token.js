const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    req.token = jwt.sign({
        id: req.user.id,
    }, 'server secret', {
        expiresIn: 10000
    })
    next()
}