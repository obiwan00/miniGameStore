const mongoose = require('mongoose');

const {
  BadRequestError,
} = require('../utils/errors');

const FriendSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
});

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
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

UserSchema.post('findOne', function(resUserDoc) {
  if (!resUserDoc) {
    throw new BadRequestError('There is no such user');
  }
});

UserSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new BadRequestError('Email must be unique'));
  } else {
    next(error);
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
