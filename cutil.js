//	@ghasemkiani/base/cutil

import os from "node:os";
import path from "node:path";
import url from "node:url";

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
		return Function("return this")();
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
	getCurrentModuleDirectory() {
		return path.dirname(url.fileURLToPath(import.meta.url));
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
}

let cutil = new CUtil();

export {CUtil, cutil};
