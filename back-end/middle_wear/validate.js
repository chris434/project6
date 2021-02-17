const validate = (req, res, next) => {
    const { email, password } = req.body
    const reg = [/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, /^(?=.*\d)/, /^(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/]

    switch (false) {
        case reg[0].test(email):
            res.status(400).json({ message: 'invalid email' })
            break;
        case reg[1].test(password):
            res.status(400).json({ message: 'password must contain at least one number charter' })
            break;
        case reg[2].test(password):
            res.status(400).json({ message: 'password must contain at least one of @$!%*#?&' })
            break;
    }
    if (!password && email || password.length < 8) {
        return res.status(400).json({ message: 'password must 8 charters long' })
    }
    next()
}
module.exports = validate