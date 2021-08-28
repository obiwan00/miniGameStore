const mongoose = require('mongoose');

const {
  BadRequestError,
} = require('../../utils/errors');


const GameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    minlength: 2,
    maxlength: 400,
    required: true,
  },
  downloadLink: {
    type: String,
    required: true,
  },
  shareLink: {
    type: String,
    required: true,
  },
  tags: {
    type: [mongoose.Types.ObjectId],
    ref: 'Tag',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

GameSchema.post('findOne', function(resUserDoc) {
  if (!resUserDoc) {
    throw new BadRequestError('There is no such game');
  }
});

GameSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new BadRequestError('Name of Game must be unique'));
  } else {
    next(error);
  }
});


module.exports = GameSchema;
