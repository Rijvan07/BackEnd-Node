import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const userSchema = new Schema({
    userName:{
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email:{
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullName:{
        type: String,
        require: true,
        trim: true,
        index: true
    },
    avatar:{
        type: String, //cloudinary URL GET
        require: true,
    },
    coverImage:{
        type: String, //cloudinary URL GET
    },
    watchHistory:[
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password:{
        type:String,
        required: [true, 'Password is required'] 
    },
    refreshToken:{
        type: String
    }
}, {timestamps:true});

userSchema.pre("save", async function (next) {
    
    // if(this.isModified("password")){
        //     this.password = bcrypt.hash(this.password, 10)
        //     next()
        // } 
        
    // ------------------- OR ------------------//

    if(!this.isModified("password")) return next(); //OR
        
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.userName,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)