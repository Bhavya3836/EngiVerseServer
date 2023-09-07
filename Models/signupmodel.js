const {Schema,model} = require('mongoose')

module.exports.signupmodel = model('signupmodel',Schema({
    firstName : {
        type:String,
        required:true
    },
    lastName : {
        type:String,
        required:true
    },
    phnumber :{
        type:String,
        required:true
    },
    password :{
        type:String,
        required:true
    },
    userName :{
        type:String,
        required:true
    }

   
    
}))