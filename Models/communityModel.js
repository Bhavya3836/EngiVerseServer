const {Schema,model} = require('mongoose')
const mongoose = require("mongoose");

module.exports.communityModel = model('communityModel',Schema({
    name:{
        type:String,
        required:true
    },
    users:[{
        type:Schema.Types.ObjectId,
        ref: 'signupmodel'
    }],
    hackathonBroadcasting:[{
        type:Schema.Types.ObjectId,
        ref:"hackathonModel"
    }],
    pols:[{
        type:Schema.Types.ObjectId,
        ref: 'polsModel'
    }],
    introduction:{
        type:String
    },
    broadcastForCollab:[{
        type:Schema.Types.ObjectId,
        ref: 'broadcastModel'
    }]
},{timestamps:true}))