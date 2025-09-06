import mongoose , {Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
username:{
    type:String, 
    required:true,
    unique:true,
    trim:true,
    lowercase:true,
    index:true
},
email: {
    type:String, 
    required:true,
    unique:true,
    trim:true,
    lowercase:true,
},
Fullname: {
    type:String, 
    required:true,
    trim:true,
    index:true
},
email: {
    type:String, 
    required:true,
    unique:true,
},
password: {
    type:String, 
    required:[true, "Password is required"],
    minlength:[6, "Password must be at least 6 characters long"]
},
avatar :{
    type:String,
    required : true,
    default : "https://api.dicebear.com/9.x/adventurer-neutral/svg"

},
whatchHistory :[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
    }
],

refreshToken: {
    type:String
},

}, {timestamps:true})



userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {userId: this._id, username: this.username},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN}
    );
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {userId: this._id, username: this.username},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN}
    );
}

     

export const User = mongoose.model("User", userSchema)