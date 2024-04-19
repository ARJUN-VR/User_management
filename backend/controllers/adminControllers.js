import asyncHandler from "express-async-handler";
import { Admin } from "../models/adminModel.js";
import generateToken from "../utils/generateTokens.js";
import User from "../models/userModel.js";

//@desc    admin registeration
//route    POST api/admin/sign
//@access  public
const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const admin = await Admin.create({
    name,
    email,
    password,
  });
  if (admin) {
    generateToken(res, admin._id);
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      message: "admin data added",
    });
  } else {
    res.status(400);
    throw new error("invalid admindata");
  }
});

//@desc    admin authentication
//route    POST api/admin
//@access  public
const adminAuth = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });



  if (admin && (await admin.matchPassword(password))) {
    generateToken(res, admin._id);
    res.status(200).json({
      _id:admin._id,
      name:admin.name,
      email:admin.email
     });
  } else {
    res.status(401);
    throw new Error("invalid credentials");
  }
});

//@desc    admin home
//route    GET api/admin/data
//@access  private
const adminHome = asyncHandler(async (req, res) => {
  const users = await User.find();
  console.log(users);


  res.status(200).json(users);
});

// @desc    admin logout
//route    POST api/admin/logout
//@access  public

const adminLogout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "admin logout route" });
});

//@desc    admin userEdit
//route    POST api/admin/edit
//@access  private

const userEdit = asyncHandler(async (req, res) => {

  const userid = req.body.userId
  const user = await User.findOne({_id:userid})

  if(user){
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    await user.save()
    res.status(200).json({ message: "userdata edit" });
  }else{
    res.status(400);
    throw new Error('cant update user')
  }

  
});

//@desc    admin userDelete
//route    POST api/admin/delete
//@access  private
const dltUser = asyncHandler(async(req,res)=>{
  const userId = req.body.userId
  if (userId) {
    try {
      const deletedUser = await User.findByIdAndDelete(userId);
      if (deletedUser) {
        res.json({ message: "User deleted successfully" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting user" });
    }
  } else {
    res.status(400).json({ message: "Invalid user ID" });
  }
})

export { adminAuth, adminHome, userEdit, adminLogout, registerAdmin,dltUser };
