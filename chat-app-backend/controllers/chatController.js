const Message = require('../models/Message');

const getMessages = async (req, res) => {
  const messages = await Message.find().populate('sender');
  res.json(messages);
};

module.exports = { getMessages };
