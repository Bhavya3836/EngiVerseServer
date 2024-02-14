const asyncHandler = require('express-async-handler')
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")
const {communityModel} = require("../../Models/communityModel")
const {hackathonModel} = require("../../Models/hackathonModel");
const { productmodel } = require('../../Models/productmodel');
const {broadcastModel} = require("../../Models/broadcastModel")
const {chatModel} = require("../../Models/chatModel")


module.exports.getHackathon = async(req,res)=>{
    try{
        const data = req.body
        const temp = await productmodel.find()
        res.json({message:"Hackathon added Successfull",data:temp})    
    }
  catch(e){
      res.json({error:e,meessage:e.meessage})
    }
}

module.exports.createCommunity = async(req,res)=>{
    try{
        const {communityName,introduction} = req.body
//        const extractingJWT = req.headers.authorization.split(' ')[1];
//        const decoded = jwt.verify(extractingJWT, process.env.Skey, '', false);
        const exists = await communityModel.find({name:communityName})
        if(exists.length!==0){
            res.send({status:500,message:"LAVDEEE ALREADY EXISTS"})
        }
        const chatData = {
            chatName: communityName+"GenralChat",
            isGroupChat: true,
//            groupAdmin:decoded.id
        }
        console.log(chatData)
        const createdChat = await chatModel.create(chatData)
        
        const data = await new communityModel({name:communityName,introduction:introduction,genralChat:createdChat._id})
        await data.save()
        
        
        res.send({data,status:200,message:"Created"})
    }
    catch(e){
        console.log(e)
        res.send(e)
    }
}

module.exports.getCommuntities = async(req,res)=>{
    try{
        const data = await communityModel.find()

        res.send({data,status:200,message:"Created"})
    }
  catch(e){
        console.log(e)
    }
}


module.exports.sendBroadcast = async(req,res)=>{
  try{
      const {id} = req.params
      const data = req.body 
      const token = req.headers.authorization.split(' ')[1];
      const temp1 = jwt.verify(token, process.env.Skey, '', false);

      if(!id)
      {
          res.send("Not Found User").status(404)
      }
      if(!data)
      {
        res.send("Data Not Found").status(404)
      }


      const modelStore = new broadcastModel({
        user:temp1.id,
        context:data.context,
        commnunityId:id,
        requirments:data.require,
        finance:data.fin
      });

      await modelStore.save()
       
      res.status(200).json({message:"Broadcast succesfull"})

  }
  catch(e){
      console.log(e)
      res.json({error:e,message:e.message})
  }
}