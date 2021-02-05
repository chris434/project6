const express = require('express')
const app = require('./app')
const server = express()
const port = process.env.PORT || 3000

app.set('port', port)

server.listen(port, () => {
    console.log('listening on port' + port)
})