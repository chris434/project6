const express = require('express')
const sousesCtrl = require('../controllers/sauce')
const auth = require('../middle_wear/auth')
const authAccess = require('../middle_wear/auth-protected')
const multer = require('../middle_wear/multer_config')
const router = express.Router()

//get routes
router.post('/', auth, multer, sousesCtrl.createSauce)
router.post('/:id/like', auth, sousesCtrl.likeSauce)

//get routes
router.get('/', auth, sousesCtrl.sauce)
router.get('/:id', auth, sousesCtrl.sauceById)

//put routes
router.put('/:id', authAccess, multer, sousesCtrl.modifySauce)

//delete routes
router.delete('/:id', authAccess, sousesCtrl.deleteSauce)

module.exports = router