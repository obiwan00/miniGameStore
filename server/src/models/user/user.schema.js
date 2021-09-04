const mongoose = require('mongoose');

const {
  BadRequestError,
} = require('../../utils/errors');
const FriendSchema = require('../friend/friend.schema');


const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    default: null,
    minlength: 2,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    default: null,
  },
  friends: {
    type: [FriendSchema],
  },
  library: {
    type: [mongoose.Types.ObjectId],
    ref: 'Game',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

UserSchema.post('findOne', function(resUserDoc) {
  if (!resUserDoc) {
    throw new BadRequestError('There isn`t any user with such id');
  }
});

UserSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new BadRequestError('Email must be unique'));
  } else {
    next(error);
  }
});

module.exports = UserSchema;
