import mongoose, {Schema} from "mongoose";

const chatMessageSchema = new Schema({
chat:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Chat"
},
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
},
message:String,
type:{
    type:String,
    enum:["TEXT","IMAGE"]
}
},
{
    timestamps : true
}
)

export const chatMessage = mongoose.model("chatMessage",chatMessageSchema);