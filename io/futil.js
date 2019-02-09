//	@ghasemkiani/commonbase/io/futil

const path = require("path");
const fs = require("fs");
const fsPromises = fs.promises;

const {Base} = require("@ghasemkiani/commonbase/base");

class FUtil extends Base {
	async toDelDir(dir) {
		if(fs.existsSync(dir)) {
			for(let f of await fsPromises.readdir(dir, {withFileTypes: true})) {
				let p = path.join(dir, f.name);
				if(f.isFile()) {
					await fsPromises.unlink(p);
				} else if(f.isDirectory()) {
					return await this.toDelDir(p);
				}
			}
			await fsPromises.rmdir(dir);
		}
	}
}

let futil = new FUtil();

module.exports = {
	FUtil,
	futil,
};
