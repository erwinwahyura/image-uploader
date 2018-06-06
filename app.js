require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const normalizePort = require('normalize-port')
// database
const mongoose = require('mongoose')
const url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds151180.mlab.com:51180/image-uploader`
mongoose.connect(url, (err) => { 
    if (err) console.log('err') 
    else console.log('db connected!')
})
// routes
const index = require('./routes/index')

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', index)

const port = normalizePort(process.env.PORT || '3000')
app.listen(port, () => console.log('listening on port ', port))

module.exports = app
