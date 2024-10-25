const User = require('../models/User');

const updateProfile = async (req, res) => {
  const { username, bio, profilePicture } = req.body;
  const user = await User.findById(req.user.id);
  user.username = username || user.username;
  user.bio = bio || user.bio;
  user.profilePicture = profilePicture || user.profilePicture;
  await user.save();
  res.json({ message: 'Profile updated successfully' });
};

module.exports = { updateProfile };
