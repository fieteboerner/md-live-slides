const path = require('path');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { debounce } = require('throttle-debounce');
const EditorSocketIOServer = require('ot/lib/editor-socketio-server');
const config = require('./config');
const util = require('./helpers/util');

const presentationRoutes = require('./routes/presentations');
const { Presentation } = require('./models');

const app = express();
const server = http.Server(app);
// const io = socketIo(server, { path: '/api/socket' })
const ioDocument = socketIo(server, { path: '/api/socket/document' });

const clientPath = path.join(__dirname, '..', '..', 'client', 'dist');
const port = 8080;

app.use(bodyParser.json());
app.use(function (req, res, next) {
    util.sanitize(req.query);
    next();
});

app.use('/api/presentation', presentationRoutes);

app.use('*', function (req, res) {
    res.sendFile(path.join(clientPath, 'index.html'));
});

app.use(express.static(clientPath));

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
    const presentation = await Presentation.findByKey(key);
    presentation.content = content;
    await presentation.save();
});

ioDocument.on('connection', async (socket) => {
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
        mongoose.connect(uri, { useNewUrlParser: true });
        mongoose.set('useCreateIndex', true);
    })
}
