//	@ghasemkiani/base/serializable

import fs from "node:fs";
import path from "node:path";

import {cutil} from "./cutil.js";

const serializable = {
	defaultMime: "text/plain",
	_mime: null,
	get mime() {
		let mime = this._mime;
		if(!mime && this.fn) {
			mime = this.lookupMime(path.extname(this.fn));
		}
		return mime || this.defaultMime;
	},
	set mime(mime) {
		this._mime = mime;
	},
	lookupMime(ext) {
		ext = cutil.asString(ext).toLowerCase();
		return "" ||
			["gzip"].includes(ext) ? "application/gz" :
			["js","mjs"].includes(ext) ? "application/javascript" :
			["json"].includes(ext) ? "application/json" :
			["cjs"].includes(ext) ? "application/node" :
			["xml","xsl","xsd","rng"].includes(ext) ? "application/xml" :
			["xhtml","xht"].includes(ext) ? "application/xhtml+xml" :
			["svg","svgz"].includes(ext) ? "application/svg+xml" :
			["rar"].includes(ext) ? "application/vnd.rar" :
			["dtd"].includes(ext) ? "application/xml-dtd" :
			["zip"].includes(ext) ? "application/zip" :
			["bmp"].includes(ext) ? "image/bmp" :
			["emf"].includes(ext) ? "image/emf" :
			["gif"].includes(ext) ? "image/gif" :
			["jpeg","jpg","jpe"].includes(ext) ? "image/jpeg" :
			["png"].includes(ext) ? "image/png" :
			["tif","tiff"].includes(ext) ? "image/tiff" :
			["psd"].includes(ext) ? "image/vnd.adobe.photoshop" :
			["djvu","djv"].includes(ext) ? "image/djvu" :
			["ico"].includes(ext) ? "image/x-icon" :
			["mdi"].includes(ext) ? "image/vnd.ms-modi" :
			["webp"].includes(ext) ? "image/webp" :
			["wmf"].includes(ext) ? "image/wmf" :
			["css"].includes(ext) ? "text/css" :
			["html","htm","shtml"].includes(ext) ? "text/html" :
			["markdown","md"].includes(ext) ? "text/markdown" :
			["mml"].includes(ext) ? "text/mathml" :
			["rtf"].includes(ext) ? "text/rtf" :
			["uri","uris","urls"].includes(ext) ? "text/uri-list" :
			["vcard"].includes(ext) ? "text/vcard" :
			["sub"].includes(ext) ? "text/vnd.dvb.subtitle" :
			["java"].includes(ext) ? "text/x-java-source" :
			["mkd"].includes(ext) ? "text/x-markdown" :
			["p","pas"].includes(ext) ? "text/x-pascal" :
			["srt"].includes(ext) ? "text/x-subrip" :
			["vcf"].includes(ext) ? "text/x-vcard" :
			["txt","text","conf","def","list","log","in","ini"].includes(ext) ? "text/plain" :
			null;
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
		return this;
	},
	write() {
		let dirname = path.dirname(this.fn);
		if(!fs.existsSync(dirname)) {
			fs.mkdirSync(dirname, {recursive: true});
		}
		fs.writeFileSync(this.fn, this.string, {encoding: this.cs});
		return this;
	},
	async toRead() {
		this.string = await fs.promises.readFile(this.fn, {encoding: this.cs});
		return this;
	},
	async toWrite() {
		let dirname = path.dirname(this.fn);
		if(!fs.existsSync(dirname)) {
			await fs.promises.mkdir(dirname, {recursive: true});
		}
		await fs.promises.writeFile(this.fn, this.string, {encoding: this.cs});
		return this;
	},
	readJson() {
		this.stringJson = fs.readFileSync(this.fn, {encoding: this.cs});
		return this;
	},
	writeJson() {
		let dirname = path.dirname(this.fn);
		if(!fs.existsSync(dirname)) {
			fs.mkdirSync(dirname, {recursive: true});
		}
		fs.writeFileSync(this.fn, this.stringJson , {encoding: this.cs});
		return this;
	},
	async toReadJson() {
		this.stringJson  = await fs.promises.readFile(this.fn, {encoding: this.cs});
		return this;
	},
	async toWriteJson() {
		let dirname = path.dirname(this.fn);
		if(!fs.existsSync(dirname)) {
			await fs.promises.mkdir(dirname, {recursive: true});
		}
		await fs.promises.writeFile(this.fn, this.stringJson , {encoding: this.cs});
		return this;
	},
	get dataUri() {
		let cs = /UTF-?8/i.test(this.cs) ? ";charset=UTF-8" : "";
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

export {serializable};
