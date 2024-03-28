const BandList = require('./band-list');

//Messages
const { currentBands, addVote, removeBand, updateBandNameMessage, createBandMessage } = {
	currentBands: 'current-bands',
	addVote: 'vote-band',
	removeBand: 'delete-band',
	updateBandNameMessage: 'update-band-name',
	createBandMessage: 'create-band',
};
class Sockets {
	constructor(io) {
		this.io = io;
		this.socketsEvents();
		this.bandList = new BandList();
	}

	socketsEvents() {
		this.io.on('connection', (socket) => {
			console.log('Cliente conected');

			//Emitir al cliente todas las bandas actuales
			socket.emit(currentBands, this.bandList.getBands());

			//Increase vote
			socket.on(addVote, (bandId) => {
				this.bandList.increaseVotes(bandId);
				this.io.emit(currentBands, this.bandList.getBands());
			});

			//Delete band
			socket.on(removeBand, (bandId) => {
				this.bandList.removeBand(bandId);
				this.io.emit(currentBands, this.bandList.getBands());
			});

			//Update band name
			socket.on(updateBandNameMessage, ({ id, name }) => {
				this.bandList.changeBandName(id, name);
				this.io.emit(currentBands, this.bandList.getBands());
			});

			//Create band
			socket.on(createBandMessage, (name) => {
				this.bandList.addBand(name);
				this.io.emit(currentBands, this.bandList.getBands());
			});
		});
	}
}

module.exports = Sockets;

/*
io.on => Dispositivo conectado, no un usuario, porque un usuario puede tener multiples dispositivos
socket => Cliente

Emitir:
socket.emit(nombreMensaje, mensaje) => para emitir una mensaje a un cliente;
this.io.emit(nombreMensaje, mensaje) => A todos los clientes conectados;

Escuchar:
socket.on(nombreMensaje, callback) => para escuchar un mensaje;
				
*/
