const User = require('../models').User

module.exports = {
    retrieve(req, res) {
        return User
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
        return User
            .update({
                name: req.body.name,
                alternativeEmail: req.body.alternativeEmail,
                securityQuestionOne: req.body.securityQuestionOne,
                securityQuestionOneAnswer: req.body.securityQuestionOneAnswer,
                securityQuestionTwo: req.body.securityQuestionTwo,
                securityQuestionTwoAnswer: req.body.securityQuestionTwoAnswer,
            }, {
                where: {
                    id: req.user.id
                }
            })
            .then(user => res.status(201).send(user))
            .catch(error => res.status(400).send(error))
    },
}