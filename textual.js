//	@ghasemkiani/base/textual

import {cutil} from "./cutil.js";
import {Obj} from "./obj.js";
import {serializable} from "./serializable.js";

class Textual extends cutil.mixin(Obj, serializable) {
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

export {Textual};
