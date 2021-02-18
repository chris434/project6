const jwt = require('jsonwebtoken')

module.exports = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodeToken = jwt.verify(token, process.env.SECRET_TOKEN)

        if (!decodeToken.userId) {
            return res.status(401).json({ message: 'Unauthorized user' })
        }
        next()

    } catch {
        return res.status(401).json({ message: 'Unauthorized user' })
    }
}