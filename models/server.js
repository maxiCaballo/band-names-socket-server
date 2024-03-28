const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');
const cors = require('cors');

class Server {
	constructor() {
		this.app = express();
		this.port = 8080;

		//Http server
		this.server = http.createServer(this.app);

		//Configuraciones de sockets
		this.io = socketio(this.server, {
			/* Configurar sockets */
		});
	}
	middlewares() {
		//Servir directorio publico
		const publicDirPath = path.resolve(__dirname, '../public');
		this.app.use(express.static(publicDirPath));
		this.app.use(cors());
	}

	socketsConfigurations() {
		new Sockets(this.io);
	}

	execute() {
		//Inicializar middlewares
		this.middlewares();

		//Inicializar sockets
		this.socketsConfigurations();

		//Inicializar server
		this.server.listen(this.port, () => {
			console.log(`Server run on: ${this.port}`);
		});
	}
}

module.exports = Server;
