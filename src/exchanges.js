var koinex = {
	name: "koinex",
	image: "images/exchanges/koinex.jpg",
	url: "https://koinex.in/api/ticker",
	transform: function(data) {
		var res = {}
		var coins = Object.keys(data.stats)
		// highest_bid => buy, lowest_ask => sell
		var prices = coins.map(c => {
			return {
				name: c.toLowerCase(),
				buy: data.stats[c].highest_bid,
				sell: data.stats[c].lowest_ask
			}
		})
		return {name:this.name, image:this.image, prices:prices}
	}
}

var bitbns = {
	name: "bitbns",
	image: "images/exchanges/bitbns.png",
	url: "https://bitbns.com/order/getTickerAll",
	transform: function(data) {
		var prices = data.map(o => {
			var coin = Object.keys(o)[0]
			return {
				name: coin.toLowerCase(),
				buy: o[coin].buyPrice,
				sell: o[coin].sellPrice
			}
		})
		return {name: this.name, image:this.image, prices:prices}
	}
}

var zebpay = {
	name: "zebpay",
	image: "images/exchanges/zebpay.png",
	url: "https://www.zebapi.com/api/v1/market/ticker/btc/inr",
	// only btc for now
	transform: function(data) {
		var prices = [{
			name: data.virtualCurrency.toLowerCase(), 
			buy: data.buy,
			sell: data.sell
		}]
		return {name:this.name, image:this.image, prices: prices}
	}
}

var coinsecure = {
	name: "coinsecure",
	image: "images/exchanges/coinsecure.png",
	url: "https://api.coinsecure.in/v1/exchange/ticker",
	transform: function(data) {
		var prices = [{
			name: "btc",
			buy: data.message.bid,
			sell: data.message.ask
		}]
		return {name:this.name, image:this.image, prices:prices}
	}
}

var coindelta = {
	name: "coindelta",
	image: "images/exchanges/coindelta.png",
	url: "https://coindelta.com/api/v1/public/getticker/",
	transform: function(data) {

		// picking only xxx-inr
		var relevant = data.filter(o => o.MarketName.split('-')[1] === "inr")
		var prices = relevant.map(o => {
			return {
				name: o.MarketName.split("-")[0].toLowerCase(),
				buy: o.Bid,
				sell: o.Ask
			}
		})
		return {name:this.name, image:this.image, prices:prices}
	}
}

var btcxindia = {
	name: "btcxindia",
	url: "https://api.btcxindia.com/ticker/",
	// only xrp
	transform: function(data) {
		var prices = [{
			name: "xrp",
			buy: data.bid,
			sell: data.ask
		}]
		return {name:this.name, prices: prices}
	}
}
var throughbit = {
	name: "throughbit",
	image: "images/exchanges/throughbit.png",
	urls: {
		"btc":"https://www.throughbit.com/tbit_ci/index.php/cryptoprice/type/btc/inr",
		"eth":"https://www.throughbit.com/tbit_ci/index.php/cryptoprice/type/eth/inr"
	},
	
	// assumption: each url in 'this.urls' returns prices for 1 coin
	transform: function(data) {
		var prices = data.map(o => {
			var coin = Object.keys(o)[0]
			return {
				name: coin,
				buy: o[coin].data.price[0].buy_price,
				sell: o[coin].data.price[0].sell_price,
			}
		})
		return {name:this.name, image:this.image, prices:prices}
	}
}

var unocoin = {
	name: "unocoin",
	url: "https://www.unocoin.com/trade?all",
	// only btc
	transform: function(data) {
		console.log(data)
		var prices = [{
			name: "btc",
			buy: data.buy,
			sell: data.sell
		}]
		return {name:this.name, prices:prices}
	}
}

var exchanges = [ 
					koinex, 
					bitbns, 
					zebpay, 
					coinsecure, 
					coindelta, 
					// btcxindia, 
					throughbit, 
					// unocoin 
				]

module.exports = exchanges
