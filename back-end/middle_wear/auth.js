const jwt = require('jsonwebtoken')
const User = require('../models/auth_models')

module.exports = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodeToken = jwt.verify(token, process.env.SECRET_TOKEN)

        if (req.body.userId && req.body.userId != decodeToken.userId) {
            throw 'invalid user'
        } else {
            next()
        }
    } catch (e) {
        res.status(401).send({ error: 'invalid user' })
    }
}