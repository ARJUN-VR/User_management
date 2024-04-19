import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateTokens.js';


//@desc    user authentication
//route    POST api/users/auth
//@access  public
const userAuth=asyncHandler(async(req,res)=>{
  const {email , password} = req.body;

  const user = await User.findOne({email})
 

  if(user && (await user.matchPassword(password))){
    generateToken(res, user._id);
    res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email
    });
  }else{
    res.status(401);
    throw new Error('invalid username or password')
  }
});

//@desc    register user
//route    POST api/users
//@access  public
const registerUser = asyncHandler(async(req,res)=>{
  const {name,email,password} = req.body;


 const userExist = await User.findOne({email})

 if(userExist){
    res.status(400);
    throw new Error('User already exist')
 }

 const user = await User.create({
    name,
    email,
    password
 })
 if(user){
    generateToken(res,user._id)
    res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email
        
    })
 }else{
    res.status(400);
    throw new Error('invalid userdata')
 }

});

//@desc   logout user
//route   POST api/users/logout
//@access public
const logoutUser = asyncHandler(async(req,res)=>{
    res.cookie('jwt','',{
        httpOnly: true,
        expires:new Date(0)
    })
    res.status(200).json({message:"user logged out"})
});

//@desc   Get the user profile
//route   GET api/users/profile
//@access private
const getUserProfile = asyncHandler(async(req,res)=>{
  
    const user = {
      _id:req.user._id,
      name:req.user.name,
      email:req.user.email
    }

    res.status(200).json(user)
});

//@desc   update user profile
//route   PUT api/users/profile
//@access private
const updateUserProfile = asyncHandler(async(req,res)=>{
  const user = await User.findOne({_id:req.user._id})

  if(user){
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email


    if(req.body.password){
      user.password = req.body.password
    }
    const updatedUser = await user.save()

    res.status(200).json({
      _id:updatedUser._id,
      name:updatedUser.name,
      email:updatedUser.email
    })

  }else{
    res.status(400);
    throw new Error('user not found')
  }

});

const imageUpload = asyncHandler(async(req,res)=>{
res.status(200).json({message:'uploading...'})
})


export {
    userAuth,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    imageUpload
    
};