const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const {msgModel} = require("../../Models/msgModel")
const {chatModel} = require("../../Models/chatModel")
const {signupmodel} = require("../../Models/signupmodel")
const mongoose = require("mongoose")


module.exports.messageSendBody = asyncHandler(async (req, res) => {
    try {
        const data = req.body.content;
        const {id} = req.params;
        const token = req.headers.authorization.split(' ')[1];
        const temp1 = jwt.verify(token, process.env.Skey, '', false);

        if (!data || !id) {
            return res.send("Moey Moey").status(404);
        }

        let createMsg = {
            sender: temp1.id,
            content: data,
            chat: id
        };

        console.log(createMsg);

        let msg = await new msgModel(createMsg)
        msg = await msg.populate("chat")

        await chatModel.findByIdAndUpdate(id, {
            latestMessage: msg
        })
        msg.save()
        res.json(msg)
    } catch (e) {
        console.log(e);
        res.status(500).send("Internal Server Error");
    }
});


module.exports.messageGetBody = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
        const token = req.headers.authorization.split(' ')[1];
        const temp1 = jwt.verify(token, process.env.Skey, '', false);

        if (!id) {
            return res.send("User does not exist").status(404);
        }

        let msgs = await msgModel.find({ chat: id })

        let modifiedMsgs = [];
        for (const NewMsg of msgs) {
            const id = NewMsg.sender;
            let modifiedMsg;
            if (id == temp1.id) {
                const userData = await signupmodel.findById(id, "firstName lastName engineerType1");
                modifiedMsg = { ...NewMsg._doc, ...userData._doc, status: true };
            } else {
                const userData = await signupmodel.findById(id, "firstName lastName engineerType1");
                modifiedMsg = { ...NewMsg._doc, ...userData._doc, status: false };
            }
            modifiedMsgs.push(modifiedMsg);
        }
        console.log(modifiedMsgs);
        res.json(modifiedMsgs);

    } catch (e) {
        console.log(e);
    }
})