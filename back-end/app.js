const express = require('express')
require('./db/db_config')
    // const authRoutes = require('./routes/auth_routes')
    // const mainRoutes = require('./routes/main_routes')
const app = express()

// app.use('/auth', authRoutes)
// app.use('/souses', mainRoutes)

module.exports = app