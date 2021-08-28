const mongoose = require('mongoose');

const {
  BadRequestError,
} = require('../../utils/errors');


const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

TagSchema.post('findOne', function(resUserDoc) {
  if (!resUserDoc) {
    throw new BadRequestError('There is no such Tag');
  }
});

TagSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new BadRequestError('Name of Tag must be unique'));
  } else {
    next(error);
  }
});

module.exports = TagSchema;
