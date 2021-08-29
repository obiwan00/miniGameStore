const mongoose = require('mongoose');
const TagSchema = require('./tag.schema');

const Tag = mongoose.model('Tag', TagSchema);

module.exports = Tag;
