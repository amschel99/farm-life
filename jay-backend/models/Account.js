const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    unique:true
  },
  coins: {
    type: String,
    required: true,
    default: '0',
  },
  points:{
    type: String,
    required: true,
    default: '0',
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
