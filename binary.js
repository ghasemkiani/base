import { cutil } from "./cutil.js";
import { Obj } from "./obj.js";
import { serializable } from "./serializable.js";

class Binary extends cutil.mixin(Obj, serializable) {
  static {
    cutil.extend(this.prototype, {
      cs: "binary",
    });
  }
  fromBuffer(buffer) {
    this.string = Buffer.toString(this.cs);
  }
  toBuffer() {
    return Buffer.from(this.string, this.cs);
  }
  asText(cs) {
    const buffer = this.toBuffer();
    const decoder = new TextDecoder(cs);
    const text = decoder.decode(buffer);
    return text;
  }
}

export { Binary };
