//	@ghasemkiani/commonbase/binary

const {cutil} = require("@ghasemkiani/commonbase/cutil");
const {Base} = require("@ghasemkiani/commonbase/base");
const {serializable} = require("@ghasemkiani/commonbase/serializable");

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
