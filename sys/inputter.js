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
	async toReadLineTimeout(ms, prompt) {
		return new Promise((resolve, reject) => {
			try {
				let rl = readline.createInterface({
					input: process.stdin,
					output: process.stdout,
				});
				let handle = setTimeout(() => {
					rl.close();
					resolve(null);
				}, ms);
				rl.question(cutil.asString(prompt), answer => {
					clearTimeout(handle);
					rl.close();
					resolve(answer);
				});
			} catch(e) {
				reject(e);
			}
		});
	}
}

module.exports = {
	Inputter,
};
