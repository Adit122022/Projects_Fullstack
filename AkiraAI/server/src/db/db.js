import mongoose from "mongoose"

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/AkiraAI_DB"
export const connectDB = () => {
    mongoose.connect(MONGO_URI) 
        .then(() => console.log('\x1b[1m MongoDB Connected...✅✅✅ ...\x1b[0m'))
        .catch(err => console.log(err));
}
