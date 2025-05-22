import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    group: String,
    participants: [mongoose.Types.ObjectId],

}, { timestamps: true })

export const chatModel = mongoose.model('chat-records', chatSchema);