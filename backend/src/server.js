const path = require('path');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const util = require('./helpers/util');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const EditorSocketIOServer = require('ot/lib/editor-socketio-server');
const { debounce } = require('throttle-debounce');

const { Presentation } = require('./models');

const app = express();
const server = http.Server(app);
const io = socketIo(server, { path: '/api/socket/document' });

const router = express.Router();

const PresentationController = require('./controllers/Presentation.js');

const clientPath = path.join(__dirname, '..', '..', 'client', 'dist');
const port = 8080;

router.use(bodyParser.json());
router.use(function (req, res, next) {
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

server.listen(port);

/**
 * handle collaboration socket connections
 */
const sessions = {};
async function getSession(id) {
    if (!(id in sessions)) {
        const presentation = await Presentation.findByKey(id)
        if (!presentation) {
            throw new Error(`Could not find Presentation with id: "${id}"`);
        }
        sessions[id] = new EditorSocketIOServer(presentation.content, [], id, null, savePresentation);
    }
    return sessions[id];
}

const savePresentation = debounce(1000, async function(key, content) {
    const attributes = {
        content,
        updatedAt: new Date,
    };
    const presentation = await Presentation
        .findOneAndUpdate({ key }, attributes, { new: true })
        .exec();
});

io.on('connection', async (socket) => {
    const handshakeData = socket.request;
    const { docId } = handshakeData._query;
    try {
        const session = await getSession(docId, socket);
        session.addClient(socket);
    } catch (error) {
        socket.disconnect();
        console.log(`Socket was closed because of an error: ${error.message}`);
    }
});

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
