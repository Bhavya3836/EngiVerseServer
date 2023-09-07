const {loginmodel} = require("../Models/loginmodel")
const {otpmodel} = require("../Models/otpmodel")
const {signupmodel} = require("../Models/signupmodel")
const {tempNumModel} = require("../Models/tempNumStoringModel")
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
        const storingUser = await signupmodel.findOne({
            phnumber : num 
        })
        if(storingUser) {
            return res.status(400).user("User already exists")
        }

        const OTP = otpGenerator.generate(4,
            {
                digits:true,
                lowerCaseAlphabets: false,
                upperCaseAlphabets: false,
                specialChars: false
            })


            const otp = new otpmodel({phone: num, otp:OTP})
            console.log("Generated OTP is "+OTP)

            const final = await otp.save()
            return res.send("Mahesh Dalle"+OTP)
    }
    catch (e){
        console.log(e)
        res.send(e)
    }
}

module.exports.verifyOtp = async(req,res)=>{
    try
    {
        
        const num = req.body.phone
        const otpHolderDetails = await otpmodel.find({
        phone:num
    })
    console.log(otpHolderDetails)
    // console.log(req.body.otp)
    if(otpHolderDetails.length === 0)
    {
        
        return res.status("Please Verify the entered Number")
    }
        const recentOtp = otpHolderDetails.pop()
    console.log(recentOtp)
    if((recentOtp.otp === req.body.otp)|| 1234)//remove this
    {
        console.log("Verified")
        const user = await new tempNumModel({tempNum:num})
        const final = user.save()
        const id = user._id
        const deletingNum = await otpmodel.deleteMany({
            phone : recentOtp.phone
        })

        return res.status(200).send("Verified")
    }
    else{
        console.log(req.body)
        console.log("Invalid OTP")
    }
    }
    
    catch(e){
        console.log(e)
    }
    
}