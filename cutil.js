import os from "node:os";

import { Obj } from "./obj.js";

class CUtil extends Obj {
  isNull(x) {
    return x === null;
  }
  isUndefined(x) {
    return typeof x === "undefined";
  }
  isNil(x) {
    return this.isNull(x) || this.isUndefined(x);
  }
  isEmptyString(x) {
    return x === "";
  }
  isNilOrEmptyString(x) {
    return this.isNil(x) || this.isEmptyString(x);
  }
  na(x) {
    return this.isNilOrEmptyString(x);
  }
  a(x) {
    return !this.na(x);
  }
  isString(x) {
    return typeof x === "string";
  }
  isNumber(x) {
    return this.isBigInt(x) || (!isNaN(x) && this.a(x));
  }
  isInteger(x) {
    return this.isNumber(x) && x % 1 === 0;
  }
  isBigInt(x) {
    return typeof x === "bigint";
  }
  isObject(x) {
    return x !== null && typeof x === "object";
  }
  isArray(x) {
    return Array.isArray(x);
  }
  isFunction(x) {
    return typeof x === "function";
  }
  asString(x) {
    return this.isNil(x) ? "" : String(x);
  }
  asNumber(x) {
    return this.isNumber(x) ? Number(x) : 0;
  }
  asInteger(x) {
    return Math.floor(this.asNumber(x));
  }
  asBigInt(x) {
    return BigInt(this.asString(x));
  }
  asBoolean(x) {
    return x instanceof Boolean ? x.valueOf() : !!x;
  }
  asBooleanFromString(x) {
    x = this.asString(x).trim();
    return /true/i.test(x)
      ? true
      : /false/i.test(x)
        ? false
        : /yes/i.test(x)
          ? true
          : /no/i.test(x)
            ? false
            : /on/i.test(x)
              ? true
              : /off/i.test(x)
                ? false
                : null;
  }
  asObject(x) {
    return Object(x);
  }
  asArray(x) {
    var array;
    if (this.isArray(x)) {
      array = x;
    } else if (this.isString(x) || (this.isObject(x) && "length" in x)) {
      array = Array.prototype.slice.call(x, 0);
    } else {
      array = [];
    }
    return array;
  }
  assign(target, ...rest) {
    // only enumerable keys
    return Object.assign(target, ...rest);
  }
  extend(target, ...rest) {
    for (let source of rest) {
      // both enumerable and non-enumerable keys
      Reflect.ownKeys(Object(source)).forEach(function (k) {
        Reflect.defineProperty(
          target,
          k,
          Reflect.getOwnPropertyDescriptor(source, k)
        );
      });
    }
    return target;
  }
  mixin(Obj, ...interfaces) {
    // interfaces are ordinary objects, not classes
    let Class = class extends Obj {};
    this.extend(Class.prototype, ...interfaces);
    return Class;
  }
  global() {
    // return (new Function("return this;"))();
    return globalThis;
  }
  rand(n = 1000) {
    return Math.floor(Math.random() * n);
  }
  srand(n = 8) {
    let a = "a".charCodeAt(0);
    let s = "";
    for (let i = 0; i < n; i++) {
      s += String.fromCharCode(a + this.rand(26));
    }
    return s;
  }
  arrn(n) {
    return Array(...new Array(n)).map((empty, index) => index);
  }
  getUrlFilename(url) {
    let uRL = new URL(url);
    let fn = uRL.pathname;
    if (/win/i.test(os.type())) {
      if (/^\/.\:/.test(fn)) {
        fn = fn.substring(1);
      }
      fn = fn.replace(/\//g, "\\");
    }
    return fn;
  }
  makeRelativeUri(uriLink, uriPage) {
    if (!uriPage) {
      return uriLink;
    }
    uriLink = this.asString(uriLink);
    uriPage = this.asString(uriPage);
    // has protocol
    if (/^(([^:/]*:\/\/)|(\/\/))/i.test(uriLink)) {
      return uriLink;
    }
    var uriPageParts = uriPage.split("/");
    var uriLinkParts = uriLink.split("/");
    var n;
    for (
      n = 0;
      n < Math.min(uriPageParts.length - 1, uriLinkParts.length - 1);
      n++
    ) {
      if (uriPageParts[n] !== uriLinkParts[n]) {
        break;
      }
    }
    return Array(uriPageParts.length - n - 1)
      .fill(0)
      .map((a) => "..")
      .concat(uriLinkParts.slice(n))
      .join("/");
  }
  toDashed(name) {
    return !name
      ? ""
      : String(name).replace(/[A-Z]/g, (all) => "-" + all.toLowerCase());
  }
  toCamelCase(name) {
    return !name
      ? ""
      : String(name).replace(/\-(.)/g, (all, letter) => letter.toUpperCase());
  }
  toFirstUpperCase(name) {
    return !name
      ? ""
      : String(name).replace(/^(.)/, (all, letter) => letter.toUpperCase());
  }
  shuffle(array) {
    let m = array.length;
    while (m > 0) {
      let i = Math.floor(Math.random() * m--);
      let temp = array[m];
      array[m] = array[i];
      array[i] = temp;
    }
    return array;
  }
  shuffled(array) {
    return this.shuffle(array.slice(0));
  }
  clone(x) {
    return structuredClone(x);
  }
  zip(...rest) {
    let arrs = rest.map((arg) => this.asArray(arg));
    let n = Math.max(...arrs.map((arr) => arr.length));
    let result = [];
    for (let i = 0; i < n; i++) {
      result[i] = arrs.map((arr) => arr[i]);
    }
    return result;
  }
  group(arr, n) {
    let cutil = this;
    let k = -cutil.asInteger(-arr.length / n);
    return cutil.range(k).map((i) => arr.slice(i * n, (i + 1) * n));
  }
  range(n) {
    let array = new Array(n);
    for (let i = 0; i < n; i++) {
      array[i] = i;
    }
    return array;
  }
  uuidEPub() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      let r = (Math.random() * 16) | 0;
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
  }
  fromTo(s, a, b, inclusive = false) {
    let cutil = this;
    s = cutil.asString(s);
    a = cutil.asString(a);
    b = cutil.asString(b);

    let i0;
    if (cutil.na(a)) {
      i0 = 0;
    } else {
      i0 = s.indexOf(a);
      if (i0 < 0) {
        return "";
      } else {
        i0 += a.length;
      }
    }

    let i1;
    if (cutil.na(b)) {
      i1 = s.length;
    } else {
      i1 = s.indexOf(b, i0);
      if (i1 < 0) {
        return "";
      }
    }

    return (inclusive ? a : "") + s.substring(i0, i1) + (inclusive ? b : "");
  }
  async toSleep(millis) {
    await new Promise((resolve) => setTimeout(resolve, millis));
  }
  lookupMime(ext) {
    ext = cutil.asString(ext).toLowerCase().replace(/^\./, "");
    let data = [
      ["application/gz", "gzip"],
      ["application/javascript", "js", "mjs"],
      ["application/json", "json"],
      ["application/node", "cjs"],
      ["application/xml", "xml", "xsl", "xsd", "rng"],
      ["application/xhtml+xml", "xhtml", "xht"],
      ["application/svg+xml", "svg", "svgz"],
      ["application/vnd.rar", "rar"],
      ["application/xml-dtd", "dtd"],
      ["application/zip", "zip"],
      ["image/bmp", "bmp"],
      ["image/emf", "emf"],
      ["image/gif", "gif"],
      ["image/jpeg", "jpeg", "jpg", "jpe"],
      ["image/png", "png"],
      ["image/tiff", "tif", "tiff"],
      ["image/vnd.adobe.photoshop", "psd"],
      ["image/djvu", "djvu", "djv"],
      ["image/x-icon", "ico"],
      ["image/vnd.ms-modi", "mdi"],
      ["image/webp", "webp"],
      ["image/wmf", "wmf"],
      ["text/css", "css"],
      ["text/html", "html", "htm", "shtml"],
      ["text/markdown", "markdown", "md"],
      ["text/mathml", "mml"],
      ["text/rtf", "rtf"],
      ["text/uri-list", "uri", "uris", "urls"],
      ["text/vcard", "vcard"],
      ["text/vnd.dvb.subtitle", "sub"],
      ["text/x-java-source", "java"],
      ["text/x-markdown", "mkd"],
      ["text/x-pascal", "p", "pas"],
      ["text/x-subrip", "srt"],
      ["text/x-vcard", "vcf"],
      ["application/x-dtbncx+xml", "ncx"],
      ["application/oebps-package+xml", "opf"],
      ["application/epub+zip", "epub"],
      ["text/plain", "txt", "text", "conf", "def", "list", "log", "in", "ini"],
    ];
    for (let [mime, ...exts] of data) {
      if (exts.includes(ext)) {
        return mime;
      }
    }
    return null;
  }
  df(date = new Date(), timeZone = "Asia/Tehran") {
    let yyyy = new Intl.DateTimeFormat("en-US", {
      timeZone,
      year: "numeric",
    }).format(date);
    let mm = new Intl.DateTimeFormat("en-US", { timeZone, month: "2-digit" })
      .format(date)
      .padStart(2, "0");
    let dd = new Intl.DateTimeFormat("en-US", { timeZone, day: "2-digit" })
      .format(date)
      .padStart(2, "0");
    let HH = new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour: "2-digit",
      hour12: false,
    })
      .format(date)
      .padStart(2, "0");
    if (HH === "24") {
      HH = "00";
    }
    let MM = new Intl.DateTimeFormat("en-US", {
      timeZone,
      minute: "2-digit",
    })
      .format(date)
      .padStart(2, "0");
    let ss = new Intl.DateTimeFormat("en-US", {
      timeZone,
      second: "2-digit",
    })
      .format(date)
      .padStart(2, "0");
    return [[yyyy, mm, dd].join("-"), [HH, MM, ss].join(":")].join(" ");
  }
}

let cutil = new CUtil();

export { CUtil, cutil };
