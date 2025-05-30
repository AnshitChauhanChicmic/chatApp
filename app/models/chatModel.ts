import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    senderId: mongoose.Types.ObjectId,
    receiverId: mongoose.Types.ObjectId,
    group: String,
    isDeleted: {type: Boolean, default: false}

}, { timestamps: true })

export const chatModel = mongoose.model('chat-records', chatSchema);