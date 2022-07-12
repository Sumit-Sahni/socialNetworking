 const express = require('express');
 const asyncHandler = require("express-async-handler");
const User = require('../models/userModel');
const Post = require('../models/postModel');


const addBlog = asyncHandler(async(req,res)=>{
    const newPost = new Post(req.body);
    try {
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
})


//update a post*********************************************************
const updateById = asyncHandler(async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
          await post.updateOne({ $set: req.body });
          res.status(200).json("the post has been updated");
        } else {
          res.status(403).json("you can update only your post");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    
})

// //like / dislike a post
 const updateLikes = asyncHandler(async(req,res)=>{
    try {
        const post  = await Post.findById(req.params.id);
       if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes: req.body.userId}})
            return res.status(201).json("Post Liked")
       }else{
        await post.updateOne({$pull:{likes: req.body.userId}})
        return res.status(201).json("Post DisLiked")
       }
     } catch (error) {
     return  res.status(500).json(err);
     }
})


//  get a post by id

const getById = asyncHandler(async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
      } catch (err) {
        res.status(500).json(err);
      }
})


// get all posts
 const getEverythings = asyncHandler(async(req,res)=>{
    try {
        const currentUser = await User.findById(req.body.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
          currentUser.followings.map((friendId) => {
            return Post.find({ userId: friendId });
          })
        );
        res.json(userPosts.concat(...friendPosts))
      } catch (err) {
        res.status(500).json(err);
      }
 })


module.exports = {addBlog, updateById, updateLikes, getById, getEverythings};