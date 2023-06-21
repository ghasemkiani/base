//	@ghasemkiani/base/obj

class Obj extends Object {
	constructor(arg) {
		super();
		if(typeof arg === "string") {
			arg = {string: arg};
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

export {Obj};
