const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/auth_models')

exports.signup = async(req, res, next) => {
    const { email, password } = await req.body
    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            email: email,
            password: hashedPassword
        })
        await newUser.save()
        res.status(201).json({ message: 'user successfully created' })

    } catch (error) {
        res.status(400).json({ message: error.errors.email.message })
    }

}
exports.login = async(req, res, next) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email: email })
        if (!user) return res.status(401).send({ message: 'email or password incorrect' })
        const correctPassWord = await bcrypt.compare(password, user.password)

        if (!correctPassWord) return res.status(401).json({ message: 'email or password incorrect' })

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_TOKEN, { expiresIn: '24h' })
        res.status(200).json({ userId: user._id, token: token })
    } catch (error) {
        res.status(401).send({ message: 'email or password incorrect' })
    }
}