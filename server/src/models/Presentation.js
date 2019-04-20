const mongoose = require('mongoose');

const PresentationSchema = new mongoose.Schema({
  key: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Presentation', PresentationSchema);