import mongoose from "mongoose";
import { DB_URI,NODE_ENV } from "../config/env.js";

if(!DB_URI){
    throw new error("Define DB_URI")
}

const connectToDatabase = async() =>{
    try{
        await mongoose.connect(DB_URI);
        console.log(`Connect to DB in ${NODE_ENV} mode`);
    }catch(error){
        console.error('Error connecting to DB: ', error);
        process.exit(1);
    }
}
export default connectToDatabase;