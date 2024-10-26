import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,  // Correct capitalization of `Schema`
        ref: "User"
    },
    message: {
        type: String,
        trim: true
    },
    conservationId: {  // 'conservationId' is correct as per your logic
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation"
    }
}, { timestamps: true });

export const Message = mongoose.model("Message", messageSchema);
