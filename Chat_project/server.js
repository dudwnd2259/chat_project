import { Server } from "socket.io";
import express from "express";
import * as http from "http";
import ViteExpress from "vite-express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
      }
});

io.on('connection', (client) => { /* .... */ 
    
    console.log(client.handshake.query);
    
    const connectedClientUsername = client.handshake.query.username;

    console.log(`사용자 들어왔습니다. ${connectedClientUsername}`);

    client.broadcast.emit('new message', {username: "관리자", message: `[${connectedClientUsername}]님이 방에 입장했습니다.`});

    client.on('new message', (msg) => {
        console.log(`보낸 사용자  ${connectedClientUsername}`);
        console.log(msg);
        // io.emit('new message', {username: "관리자", message: `[${connectedClientUsername}]님이 방에 나갔습니다.`});
        io.emit('new message', {username: msg.username, message: msg.message} );
    });

    client.on('disconnect', () => {
        console.log(`사용자 나갔습니다... ${connectedClientUsername}`);
        io.emit('new message', {username: "관리자", message: `[${connectedClientUsername}]님이 방에 나갔습니다.`});
    });
});
server.listen(3000, () => { 
    /* ... */ 
    console.log('Server is listening on port 3000');
});

app.get("/message", (_, res) => {
    res.send("Hello from express")
});

ViteExpress.bind(app, server);