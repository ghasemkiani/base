//	@ghasemkiani/base/binary

const {cutil} = require("@ghasemkiani/base/cutil");
const {Obj: Base} = require("@ghasemkiani/base/obj");
const {serializable} = require("@ghasemkiani/base/serializable");

class Binary extends cutil.mixin(Base, serializable) {
	fromBuffer(buffer) {
		this.string = Buffer.toString(this.cs);
	}
	toBuffer() {
		return Buffer.from(this.string, this.cs);
	}
}
cutil.extend(Binary.prototype, {
	cs: "binary",
});

module.exports = {Binary};
