const Logins = require('../models').Logins

module.exports = {
    create(req, res) {
        return Logins
            .create({
                ip: req.body.ip,
                hostname: req.body.hostname,
                datetime: req.body.datetime,
                userId: req.user.id,
            })
            .then(rider => res.status(201).send(rider))
            .catch(error => res.status(400).send(error))
    },

    list(req, res) {
        return Logins
            .findAll({
                where: {
                    userId: req.user.id
                }
            }).then(Logins => {
                if (!Logins) {
                    return res.status(404).send({
                        message: 'Logins Not Found',
                    })
                }
                return res.status(200).send(Logins)
            })
            .catch(error => res.status(400).send(error))
    },
}