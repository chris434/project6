const express = require('express')
require('./db/db_config')
const server = express()
const port = process.env.PORT || 3000
server.listen(port, () => {
    console.log('listening on port' + port)
})