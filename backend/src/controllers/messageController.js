import { Message } from "../models/messageModel.js";
 // Corrected capitalization of 'Message'
import { Conversation } from "../models/conservationModel.js"; // Corrected typo

export const sendMessage = async (req, res, next) => {
    try {
        const { message } = req.body;
        const { reciverId } = req.params; // This should match your front-end parameter name
        const senderId = req.user._id;
         console.log( senderId, "error");
        // Find an existing conversation between sender and receiver
        let chats = await Conversation.findOne({
            participants: { $all: [senderId, reciverId] }
        });

        // If no conversation exists, create one
        if (!chats) {
            chats = await Conversation.create({
                participants: [senderId, reciverId]
            });
        }

        // Create a new message
        const newMessage = new Message({
            senderId,
            receiverId: reciverId,  // Ensure the field name matches your schema
            message,
            conservationId: chats._id
        });

        // Save the message
        await newMessage.save();

        // Push the message reference into the conversation's messages array
        chats.messages.push(newMessage._id);

        // Save the updated conversation
        await chats.save();

        // Respond with the new message
        res.status(201).send(newMessage);

        // SOCKET.IO function call (if you need to notify users in real-time)

    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ message: "Server error" });
        next(error);
    }
};

 export const getMessages = async (req, res, next) => {
        try{
                     
               const {reciverId} = req.params;
            //    console.log(req.params, "error");
               const senderId = req.user._id;
               console.log( senderId, reciverId  , "error");
               if(!reciverId)  return res.status(400).send({message:"reciverId is required"});
               if(!senderId)  return res.status(400).send({message:"senderId is required"});
               const chats =  await Conversation.find({ 
                          participants : {$all : [senderId, reciverId]}
                        }).populate("messages");
            
                    if(!chats)  return res.status(500).send({message:"No chat found"});
                    //console.log(chats, "chats hai");
                    res.status(200).send(chats[0].messages);
        }catch (error) {
            console.error("Error occurred:", error);
            res.status(500).json({ message: "Server error" });
            next(error);
        }
}