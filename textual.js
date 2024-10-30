import { cutil } from "./cutil.js";
import { Obj } from "./obj.js";
import { serializable } from "./serializable.js";

class Textual extends cutil.mixin(Obj, serializable) {
  static {
    cutil.extend(this.prototype, {
      jsonIndent: 2,
    });
  }
  get json() {
    return JSON.parse(this.string);
  }
  set json(json) {
    this.string = JSON.stringify(json, null, this.jsonIndent);
  }
}

export { Textual };
