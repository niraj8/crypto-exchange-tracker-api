var exchanges = require('./exchanges'),
	request   = require('request-promise-native');

var headers = {
	"Accept": "*/*",
	"User-Agent": "request"
}

function allPrices() {
	return new Promise((resolve, reject) => {
		Promise.all(exchanges.map(e => getPrices(e)))
		.then(d => resolve(d))
		.catch(err => reject(err))
	})
}

function getPrices(exchange) {
	return new Promise((resolve, reject) => {
		if (exchange.url) {
			request({url:exchange.url, headers: headers, gzip:true, json:true})
			// .then(d => {
				// if (typeof(d) === 'string') return JSON.parse(d)
			// })
			.then(d => resolve(exchange.transform(d)))
			.catch(err => reject(err))
		} else if (exchange.urls) {
			Promise.all(
				Object.keys(exchange.urls).map(c => {
					var tmp = {}
					return request({url:exchange.urls[c], headers: headers, json:true})
					// .then(d => {
						// if (typeof(d) === 'string') return JSON.parse(d)
					// })
					.then(d => {
						tmp[c] = d
						return tmp
					})
				})
			).then(d => resolve(exchange.transform(d)))
			.catch(err => reject(err))
		}
	})
}

module.exports = allPrices
