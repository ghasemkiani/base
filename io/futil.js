//	@ghasemkiani/commonbase/io/futil

const path = require("path");
const fs = require("fs");
const fsPromises = fs.promises;

const {Base} = require("@ghasemkiani/commonbase/base");

class FUtil extends Base {
	async toCopyDir(dir1, dir2) {
		if(fs.existsSync(dir1)) {
			await fsPromises.mkdir(dir2, {recursive: true});
			for(let f of await fsPromises.readdir(dir1, {withFileTypes: true})) {
				let p1 = path.join(dir1, f.name);
				let p2 = path.join(dir2, f.name);
				if(f.isFile()) {
					await fsPromises.copyFile(p1, p2);
				} else if(f.isDirectory()) {
					return await this.toCopyDir(p1, p2);
				}
			}
		}
	}
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
