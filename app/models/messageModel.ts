import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    message: String,
    isDeleted: {type: Boolean, default: false}

}, { timestamps: true })

export const messageModel = mongoose.model('message-records', messageSchema);