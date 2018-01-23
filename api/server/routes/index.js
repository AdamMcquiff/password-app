const userController   = require('../controllers').user
      passport         = require('passport')
      generateToken    = require('../authentication/token')
      expressJwt       = require('express-jwt')
      authenticate     = expressJwt({ secret : 'server secret' })

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the API!',
    }));

    app.group('/api', (router) => {
        // Signup
        router.post('/signup', passport.authenticate('local-signup', {
            session: false
        }), generateToken, (req, res) => {
            res.status(200).json({
                user: req.user,
                token: req.token
            })
        })

        // Authentication
        router.post('/login', passport.authenticate('local-signin', {
            session: false
        }), generateToken, (req, res) => {
            res.status(200).json({
                user: req.user,
                token: req.token
            })
        })
    })

    app.group("/api", (router) => {
        router.use(authenticate)

        // User Profile
        router.get('/profile', userController.retrieve)
        router.post('/profile', userController.update)
    })    
}