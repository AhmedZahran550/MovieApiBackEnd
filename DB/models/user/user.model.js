
import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    first_name: {
        type:String,
        require:true 
    } ,
    last_name: {
        type:String,
        require:true 
    },
    age: {
        type:String,
        require:true 
    },
    email: {
        type:String,
        require:true ,
        unique:true
    },
    verifyEmail:{
       type:Boolean, 
       default:false
    },
    password: {
        type:String,
        require:true ,
    },
    isActive:{
        type:Boolean,
        default:true
    },
    code:String ,
},{
    timestamps:true ,
});


export const userModel =mongoose.models.User || mongoose.model('User', userSchema);

