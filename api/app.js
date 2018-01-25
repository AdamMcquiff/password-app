const express       = require('express')
                      require('express-group-routes')
      session       = require('express-session')
      logger        = require('morgan')
      bodyParser    = require('body-parser')
      passport      = require('passport')
      LocalStrategy = require('passport-local').Strategy
      flash         = require('connect-flash')

// Set up the express app
const app = express()

// Log requests to the console.
app.use(logger('dev'))

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(session({
    secret: 'tits',
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

require('./server/routes')(app)
const user = require('./server/models').Users

require('./server/authentication/passport.js')(passport, user)

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to the beginning of nothingness.',
}))

module.exports = app;