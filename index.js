const fs = require('fs');
const { PeerServer } = require('peer');

require('dotenv').config();

let port = process.env.PORT ? Number(process.env.SSL_CERT_FILE_PATH) : 9000;
let ssl = undefined;
if (process.env.SSL_KEY_FILE_PATH && process.env.SSL_CERT_FILE_PATH) {
    ssl = {
        key: fs.readFileSync(process.env.SSL_KEY_FILE_PATH),
        cert: fs.readFileSync(process.env.SSL_CERT_FILE_PATH)
    }
}
console.log("Running peerjs server at port: " + port);
const peerServer = PeerServer({
    port,
    ssl,
});

peerServer.on('connection', (client) => {
    console.log("Client: " + client.getId() + " connected");
});

peerServer.on('disconnect', (client) => {
    console.log("Client: " + client.getId() + " disconnected");
});