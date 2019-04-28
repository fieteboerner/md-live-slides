const mongoose = require('mongoose');
const Parser = require('remark/src/remark/parser');

const PresentationSchema = new mongoose.Schema({
  key: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  title: {
      type: String,
      required: true,
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
    const slides = (new Parser()).parse(this.content);
    this.title = slides[0].properties.title || this.key;
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
        .select({ key: true, title: true, createdAt: true, updatedAt: true })
        .exec();
  },

  /**
   * @param {String} key
   * @api private
   */
  findByKey(key) {
      return this.findOne({ key })
        .select({ key: true, title: true, content: true, createdAt: true, updatedAt: true })
        .exec();
  }
};

module.exports = mongoose.model('Presentation', PresentationSchema);