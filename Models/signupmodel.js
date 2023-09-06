const {Schema,model} = require('mongoose')

module.exports.signupmodel = model('signupmodel',Schema({
    firstName : {
        type:String,
        required:true
    },
    MiddleNme : String,
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
    }

   
    
}))