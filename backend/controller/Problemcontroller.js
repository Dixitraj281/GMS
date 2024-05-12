const express = require('express');
// // const multer=require('multer');
const GrivenceSchema=require('../models/Grivence');
const User=require('../models/user');
const grivence = require('../models/Grivence');

   const Problemplus=async(req,res)=>{
    try {
      const { userId
      } = req.body;
  
      console.log(userId);
  
      const data = await grivence.find({user: userId});
  
      return res.status(200).json({
        success: true,
        problem: data
      });
    } catch (err) {
      return res.status(401).json({
        success: false,
        messages: err.message,
      });
    }
   }

   const problemdata_admin=async(req,res)=>{
    try {
      const { depart
      } = req.body;
  
      // console.log(userId);
  
      const data = await grivence.find({department: depart});
  
      return res.status(200).json({
        success: true,
        problem: data
      });
    } catch (err) {
      return res.status(401).json({
        success: false,
        messages: err.message,
      });
    }
   }

   const problemdata_super=async(req,res)=>{
    try {
      // const { depart
      // } = req.body;
  
      // console.log(userId);
  
      const data = await grivence.find({});
  
      return res.status(200).json({
        success: true,
        problem: data
      });
    } catch (err) {
      return res.status(401).json({
        success: false,
        messages: err.message,
      });
    }
   }

   const updateStatus=async(req,res)=>{
    try {  
      console.log("hello");
      const { status,id } = req.body;
      console.log(status,id);
      const grivenceElement = await GrivenceSchema.findById(id);
  
      if (!grivenceElement) {
        return res.status(400).json({
          success: false,
          message: "entry not found",
        });
      }
      if (status) {
        grivenceElement.status = status;
      }
  
      await grivenceElement.save();
  
      return res.status(200).json({
        success: true,
        message: `Status Updated Successfully`,
        data: grivenceElement,
      });
    } catch (err) {
      return res.status(401).json({
        success: false,
        messages: err.message,
      });
    }
   }
module.exports={Problemplus,problemdata_admin,problemdata_super,updateStatus};