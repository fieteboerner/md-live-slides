const mongoose = require('mongoose')
const config = require('./../config')

function connectDatabase(uri) {
  return new Promise((resolve, reject) => {
    mongoose.connection
      .on('error', error => reject(error))
      .on('close', () => console.log('Database connection closed.'))
      .once('open', () => resolve(mongoose.connections[0]))
    mongoose.connect(uri);
  })
}

connectDatabase(config.database);

exports.Presentation = require('./Presentation');