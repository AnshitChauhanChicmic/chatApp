import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: mongoose.Types.ObjectId,
    receiverId: mongoose.Types.ObjectId,
    group: String,
    message: String,

}, { timestamps: true })

export const messageModel = mongoose.model('message-records', messageSchema);