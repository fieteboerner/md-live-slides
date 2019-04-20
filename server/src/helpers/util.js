const mongoSanitize = require('mongo-sanitize');

function mongoSanitizeRecurse(obj) {
  mongoSanitize(obj)
  Object.keys(obj).forEach((key) => {
      const child = obj[key];
      if (child instanceof Object) {
          mongoSanitizeRecurse(child);
      }
  })
}

module.exports = {
    sanitize(obj) {
        mongoSanitizeRecurse(obj);
    }
};