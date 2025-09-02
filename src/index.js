
import dotenv from 'dotenv';
dotenv.config();
// import mongoose from "mongoose";
// import { Mongo_db_name }  from "./constants";
import connectDB from "./db/dbindex.js";   

connectDB();





/*

import express from "express";

const app = express();

( async () => {
    try {
        await mongoose.connect(` ${process.env.Mongo_db_url}/${Mongo_db_name} `)
        app.on("error" , (error) => {
            console.log("error", error);
            throw error;  
        })
        app.listen(process.env.PORT , () => {
            console.log(` app is listing at port ${process.env.PORT}`);
        })
    } catch (error) {
        console.log("error", error);
        throw error;
    }
})() */