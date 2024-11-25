import { Server } from "socket.io";
import express from "express";
import * as http from "http";
import ViteExpress from "vite-express";

const app = express();
const server = http.createServer(app);

const io = new Server(server);

io.on('connection', () => { /* .... */ });
server.listen(3000, () => { 
    /* ... */ 
    console.log('Server is listening on port 3000');
});

app.get("/message", (_, res) => {
    res.send("Hello from express")
});

ViteExpress.bind(app, server);