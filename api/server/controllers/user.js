const Users = require('../models').User

module.exports = {
    retrieve(req, res) {
        return Users
            .findById(req.user.id)
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    })
                }
                return res.status(200).send(user)
            })
            .catch(error => res.status(400).send(error))
    },

    update(req, res) {
        return Users
            .update(getProperties(req), {
                where: {
                    id: req.user.id
                }
            })
            .then(user => res.status(201).send(user))
            .catch(error => res.status(400).send(error))
    },
}