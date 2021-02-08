const express = require('express')
const sousesCtrl = require('../controllers/sauce')
const auth = require('../middle_wear/auth')
const multer = require('../middle_wear/multer_config')
const router = express.Router()

//get routes
router.post('/', auth, multer, sousesCtrl.createSauce)
    // router.post('/sauces/:id/like')

//get routes
router.get('/', auth, sousesCtrl.sauce)
    // router.get('sauces/:id')

//put routes
// router.put('/sauces/:id')

//delete routes
// router.delete('/sauces/:id')

module.exports = router