import { cutil } from "./cutil.js";
import { Obj } from "./obj.js";
import { serializable } from "./serializable.js";

class Binary extends cutil.mixin(Obj, serializable) {
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

export { Binary };
