import asyncHandler from 'express-async-handler'

//@desc    user authentication
//route    POST api/users/auth
//@access  public
const userAuth=asyncHandler(async(req,res)=>{

  res.status(200).json({message:'user authentication route'})

});

//@desc    register user
//route    POST api/users
//@access  public
const registerUser = asyncHandler(async(req,res)=>{
    res.status(200).json({message:'Register User'});
});

//@desc   logout user
//route   POST api/users/logout
//@access public
const logoutUser = asyncHandler(async(req,res)=>{
    res.status(200).json({message:'logout route'});
});

//@desc   Get the user profile
//route   GET api/users/profile
//@access private
const getUserProfile = asyncHandler(async(req,res)=>{
    res.status(200).json({message:'user profile'});
});

//@desc   update user profile
//route   PUT api/users/profile
//@access private
const updateUserProfile = asyncHandler(async(req,res)=>{
    res.status(200).json({message:'update user profile'});
});





export {
    userAuth,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
};