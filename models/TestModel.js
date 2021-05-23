var mongoose = require('mongoose');

var TestSchema = new mongoose.Schema({
  username: {
      type: String,
      required: true
  },
  // causes DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
  postID: {
      type: mongoose.Schema.Types.ObjectId,
      default: mongoose.Types.ObjectId,
      index: { unique: true }
  },
  profpic: {
      type: Number,
      required: false
  },
  postedAt: {
      type: Date,
      default: Date.now
  },
  title: {
      type: String
  },
  content: {
      type: String
  },
  rating: {
      type: Number
  },
  comments: [{
      username: {
          type: String,
      },
      profpic: {
          type: Number,
      },
      repliedAt: {
          type: Date,
          default: Date.now
      },
      comment: {
          type: String
      }
  }]
});

module.exports = mongoose.model('Test', TestSchema);
