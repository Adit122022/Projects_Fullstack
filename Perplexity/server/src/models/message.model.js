import mongoose from  "mongoose"

const messageSchema = mongoose.Schema({
chat:{type:mongoose.Schema.Types.ObjectId, ref:"Chats", requied:true},
content:{type:String , required:true},
role:{ type :String , enum:['user', 'ai'], required :true},
} , {timestamps :true})

const messageModel = mongoose.model('Messages' , messageSchema);
export default messageModel