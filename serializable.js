//	@ghasemkiani/base/serializable

const fs = require("fs");
const path = require("path");

const mimeTypes = require("mime-types");

const {cutil} = require("@ghasemkiani/base/cutil");

const serializable = {
	defaultMime: "text/plain",
	_mime: null,
	get mime() {
		let mime = this._mime;
		if(!mime && this.fn) {
			mime = mimeTypes.lookup(this.fn);
		}
		return mime || this.defaultMime;
	},
	set mime(mime) {
		this._mime = mime;
	},
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
		let dirname = path.dirname(this.fn);
		if(!fs.existsSync(dirname)) {
			fs.mkdirSync(dirname, {recursive: true});
		}
		fs.writeFileSync(this.fn, this.string, {encoding: this.cs});
	},
	async toRead() {
		this.string = await fs.promises.readFile(this.fn, {encoding: this.cs});
	},
	async toWrite() {
		let dirname = path.dirname(this.fn);
		if(!fs.existsSync(dirname)) {
			await fs.promises.mkdir(dirname, {recursive: true});
		}
		await fs.promises.writeFile(this.fn, this.string, {encoding: this.cs});
	},
	readJson() {
		this.stringJson = fs.readFileSync(this.fn, {encoding: this.cs});
	},
	writeJson() {
		let dirname = path.dirname(this.fn);
		if(!fs.existsSync(dirname)) {
			fs.mkdirSync(dirname, {recursive: true});
		}
		fs.writeFileSync(this.fn, this.stringJson , {encoding: this.cs});
	},
	async toReadJson() {
		this.stringJson  = await fs.promises.readFile(this.fn, {encoding: this.cs});
	},
	async toWriteJson() {
		let dirname = path.dirname(this.fn);
		if(!fs.existsSync(dirname)) {
			await fs.promises.mkdir(dirname, {recursive: true});
		}
		await fs.promises.writeFile(this.fn, this.stringJson , {encoding: this.cs});
	},
	get dataUri() {
		let cs = /utf-?8/i.test(this.cs) ? ";charset=UTF-8" : "";
		return `data:${this.mime}${cs};base64,${Buffer.from(this.string, this.cs).toString("base64")}`;
	},
	set dataUri(dataUri) {
		let aa = /data:([^;,]*)(;base64)?,(.*)/.exec(dataUri);
		if(aa) {
			this.mime = aa[1];
			let string = aa[3];
			if(aa[2]) {
				string = Buffer.from(string, "base64").toString(this.cs);
			}
			this.string = string;
		}
	},
};

module.exports = {serializable};
