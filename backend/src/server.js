const path = require('path');
const express = require('express');
const util = require('./helpers/util');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
const router = express.Router();

const PresentationController = require('./controllers/Presentation.js');

const clientPath = path.join(__dirname, '..', '..', 'client', 'dist');
const port = 8080;

router.use(bodyParser.json());
router.use(function(req, res, next) {
    util.sanitize(req.query);
    next();
});

router.get('/api/presentations', PresentationController.index);
router.post('/api/presentation', PresentationController.create);
router.get('/api/presentation/:id', PresentationController.show);
router.put('/api/presentation/:id', PresentationController.update);

router.use('*', function (req, res) {
    res.sendFile(path.join(clientPath, 'index.html'));
});

app.use(express.static(clientPath));
app.use('/', router);

app.listen(port, function () {
  console.log('App is listen')
})


connectDatabase(config.database);

function connectDatabase(uri) {
  return new Promise((resolve, reject) => {
    mongoose.connection
      .on('error', error => reject(error))
      .on('close', () => console.log('Database connection closed.'))
      .once('open', () => resolve(mongoose.connections[0]))
    mongoose.connect(uri);
  })
}