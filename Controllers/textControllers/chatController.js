const asyncHandler = require('express-async-handler')
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")

const {signupmodel} = require("../../Models/signupmodel")
const {chatModel} = require("../../Models/chatModel")



module.exports.accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    const extrackingJWT = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(extrackingJWT,process.env.Skey,'' ,false)
    if (!userId) {
      console.log("Userid not sent");
      return res.sendStatus(400);
    }
  
    var isChat = await chatModel.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: decoded.id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");
  
    isChat = await signupmodel.populate(isChat, {
      path: "latestMessage.sender",
      select: "firstName lastName",
    });
  
    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      var chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [decoded.id, userId],
      };
  
      try {
        const createdChat = await chatModel.create(chatData);
        const FullChat = await chatModel.findOne({ _id: createdChat._id }).populate(
          "users",
          "-password"
        );
        res.status(200).json(FullChat);
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }
    }
})

module.exports.fetchChats = asyncHandler(async (req, res) => {
  try {
      const extrackingJWT = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(extrackingJWT,process.env.Skey,'' ,false)
      const id = decoded.id
      console.log(id)
      const result = await chatModel.find({ users: { $elemMatch: { $eq: decoded.id } }})
          .populate({ path: 'users', select: 'firstName lastName' })
          .populate("latestMessage")
          .sort({ updatedAt: -1 });

      if (result.length === 0) {
          return res.status(404).send({ message: 'Chats not found' });
      }

      const populatedResult = await signupmodel.populate(result, {
          path: "latestMessage.sender",
          select: "firstName lastName"
      }); 
      res.status(200).send(populatedResult);
  } catch (e) {
      console.log(e);
      res.status(500).send({ message: 'Internal Server Error' });
  }
})

module.exports.crtGroupChat = asyncHandler(async (req, res) => {
  const { userIds, chatName } = req.body;
  const extractingJWT = req.headers.authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(extractingJWT, process.env.Skey, '', false);
    if (!userIds || !userIds.length) {
      console.log("User IDs not sent");
      return res.sendStatus(400);
    }
    const chatData = {
      chatName: chatName,
      isGroupChat: true,
      groupAdmin:decoded.id,
      users: userIds.map((id) => id),
    };
    console.log(chatData)
    const createdChat = await chatModel.create(chatData);
    const fullChat = await chatModel.findOne({ _id: createdChat._id })
      .populate("users", "-password");

    res.status(200).json(fullChat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})