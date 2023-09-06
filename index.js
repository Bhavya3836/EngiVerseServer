require ("dotenv/config")
const express = require('express')

const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT


const loginR = require("./Routers/User")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use(cors({
    origin: '*',
    credentials: true,
    methods: ['GET','POST','HEAD','PUT','PATCH','DELETE'],
    allowedHeaders: ['Content-Type'],
    exposedHeaders: ['Content-Type']
}))

app.use('/user',loginR)


mongoose.connect(process.env.MongURL).then(()=>{
    console.log("Connected")
}).catch((err)=>{
    console.log(err)
})

app.listen(port,()=>{
    console.log(`The server is active on port ${port}`)
})