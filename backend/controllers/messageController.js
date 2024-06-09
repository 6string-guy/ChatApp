import expressAsyncHandler from "express-async-handler"
import Message from '../models/messageModel.js'
import User from "../models/userModel.js"
import Chat from "../models/chatModel.js"
const sendMessage = expressAsyncHandler(async (req, res) => {
    
    const { content, chatId } = req.body
    if (!content || !chatId)
    {
        console.log("Invalid data passed into request")
        return res.sendStatus(400)
    }
    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId
    }
    try {
        var message = await Message.create(newMessage);

        message=await message.populate("sender", "name pic")
        
        message = await message.populate("chat", "name pic")
       
        message = await User.populate(message, {
            path: ' chat.users',
            select :"name pic email",
            
        })
        
     
        await Chat.findByIdAndUpdate(req.body.chatId, {
            latestMessage:message
        })
        //console.log( "ok")
        res.json(message)
        
    } catch (error) {
        res.status(400);
        throw  console.error();;
        
    }
    


})
const allMessages = expressAsyncHandler(async (req, res) => {});

export { sendMessage, allMessages };