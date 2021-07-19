//	@ghasemkiani/base/textual

const {cutil} = require("@ghasemkiani/base/cutil");
const {Obj: Base} = require("@ghasemkiani/base/obj");
const {serializable} = require("@ghasemkiani/base/serializable");

class Textual extends cutil.mixin(Base, serializable) {
	get json() {
		return JSON.parse(this.string);
	}
	set json(json) {
		this.string = JSON.stringify(json);
	}
}
cutil.extend(Textual.prototype, {
	//
});

module.exports = {Textual};
