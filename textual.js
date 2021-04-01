//	@ghasemkiani/base/textual

const {cutil} = require("@ghasemkiani/base/cutil");
const {Obj: Base} = require("@ghasemkiani/base/obj");
const {serializable} = require("@ghasemkiani/base/serializable");

class Textual extends cutil.mixin(Base, serializable) {
	//
}
cutil.extend(Textual.prototype, {
	//
});

module.exports = {Textual};
