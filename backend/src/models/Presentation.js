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

PresentationSchema.pre('save', function() {
    this.updatedAt = new Date();
});

// PresentationSchema.post('save', function() {
//     console.log('notify clients of ', this);
// });


PresentationSchema.statics = {
   /**
   * @param {Object} criteria
   * @api private
   */
  list(criteria = {}) {
    return this.find(criteria)
        .sort({ updatedAt: -1 })
        .select({ key: true, createdAt: true, updatedAt: true })
        .exec();
  },

  /**
   * @param {String} key
   * @api private
   */
  findByKey(key) {
      return this.findOne({ key })
        .select({ key: true, content: true, createdAt: true, updatedAt: true })
        .exec();
  }
};

module.exports = mongoose.model('Presentation', PresentationSchema);