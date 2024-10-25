const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  mobile: { type: String, required: true, unique: true },
  password: { type: String },
  profilePicture: String,
  username: String,
  bio: String,
});
module.exports = mongoose.model('User', userSchema);
