const mongoose = require('mongoose')
require('dotenv').config()

module.exports = mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
    console.log('mongoes atlas connected')
}).catch(e => {
    console.error(e)
})