// const {loginmodel} = require("../Models/loginmodel")
// const {otpmodel} = require("../Models/otpmodel")
// const {signupmodel} = require("../Models/signupmodel")
// const {communityModel} = require("../Models/communityModel")

const jwt = require('jsonwebtoken')




const generateToken = (id) =>{
    return jwt.sign({id},process.env.Skey )
}



module.exports.adminLogin = async(req,res)=>{
    try{
        const data = req.body
        const temp1 = "admin123"
        const temp2 = "1234"
        if((data.userName === temp1) && (data.password === temp2)){
            console.log("Welcome to goa singham")
            res.status(200).json({message:"User Found",})
        }
        else{
            res.status(400).send("Incorrect UserName of password")
        }

    }
    catch(e){   
        console.log(e)
    }
}