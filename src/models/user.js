import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    email:{type: String, unique: true},
    firsname: String,
    lastname:String,
    password:String,
    avatar:String,

})

export const User = mongoose.model("User",userSchema);
