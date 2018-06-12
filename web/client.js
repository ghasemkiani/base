//	@ghasemkiani/commonbase/web/client

const r2 = require("r2");
const SocksProxyAgent = require("socks-proxy-agent");
const HttpProxyAgent = require("http-proxy-agent");
const {cutil} = require("@ghasemkiani/commonbase/cutil");

const fetcher = {
	_proxy: null,
	get proxy() {
		return this._proxy;
	},
	set proxy(proxy) {
		this._proxy = /^tor$/.test(proxy) ? "socks://127.0.0.1:9150" : /^psiphon$/.test(proxy) ? "http://127.0.0.1:10050" : proxy;
	},
	toFetch(arg) {
		if(cutil.isString(arg)) {
			arg = {url: arg};
		}
		arg = cutil.assign({
			agent: /^http/i.test(this.proxy) ? new HttpProxyAgent(this.proxy) : /^socks/i.test(this.proxy) ? new SocksProxyAgent(this.proxy) : null,
		}, arg);
		return r2(arg);
	},
};

module.exports = {
	fetcher,
};
