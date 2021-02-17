const express = require('express')
const authCtrl = require('../controllers/auth')
const validate = require('../middle_wear/validate')
const router = express.Router()

router.post('/signup', validate, authCtrl.signup)
router.post('/login', authCtrl.login)
module.exports = router