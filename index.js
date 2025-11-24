require ("dotenv/config")
const express = require('express')

const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT


const loginR = require("./Routers/User")
const adminR = require("./Routers/Admin")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use(cors({
    origin: '*',
    credentials: true,
    methods: ['GET','POST','HEAD','PUT','PATCH','DELETE'],
    allowedHeaders: ['*'],
    exposedHeaders: ['Content-Type']
}))

app.get('/',(req,res)=>{
    res.send("Hello World")
})
app.use('/user',loginR)
app.use('/admin',adminR)

mongoose.connect(process.env.MongURL).then(()=>{
    console.log("Connected")
}).catch((err)=>{
    console.log(err)
})
console.log("ABCDEGASDASD")
app.listen(port,()=>{
    console.log(`The server is active on port ${port}`)
})
log