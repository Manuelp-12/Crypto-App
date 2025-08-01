//Market Data Info
/*
API key: CG-4kDBVaCTP9fdn2Ykf6nDSVtr

URL: https://api.coingecko.com/api/v3/global/

Fetch request: 

const url = 'https://pro-api.coingecko.com/api/v3/global';
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
  "data": {
    "active_cryptocurrencies": 17671,
    "upcoming_icos": 0,
    "ongoing_icos": 49,
    "ended_icos": 3376,
    "markets": 1319,
    "total_market_cap": {
      "btc": 33360508.2069137,
      "eth": 1097653909.6072,
      "ltc": 37242591109.0626,
      "bch": 7587027828.62793,
      "bnb": 5284598921.01506,
      "eos": 6713487563917.27,
      "xrp": 1146347442415.34,
      "xlm": 8357354485892.18,
      "link": 218035769671.313,
      "dot": 905815768411.65,
      "yfi": 642416676.911265,
      "sol": 22025694918.6088,
      "usd": 3930483795674.79,
      "aed": 14436666981513.5,
      "ars": 5046690883453852,
      "aud": 6033642439418.63,
      "bdt": 476979745807581,
      "bhd": 1481894583548.09,
      "bmd": 3930483795674.79,
      "brl": 21888078161353.8,
      "cad": 5395001710362.2,
      "chf": 3148093482759.16,
      "clp": 3787178356484490,
      "cny": 28212816161163.9,
      "czk": 83227994373413.8,
      "dkk": 25226076899184.8,
      "eur": 3379665796548.93,
      "gbp": 2928520935997.58,
      "gel": 10651611086278.7,
      "hkd": 30844255409949.2,
      "huf": 1.34828027491036e+15,
      "idr": 64122502215207940,
      "ils": 13197464050413.2,
      "inr": 338754645586409,
      "jpy": 584428876210844,
      "krw": 5468123754853723,
      "kwd": 1201112612636.46,
      "lkr": 1.18537714479806e+15,
      "mmk": 8246155003325720,
      "mxn": 73584175054281.3,
      "myr": 16690799438333,
      "ngn": 6013797426734264,
      "nok": 39974729962463.8,
      "nzd": 6586539664472.4,
      "php": 224116182098893,
      "pkr": 1.11989309548264e+15,
      "pln": 14350581525420.7,
      "rub": 308541507959532,
      "sar": 14743008888548.4,
      "sek": 37985516043956.6,
      "sgd": 5049099483923.84,
      "thb": 127334900907527,
      "try": 158591841394087,
      "twd": 115573914700403,
      "uah": 164083261802441,
      "vef": 393559342460.917,
      "vnd": 102824953903131140,
      "zar": 69604693847609.6,
      "xdr": 2758330987644.86,
      "xag": 102798069716.268,
      "xau": 1171598609.81474,
      "bits": 33360508206913.7,
      "sats": 3.33605082069137e+15
    },
    "total_volume": {
      "btc": 2758983.72749821,
      "eth": 90778271.6092868,
      "ltc": 3080040094.18774,
      "bch": 627463052.70381,
      "bnb": 437047371.670841,
      "eos": 555219447759.214,
      "xrp": 94805328505.9863,
      "xlm": 691170676672.49,
      "link": 18032013685.3021,
      "dot": 74912856532.5964,
      "yfi": 53129201.3562412,
      "sol": 1821570987.17963,
      "usd": 325059221706.185,
      "aed": 1193942521326.82,
      "ars": 417371879912704,
      "aud": 498994835589.726,
      "bdt": 39447221513148.9,
      "bhd": 122555778122.996,
      "bmd": 325059221706.185,
      "brl": 1810189793837.4,
      "cad": 446177913010.018,
      "chf": 260353908211.017,
      "clp": 313207562482777,
      "cny": 2333258840445.91,
      "czk": 6883129019628.47,
      "dkk": 2086249263404.38,
      "eur": 279505422376.28,
      "gbp": 242194799849.623,
      "gel": 880910490823.762,
      "hkd": 2550884364082.09,
      "huf": 111505595643582,
      "idr": 5303064901797957,
      "ils": 1091457849907.29,
      "inr": 28015716936639.3,
      "jpy": 48333489086704.7,
      "krw": 452225258860454,
      "kwd": 99334522501.9714,
      "lkr": 98033166436246.3,
      "mmk": 681974247139576,
      "mxn": 6085565013487.06,
      "myr": 1380363984975.32,
      "ngn": 497353611579331,
      "nok": 3305993685513.34,
      "nzd": 544720591247.913,
      "php": 18534876496627.5,
      "pkr": 92617498744634.8,
      "pln": 1186823074253.01,
      "rub": 25517027331786.6,
      "sar": 1219277637066.6,
      "sek": 3141481538467.07,
      "sgd": 417571076203.765,
      "thb": 10530862340809.9,
      "try": 13115876622934.2,
      "twd": 9558204209718.74,
      "uah": 13570028563711.9,
      "vef": 32548179869.4403,
      "vnd": 8503838515886265,
      "zar": 5756453603523.08,
      "xdr": 228119735549.745,
      "xag": 8501615137.46465,
      "xau": 96893652.8061796,
      "bits": 2758983727498.21,
      "sats": 275898372749821
    },
    "market_cap_percentage": {
      "btc": 59.6335130046884,
      "eth": 10.9805029881589,
      "xrp": 5.16189711885416,
      "usdt": 4.08945878454891,
      "bnb": 2.75241201106819,
      "sol": 2.44225101337848,
      "usdc": 1.63781324270162,
      "doge": 0.90355245225814,
      "steth": 0.826732808109992,
      "trx": 0.785815121231541
    },
    "market_cap_change_percentage_24h_usd": -3.00354433117596,
    "updated_at": 1752857626
  }
}

*/
export class GlobalData {
    constructor(data) {
        this.data = new MarketDataModel(data?.data);
    }
}

export class MarketDataModel {
    constructor(data) {
        this.totalMarketCap = data.total_market_cap;
        this.totalVolume = data.total_volume;
        this.marketCapPercentage = data.market_cap_percentage;
        this.marketCapPercentageChange24HUsd = data.market_cap_change_percentage_24h_usd;
        this.marketCap = this.totalMarketCap?.usd ?? "";
        this.volume = this.totalVolume?.usd ?? "";
        this.btcDominance = this.marketCapPercentage?.btc ?? "";
    }
}