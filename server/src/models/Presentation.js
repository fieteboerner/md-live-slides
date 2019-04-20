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
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

PresentationSchema.pre('update', function() {
  this.update({},{ $set: { updatedAt: new Date() } });
});

module.exports = mongoose.model('Presentation', PresentationSchema);