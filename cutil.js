//	@ghasemkiani/base/cutil

import os from "node:os";
import path from "node:path";
// import url from "node:url";

import {Obj} from "./obj.js";

class CUtil extends Obj {
	isNull(x) {
		return x === null;
	}
	isUndefined(x) {
		return typeof x === "undefined";
	}
	isNil(x) {
		return this.isNull(x) || this.isUndefined(x);
	}
	isEmptyString(x) {
		return x === "";
	}
	isNilOrEmptyString(x) {
		return this.isNil(x) || this.isEmptyString(x);
	}
	na(x) {
		return this.isNilOrEmptyString(x);
	}
	a(x) {
		return !this.na(x);
	}
	isString(x) {
		return typeof x === "string";
	}
	isNumber(x) {
		return !isNaN(x) && !this.isNull(x) && !this.isUndefined(x) && !this.isEmptyString(x);
	}
	isInteger(x) {
		return this.isNumber(x) && (x % 1 === 0);
	}
	isObject(x) {
		return x !== null && typeof x === "object";
	}
	isArray(x) {
		return Array.isArray(x);
	}
	isFunction(x) {
		return typeof x === "function";
	}
	asString(x) {
		return this.isNil(x) ? "" : String(x);
	}
	asNumber(x) {
		return isNaN(x) ? 0 : Number(x);
	}
	asInteger(x) {
		return Math.floor(this.asNumber(x));
	}
	asBoolean(x) {
		return x instanceof Boolean ? x.valueOf() : !!x;
	}
	asBooleanFromString(x) {
		x = this.asString(x).trim();
		return /true/i.test(x) ? true : /false/i.test(x) ? false : 
			/yes/i.test(x) ? true : /no/i.test(x) ? false : 
			/on/i.test(x) ? true : /off/i.test(x) ? false : 
			null;
	}
	asObject(x) {
		return Object(x);
	}
	asArray(x) {
		var array;
		if(this.isArray(x)) {
			array = x;
		} else if(this.isString(x) || (this.isObject(x) && "length" in x)) {
			array = Array.prototype.slice.call(x, 0);
		} else {
			array = [];
		}
		return array;
	}
	assign(target, ...rest) {
		// only enumerable keys
		return Object.assign(target, ...rest);
	}
	extend(target, ...rest) {
		for(let source of rest) {
			// both enumerable and non-enumerable keys
			Reflect.ownKeys(Object(source)).forEach(function (k) {
				Reflect.defineProperty(target, k, Reflect.getOwnPropertyDescriptor(source, k));
			});
		}
		return target;
	}
	mixin(Obj, ...interfaces) {
		// interfaces are ordinary objects, not classes
		let Class = class extends Obj {};
		this.extend(Class.prototype, ...interfaces);
		return Class;
	}
	global() {
		// return (new Function("return this;"))();
		return globalThis;
	}
	rand(n) {
		n = n || 1000;
		return Math.floor(Math.random() * n);
	}
	srand(n) {
		n = n || 8;
		let a = "a".charCodeAt(0);
		let s = "";
		for (let i = 0; i < n; i++) {
			s += String.fromCharCode(a + this.rand(26));
		}
		return s;
	}
	arrn(n) {
		return Array(...new Array(n)).map((empty, index) => index);
	}
    getUrlFilename(url) {
        let uRL = new URL(url);
        let fn = uRL.pathname;
        if (/win/i.test(os.type())) {
            if (/^\/.\:/.test(fn)) {
                fn = fn.substring(1);
            }
            fn = fn.replace(/\//g, "\\");
        }
        return fn;
    }
	makeRelativeUri(uriLink, uriPage) {
		if(!uriPage) {
			return uriLink;
		}
		uriLink = this.asString(uriLink);
		uriPage = this.asString(uriPage);
		// has protocol
		if(/^(([^:/]*:\/\/)|(\/\/))/i.test(uriLink)) {
			return uriLink;
		}
		var uriPageParts = uriPage.split("/");
		var uriLinkParts = uriLink.split("/");
		var n;
		for (n = 0; n < Math.min(uriPageParts.length - 1, uriLinkParts.length - 1); n++) {
			if(uriPageParts[n] !== uriLinkParts[n]) {
				break;
			}
		}
		return Array(uriPageParts.length - n - 1).fill(0).map(a => "..").concat(uriLinkParts.slice(n)).join("/");
	}
	toDashed(name) {
		return !name ? "" : String(name).replace(/[A-Z]/g, (all) => "-" + all.toLowerCase());
	}
	toCamelCase(name) {
		return !name ? "" : String(name).replace(/\-(.)/g, (all, letter) => letter.toUpperCase());
	}
	toFirstUpperCase(name) {
		return !name ? "" : String(name).replace(/^(.)/, (all, letter) => letter.toUpperCase());
	}
	shuffle(array) {
		let m = array.length;
		while (m > 0) {
			let i = Math.floor(Math.random() * m--);
			let temp = array[m];
			array[m] = array[i];
			array[i] = temp;
		}
		return array;
	}
	clone(x) {
		return structuredClone(x);
	}
	zip(...rest) {
		let arrs = rest.map(arg => this.asArray(arg));
		let n = Math.max(...arrs.map(arr => arr.length));
		let result = [];
		for (let i = 0; i < n; i++) {
			result[i] = arrs.map(arr => arr[i]);
		}
		return result;
	}
	group(arr, n) {
		let cutil = this;
		let k = -cutil.asInteger(-arr.length / n);
		return cutil.range(k).map(i => arr.slice(i * n, (i + 1) * n));
	}
	range(n) {
		let array = new Array(n);
		for (let i = 0; i < n; i++) {
			array[i] = i;
		}
		return array;
	}
	uuidEPub() {
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
			let r = Math.random() * 16 | 0;
			return (c === "x" ? r : r & 0x3 | 0x8).toString(16);
		});
	}
	fromTo(s, a, b, inclusive = false) {
		let cutil = this;
		s = cutil.asString(s);
		a = cutil.asString(a);
		b = cutil.asString(b);
		
		let i0;
		if (cutil.na(a)) {
			i0 = 0;
		} else {
			i0 = s.indexOf(a);
			if (i0 < 0) {
				return "";
			} else {
				i0 += a.length;
			}
		}
		
		let i1;
		if (cutil.na(b)) {
			i1 = s.length;
		} else {
			i1 = s.indexOf(b, i0);
			if (i1 < 0) {
				return "";
			}
		}
		
		return (inclusive ? a : "") + s.substring(i0, i1) + (inclusive ? b : "");
	}
	async toSleep(millis) {
		await new Promise(resolve => setTimeout(resolve, millis));
	}
	lookupMime(ext) {
		ext = cutil.asString(ext).toLowerCase().replace(/^\./, "");
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
			["ncx"].includes(ext) ? "application/x-dtbncx+xml" :
			["opf"].includes(ext) ? "application/oebps-package+xml" :
			["epub"].includes(ext) ? "application/epub+zip" :
			["txt","text","conf","def","list","log","in","ini"].includes(ext) ? "text/plain" :
			null;
	}
}

let cutil = new CUtil();

export {CUtil, cutil};
