import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type : String,
        required : [true, 'User Name required'],
        trim: true,
        minLength: 2,
        maxLength: 50
    },
    email: {
        type:String,
        required: [true,'Email required'],
        unique:true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // basic email format
    },
    password: {
        type: String,
        required: [true,'Password is required'],
        minLength:6
    }
}, {timestamps:true});

const User = mongoose.model('User',userSchema);

export default User;