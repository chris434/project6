const jwt = require('jsonwebtoken')
const Sauce = require('../models/sauce_models')
module.exports = async(req, res, next) => {
    try {
        const sauce = await Sauce.findById(req.params.id)

        const token = req.headers.authorization.split(' ')[1]
        const decodeToken = jwt.verify(token, process.env.SECRET_TOKEN)

        if (sauce.userId != decodeToken.userId) {
            return res.status(401).json({ message: 'invalid user' })
        }
        next()

    } catch {
        return res.status(401).json({ message: 'invalid user' })
    }
}