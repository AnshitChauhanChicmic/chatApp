import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    email: String,
    password: String
})

export const userModel = mongoose.model('userRecords', userSchema);