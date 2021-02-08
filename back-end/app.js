const express = require('express')

const cors = require('cors')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth_routes')
const mainRoutes = require('./routes/main_routes')
require('./db/db_config')
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.use('/api/auth', authRoutes)
app.use('/api/sauces', mainRoutes)



module.exports = app