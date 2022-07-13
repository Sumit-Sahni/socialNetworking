const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const User = require("../models/userModel");
const generateToken = require("../util/generateToken");





  const registerUser = asyncHandler(async(req,res)=>{
   const {name,email,password,pic,describe,phone, date, gender,college , about} = req.body;

   const userExist = await User.findOne({email});

   if(userExist){
         return res.status(400).json({
              msg: "User already exist"
         })
   }
 
    const user = await User.create({
        name,
        email,
        password,
        pic,
        describe,
        phone,
        date,
        gender,
        college,
        about,
    });
  
     if(user){
          res.status(201).json({
              _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                pic: user.pic,
                describe: user.describe,
                phone: user.phone,
                data: user.date,
                gender:user.gender,
                college:user.college,
                about:user.about,
                token: generateToken(user._id),
          });
     }else{
         res.status(400);
         throw new Error("Error Occured");
     }
});


const authUser = asyncHandler(async(req,res)=>{

     const {email, password} = req.body;

     const user = await User.findOne({ email });
  
     if( user && (await user.matchPassword(password))){
         res.json({
             _id: user._id,
             name:user.name,
             email:user.email,
             isAdmin:user.isAdmin,
             pic:user.pic,
             describe:user.describe,
             phone:user.phone,
             token: generateToken(user._id),
         });
    }
     else{
        res.status(400);
        throw new Error("Invalid");
     }
 });

  const getUser = asyncHandler(async(req,res)=>{
        const data  = await User.find();
        res.send({data});

  })
  
 
  const getUserById = asyncHandler(async(req,res)=>{
    try {
      const users = await User.findById(req.params.id).populate("posts");
       return res.status(200).json(users);
  } catch (error) {
     return res.status(500).json(error);
  }
  })

  const updateUser = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    const user = await User.findById(id);
    if(user){
     user.phone = req.body.phone || user.phone;
     user.gender = req.body.gender || user.gender;
     user.date = req.body.date || user.date;
     user.about = req.body.about || user.about;
     user.college = req.body.college || user.college;
    }
    const updateItem = await user.save();
      res.json({
        phone: updateItem.phone,
      });
  })
   

   
//  *****************************************FOLLOW/UNFOLLOW*******************************************************
    

module.exports = {
    registerUser,
     authUser,
     getUser, 
     getUserById,
     updateUser, 
 };