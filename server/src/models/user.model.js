const mongoose = require('mongoose');

const {
  BadRequestError,
} = require('../utils/errors');

const UserSchema = new mongoose.Schema({
// TODO: complete userSchema
// TODO: validate userSchema with shared joi validator
  email: {
    type: String,
    unique: true,
  },
  password: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
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
