import io from 'socket.io-client';
import SocketIOAdapter from 'ot/lib/socketio-adapter';
import CodeMirrorAdapter from 'ot/lib/codemirror-adapter';
import EditorClient from 'ot/lib/editor-client';

export default class CodeMirrorSocket {
    constructor(options, cm) {
        this.options = options;
        this.cm = cm;

        this.socket = io.connect(this.options);
        this.socket.on('doc', (data) => {
            this.cm.setValue(data.str);
            this.serverAdapter = new SocketIOAdapter(this.socket);
            this.editorAdapter = new CodeMirrorAdapter(this.cm);
            this.editorClient = new EditorClient(data.revision, data.clients, this.serverAdapter, this.editorAdapter);
        });
    }


    disconnect() {
        if (this.editorAdapter) {
            this.editorAdapter.detach();
        }
        this.socket.disconnect();
    }
};