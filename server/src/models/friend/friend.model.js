const mongoose = require('mongoose');
const FriendSchema = require('./friend.schema');

const Friend = mongoose.model('Friend', FriendSchema);

module.exports = Friend;
