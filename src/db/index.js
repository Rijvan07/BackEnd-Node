    import mongoose from "mongoose";

    import { DB_NAME } from "../constants.js";

    const connectDB = async ()=>{
        try {
            const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
            console.log(`MOngoDB Connected !! DB HOST : ${connectionInstance}`)
        } catch (error) {
            console.log("MongoDB Connection Failed...!", error);
            // throw error;
            process.exit(1);
        }
    }


export default connectDB;