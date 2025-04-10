// require('dotenv').config({path:'./env'})

import dotenv from "dotenv";

// import mongoose from 'mongoose';
// import { DB_NAME } from './constants';

// import express from express
// const app = express()

import connectDB from './db/index.js';

dotenv.config({
    path:'./env'
})

connectDB()
.then(()=>{
    app.on("error", (error)=>{
        console.log("ERROR :", error);
        throw error
    });
    app.listen(process.env.PORT || 8000, () =>{
        console.log(`Server is runing at port : ${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.log("MONGODB Connection Failed...!", error);
})










// ( async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`)
//         app.on("error", (error)=>{
//             console.log("ERROR :", error);
//             throw error
//         });
//         app.listen(process.env.PORT,()=>{
//             console.log(`DB Connect on ${process.env.PORT}`)
//         })
//     } catch (error) {
//         console.log("ERROR : ", Error);
//         throw error
//     }
// })()