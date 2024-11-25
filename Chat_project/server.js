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
    client.on('disconnect', () => {
        console.log(`사용자 나갔습니다... ${connectedClientUsername}`);
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