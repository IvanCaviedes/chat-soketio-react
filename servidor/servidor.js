//Servidor con express
const express = require("express");
const http = require("http");
const app = express();
const servidor = http.createServer(app);

//Inicializamos socketio
const socketio = require("socket.io");
const io = socketio(servidor);

require('./sockets')(io)
require('./database')



servidor.listen(5000, () => console.log("Servidor inicializado"));
