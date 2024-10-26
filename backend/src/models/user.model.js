import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
       fullname:{
        type:String,
        required:true,  
       },

     username:{
        type:String,
        required:true,
        unique:true,
     },
     email:{
        type:String,
        required:true,
       
     },
     gender:{
        type:String,
        required:true,
        enum:["male","female",]
     },
     password:{
        type:String,
        required:true,
     } ,
     profilepic:{
        type:String,
         
       default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
     },
     isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
   
},
{timestamp:true}
);
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10);
    return next();

});

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateAccessToken = function(){
   const token = jwt.sign(
    {
        _id:this._id,
        name:this.name,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.EXPIRY_TOKEN,
    }
   )
   return token
}

export const User = mongoose.model("User",userSchema)
