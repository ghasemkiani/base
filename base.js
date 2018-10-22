//	@ghasemkiani/commonbase/base

class Base {
	constructor(arg) {
		if(typeof arg === "string") {
			arg = {
				string: arg,
			};
		}
		Object.assign(this, arg);
	}
	get string() {
		return this.toString();
	}
	set string(string) {
		this.fromString(string);
	}
	fromString() {}
	toString() {
		return `[object ${this.constructor.name}]`;
	}
}

module.exports = {
	Base,
};
