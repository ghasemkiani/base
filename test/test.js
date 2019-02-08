const assert = require("assert");
const {cutil} = require("@ghasemkiani/commonbase/cutil");

describe("commonbase:cutil", () => {
	describe("#makeRelativeUri()", () => {
		it("should create the correct relative URI", () => {
			assert.equal(cutil.makeRelativeUri("/books/sblp/", "/"), "books/sblp/");
		});
		it("should create the correct relative URI", () => {
			assert.equal(cutil.makeRelativeUri("/books/sblp/", "/translation"), "books/sblp/");
		});
		it("should create the correct relative URI", () => {
			assert.equal(cutil.makeRelativeUri("/books/sblp/", "/translation/"), "../books/sblp/");
		});
		it("should create the correct relative URI", () => {
			assert.equal(cutil.makeRelativeUri("/books/sblp/", "/translation/index.html"), "../books/sblp/");
		});
	});
});
