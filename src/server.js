const express = require("express")
const basicAuth = require('express-basic-auth')
const bodyParser = require("body-parser")
const swaggerUI = require('swagger-ui-express')
const docs = require('./swagger.json')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

const dbstr = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1/springworks'
mongoose.connect(
    dbstr, { useUnifiedTopology: true, useNewUrlParser: true }
)
const db = mongoose.connection
db.once('open', () => console.log('connected to the database'))
db.on('error', () => console.log('MongoDB connection error:'))


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cors())
app.use((req, res, next) => {
    console.log(`Request_Endpoint: ${req.method} ${req.url}`)
    next()
})

const pswd = "Springworks"
app.use('/api-docs', basicAuth({
    users: { Springworks: pswd},
    challenge: true,
  }), swaggerUI.serve, swaggerUI.setup(docs))


const api = require('./router/router')
app.use('/api/v1/', api)



app.listen(5000, () => {
    console.log("Server is running at localhost:5000/api-docs")
})