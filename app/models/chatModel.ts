import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    senderId: mongoose.Types.ObjectId,
    receiverId: mongoose.Types.ObjectId,
    group: String

}, { timestamps: true })

export const chatModel = mongoose.model('chat-records', chatSchema);