const path = require('path')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const authRoutes = require('./routes/auth_routes')
const mainRoutes = require('./routes/main_routes')

require('./db/db_config')
const app = express()

app.use(cors())
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())


app.use('/api/auth', authRoutes)
app.use('/api/sauces', mainRoutes)



module.exports = app