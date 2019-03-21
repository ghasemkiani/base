//	@ghasemkiani/commonbase/textual

const {cutil} = require("@ghasemkiani/commonbase/cutil");
const {Base} = require("@ghasemkiani/commonbase/base");
const {serializable} = require("@ghasemkiani/commonbase/serializable");

class Textual extends cutil.mixin(Base, serializable) {
	//
}
cutil.extend(Textual.prototype, {
	//
});

module.exports = {Textual};
