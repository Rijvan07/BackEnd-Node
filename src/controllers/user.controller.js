
import { asyncHandler } from "../utils/asyncHandler.js";

import {ApiError} from "../utils/ApiError.js";

import {User} from "../models/user.model.js";

import {uploadOnCloudinary} from "../utils/cloudinary.js";

import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler( async (req, res)=>{

    // Algorithem ---->
    //get user deatils from user
    //validation  -> not empty
    //check if user already exists : username, email
    //check for images
    //check for avatar
    // if availabe then upload coludinary, avarat
    //create user object - create entry in DB
    // remove password & refershToken filed from resonse
    //check for user creation
    // return resqponse when user creation

    const { fullName, email, userName, password } = req.body;
    console.log('req.body ===>> :', req.body);

    if ( [fullName, email, userName, password].some((fields) => fields?.trim === "")){
        throw new ApiError(400, "All fields are required..!");
    }       

    const existedUser = User.findOne({
        $or:[
            {userName},
            {email},
        ]
    });

    if(existedUser){
        throw new ApiError(400, "User already exsisted...!")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;

    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocal) {
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new ApiError(400, "Avatar file is required")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage : coverImage?.url || "",
        email,
        password,
        userName : userName.toLowerCase()
    })

    const createUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createUser) {
        throw new ApiError(400, "Something went wrong in registering the user")
    }

    return res.status(200).json(
        new ApiResponse(200, createUser, "User register Successfully")
    )
})

export {registerUser}


