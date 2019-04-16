//	@ghasemkiani/commonbase/sys/inputter

const { Base } = require("@ghasemkiani/commonbase/base");
const readline = require("readline");

class Inputter extends Base {
	// _rl

	get rl() {
		if (!this._rl) {
			this._rl = readline.createInterface({
					input: process.stdin,
					output: process.stdout,
				});
		}
		return this._rl;
	}
	set rl(rl) {
		this._rl = rl;
	}
	close() {
		if (this._rl) {
			this._rl.close();
		}
	}
	async toReadLine(prompt) {
		return new Promise((resolve, reject) => {
			try {
				if (typeof prompt === "undefined" || prompt === null) {
					prompt = "";
				} else if (typeof prompt !== "string") {
					prompt = String(prompt);
				}
				this.rl.question(prompt, answer => {
					resolve(answer);
				});
			} catch (e) {
				reject(e);
			}
		});
	}
	async toReadLineTimeout (ms) {
		let handle = setTimeout(() => this.close(), ms);
		let line = await this.toReadLine();
		clearTimeout(handle);
		return line;
	}
}

module.exports = {
	Inputter,
};
