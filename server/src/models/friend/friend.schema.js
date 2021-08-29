const mongoose = require('mongoose');

const FriendSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['applied', 'accepted', 'rejected', 'pending', 'deleted'],
    default: 'pending',
  },
});


module.exports = FriendSchema;
