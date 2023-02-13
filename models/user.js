const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name:String,
  email:String,
  password:String,
  userimage:String
});

const USER = mongoose.model('userdata', userSchema);
module.exports = USER;