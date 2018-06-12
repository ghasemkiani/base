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
}

let cutil = new CUtil();

module.exports = {
	CUtil,
	cutil,
};
