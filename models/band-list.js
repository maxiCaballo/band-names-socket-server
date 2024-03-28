const Band = require('./band');

class BandList {
	constructor() {
		this.bands = [new Band('Metallica'), new Band('ACDC'), new Band(`Guns N' Roses`), new Band('Europe')];
	}

	addBand(name) {
		const alreadyExist = this.bands.find((band) => band.name.toLowerCase() === name.toLowerCase());

		if (alreadyExist) return;

		const newBand = new Band(name);
		this.bands.push(newBand);
		return this.bands;
	}
	removeBand(id) {
		this.bands = this.bands.filter((band) => band.id !== id);
		return this.bands;
	}

	getBands() {
		return this.bands;
	}
	increaseVotes(id) {
		this.bands = this.bands.map((band) => {
			if (band.id === id) {
				band.votes += 1;
			}

			return band;
		});
	}
	changeBandName(id, newBandName) {
		this.bands = this.bands.map((band) => {
			if (band.id === id) {
				band.name = newBandName;
			}

			return band;
		});
	}
}

module.exports = BandList;
