const mongoose = require('mongoose');

// Define user schema
const GrivenceSchema = new mongoose.Schema({
  subdepartment:{
    type:String,
  },
  problem:{
      type:String,
  },
  Image:{
    type:String,
  },
  department:{
     type:String,
  },
  token:{
   type:String,
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
  },
  createdAt: {
        type:Date,
        default: Date.now,
 },
 status:{
    type:String,
    default:'pending',
 }
});

// Create user model
const grivence = mongoose.model('grivence', GrivenceSchema);

module.exports = grivence;
