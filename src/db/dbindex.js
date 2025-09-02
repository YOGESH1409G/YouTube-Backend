import mongoose from "mongoose";
import { Mongo_db_name } from "../constants.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.Mongo_db_url}/${Mongo_db_name}`)
        console.log(`MONGODB conected !! DB host : ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MONGODB connection error", error);
        process.exit(1);
    }
}

export default connectDB;