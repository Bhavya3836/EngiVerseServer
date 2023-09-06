const {loginmodel} = require("../Models/loginmodel")
const {Otp} = require("../Models/otpmodel")
const {signUp} = require("../Models/signupmodel")
const otpGenerator = require("otp-generator")
const jwt = require('jsonwebtoken')


const generateToken = (id) =>{
    return jwt.sign({id},process.env.Skey )
}

module.exports.Login = async(req,res)=>{
    try{
        const data = req.body
        const newData = new loginmodel(data)

        await newData.save()

        console.log(data)
        res.send(data)

    }
    catch(e){   
        console.log(e)
    }
}

module.exports.readLogin = async(req,res)=>{
    try{
        const data = await loginmodel.find()
        res.json(data)
        console.log(data)
    }
    catch(e){
        console.log(e)
    }
}

module.exports.otp = async(req,res)=>{
    try{
        const num = req.body.phone
        const storingUser = await signnupmodel.findOne({
            phnumber : num 
        })
        if(user) {
            return res.status(400).user("User already exists")
        }

        const OTP = otpGenerator.generate(4,
            {
                digits:true,
                lowerCaseAlphabets: false,
                upperCaseAlphabets: false,
                specialChars: false
            })

            const number = req.body.number;

            const otp = new Otp({phone: number, otp:OTP})
            console.log("Generated OTP is "+OTP)

            const final = await otp.save()
            return res.status(200)
    }
    catch (e){
        console.log(e)
        res.send(e)
    }
}