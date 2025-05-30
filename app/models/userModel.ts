import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    email: String,
    password: String,
    session: String,
    isDeleted: {type: Boolean, default: false}
})

export const userModel = mongoose.model('user-records', userSchema);