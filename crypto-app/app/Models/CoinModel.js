
//Coin info
/*

API key: CG-4kDBVaCTP9fdn2Ykf6nDSVtr

URL: https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=24h

Fetch request:

const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=24h';
const options = {
  method: 'GET',
  headers: {accept: 'application/json', 'x-cg-pro-api-key': 'CG-4kDBVaCTP9fdn2Ykf6nDSVtr'}
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));

JSON response:

{
    "id":"bitcoin",
    "symbol":"btc",
    "name":"Bitcoin",
    "image":"https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
    "current_price":118703,
    "market_cap":2361280514817,
    "market_cap_rank":1,
    "fully_diluted_valuation":2361280514817,
    "total_volume":22666404578,
    "high_24h":119126,
    "low_24h":117175,
    "price_change_24h":1485.84,
    "price_change_percentage_24h":1.2676,
    "market_cap_change_24h":29706389225,
    "market_cap_change_percentage_24h":1.27409,
    "circulating_supply":19891815.0,
    "total_supply":19891815.0,
    "max_supply":21000000.0,
    "ath":119126,
    "ath_change_percentage":-0.222,
    "ath_date":"2025-07-13T14:30:57.073Z",
    "atl":67.81,
    "atl_change_percentage":175189.13383,
    "atl_date":"2013-07-06T00:00:00.000Z",
    "roi":null,
    "last_updated":"2025-07-13T16:58:35.362Z",
    "sparkline_in_7d": {
        "price": [
            108079.78827579075,
            108226.77823782979
        ]
    },
    "price_change_percentage_24h_in_currency":1.2675979170008638
}

*/

class SparklineIn7D {
  constructor(data) {
    this.price = data?.price ?? [];
  }
}

class CoinModel {
  constructor(data) {
    this.id = data.id;
    this.symbol = data.symbol;
    this.name = data.name;
    this.image = data.image;
    this.currentPrice = data.current_price;
    this.marketCap = data.market_cap;
    this.marketCapRank = data.market_cap_rank;
    this.fullyDilutedValuation = data.fully_diluted_valuation;
    this.totalVolume = data.total_volume;
    this.high24H = data.high_24h;
    this.low24H = data.low_24h;
    this.priceChange24H = data.price_change_24h;
    this.priceChangePercentage24H = data.price_change_percentage_24h;
    this.marketCapChange24H = data.market_cap_change_24h;
    this.marketCapChangePercentage24H = data.market_cap_change_percentage_24h;
    this.circulatingSupply = data.circulating_supply;
    this.totalSupply = data.total_supply;
    this.maxSupply = data.max_supply;
    this.ath = data.ath;
    this.athChangePercentage = data.ath_change_percentage;
    this.athDate = data.ath_date;
    this.atl = data.atl;
    this.atlChangePercentage = data.atl_change_percentage;
    this.atlDate = data.atl_date;
    this.lastUpdated = data.last_updated;
    this.sparklineIn7D = new SparklineIn7D(data.sparkline_in_7d);
    this.priceChangePercentage24HInCurrency = data.price_change_percentage_24h_in_currency;
    this.currentHoldings = data.currentHoldings ?? 0;
  }

  updateHoldings(amount) {
    this.currentHoldings = amount;
  }

  get currentHoldingsValue() {
    return (this.currentHoldings ?? 0) * (this.currentPrice ?? 0);
  }

  get imageURL() {
    return this.image;
  }

  get rank() {
    return this.marketCapRank ?? 0;
  }
}

export default CoinModel;