import io from 'socket.io-client';

const socket = io.connect({ path: '/api/socket' });

export default socket;