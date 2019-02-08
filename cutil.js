//	@ghasemkiani/commonbase/cutil

const {Base} = require("@ghasemkiani/commonbase/base");

class CUtil extends Base {
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
	mixin(Base, ...interfaces) {
		// interfaces are ordinary objects, not classes
		let Class = class extends Base {};
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
}

let cutil = new CUtil();

module.exports = {
	CUtil,
	cutil,
};
