const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const {msgModel} = require("../../Models/msgModel")
const {chatModel} = require("../../Models/chatModel")
const {signupModel} = require("../../Models/signupmodel")


module.exports.messageSendBody = asyncHandler(async (req,res)=>{
    try{
        const data = req.body
        const id = req.params
        const token = req.headers.authorization.split(' ')[1]
        const temp1 = jwt.verify(token,process.env.Skey,'' ,false)

        if(!data||!id){
            return res.send("Moey Moey").status(404)
        }
        let createMsg = {
            sender:temp1.id,
            content: data,
            chat:id
        }
        //console.log(createMsg.sender)
        let msg = await new msgModel(newMsg)
        msg = await msg.populate("chat")

        msg.save()
        await chatModel.findByIdAndUpdate(id,{
            latestMessage: msg
        })
        res.json(msg)
    }catch (e) {
        console.log(e)  
    }
})
