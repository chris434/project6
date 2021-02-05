const bcrypt = require('bcrypt')
const user = require('../modulus/auth_modulus')

exports.singUp = async(req, res, next) => {
    const { email, password } = await req.body
    if (!password) return
    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new user({
            email: email,
            password: hashedPassword
        })
        await newUser.save()
        res.status(201).send({ message: 'user successfully created' })

    } catch (error) {
        res.status(400).send({ message: error.errors.email.message })
    }

}