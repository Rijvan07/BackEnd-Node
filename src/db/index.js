    import mongoose from "mongoose";

    import { DB_NAME } from "../constants.js";

    const connectDB = async ()=>{
        try {
            // console.log('process.env.MONGODB_URL ==================== :', process.env.MONGODB_URL);
            // console.log('DB_NAME ======================== :', DB_NAME);
            // const URL = `${process.env.MONGODB_URL}/${DB_NAME}`
            const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
            console.log(`MongoDB Connected !! DB HOST : ${connectionInstance}`)
        } catch (error) {
            console.log("MongoDB Connection Failed...!", error);
            // throw error;
            process.exit(1);
        }
    }


export default connectDB;