//	@ghasemkiani/commonbase/serializable

const fs = require("fs");
const {cutil} = require("@ghasemkiani/commonbase/cutil");

const serializable = {
	_string: null,
	fromString(string) {
		this._string = string;
	},
	toString() {
		return this._string;
	},
	get json() {
		return this;
	},
	set json(json) {
		cutil.assign(this, json);
	},
	fromStringJson(stringJson) {
		this.json = JSON.parse(stringJson);
	},
	toStringJson() {
		return JSON.stringify(this.json);
	},
	get stringJson() {
		return this.toStringJson();
	},
	set stringJson(stringJson) {
		this.fromStringJson(stringJson);
	},
	fn: null,
	cs: "utf8",
	read() {
		this.string = fs.readFileSync(this.fn, {encoding: this.cs});
	},
	write() {
		fs.writeFileSync(this.fn, this.string, {encoding: this.cs});
	},
	async toRead() {
		this.string = await fs.promises.readFile(this.fn, {encoding: this.cs});
	},
	async toWrite() {
		await fs.promises.writeFile(this.fn, this.string, {encoding: this.cs});
	},
	readJson() {
		this.stringJson = fs.readFileSync(this.fn, {encoding: this.cs});
	},
	writeJson() {
		fs.writeFileSync(this.fn, this.stringJson , {encoding: this.cs});
	},
	async toReadJson() {
		this.stringJson  = await fs.promises.readFile(this.fn, {encoding: this.cs});
	},
	async toWriteJson() {
		await fs.promises.writeFile(this.fn, this.stringJson , {encoding: this.cs});
	},
};

module.exports = {serializable};
