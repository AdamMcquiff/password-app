const Users = require('../models').User

module.exports = {
    signup(req, res) {
        console.log(req)
        return Users
            .create({
                email: req.body.email,
                password: req.body.password,
                name: req.body.name
            })
            .then(user => res.status(201).send(user))
            .catch(error => res.status(400).send(error))
    },
}