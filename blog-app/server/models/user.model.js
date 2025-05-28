import mongoose from "mongoose";
 
const userSchema = new mongoose.Schema({
    
    role:{
        type:String,
        default:'user', 
        required : true, 
        trim:true, 
        enum:['user', 'admin']

    } ,
    firstName:{
      type : String, 
      required:true, 
      trim:true, 

    },
     email:{
      type : String, 
      required:true, 
      trim:true,  
      unique:true,
      
    } ,
     password:{
      type : String, 
      required:true, 
      trim:true,  
      
    }, 
    bio:{
      type : String, 
      trim:true,  
      
    }, 
      avatar:{
      type : String, 
      trim:true,  
      
    },
    
})  

const User = mongoose.model('User', userSchema, 'users') 
export  default User

