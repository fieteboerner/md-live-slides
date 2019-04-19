const path = require('path');
const express = require('express');
const app = express();
const router = express.Router();

const presentationController = require('./controllers/Presentation.js');

const clientPath = path.join(__dirname, '..', '..', 'client', 'dist');
const port = 8080;

router.get('/api/presentations',function(req,res){
  res.json(presentationController.index(req));
});

router.get('/api/presentation/:id',function(req,res){
  res.json(presentationController.show(req));
});

router.post('/api/presentation',function(req,res){
  res.json(presentationController.create(req));
});


router.use('*', function (req, res) {
    res.sendFile(path.join(clientPath, 'index.html'));
});

app.use(express.static(clientPath));
app.use('/', router);

app.listen(port, function () {
  console.log('App is listen')
})
