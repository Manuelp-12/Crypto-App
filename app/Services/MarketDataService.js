import { asPercentString, formattedWithAbbreviations } from "../Formatters/formatters";
//import { statistics } from "../Home/ViewModels/HomeViewModel";
//import { usePortfolio } from "../Home/ViewModels/PortfolioContext";
import { asCurrencyWith2Decimals } from "../Formatters/formatters";
import { GlobalData } from "../Models/MarketDataModel";
import SavedCoinModel from "../Models/SavedCoinModel";
import StatisticModel from "../Models/StatisticModel";
import { download, handleCompletion } from "../Utilities/NetworkManager";


export async function populateStatistics(portfolioCoins) {
    const stats = [];

    const url = "https://api.coingecko.com/api/v3/global/";


    const data = await download(url);
    //console.log("Fetched data:", data);


    const globalData = handleCompletion(data, GlobalData);
    //console.log("Global data: ", globalData);


    const marketData = globalData.data;


    // console.log("Market Cap: ", marketData.marketCap);
    // console.log("Market Volume: ", marketData.volume);


    stats.push(new StatisticModel({
        title: "Market cap",
        value: "$" + formattedWithAbbreviations(marketData.marketCap),
        percentageChange: marketData.marketCapPercentageChange24HUsd
    }));


    stats.push(new StatisticModel({
        title: "24h volume",
        value: "$" + formattedWithAbbreviations(marketData.volume),
    }));


    stats.push(new StatisticModel({
        title: "BTC Dominance",
        value: asPercentString(marketData.btcDominance),
    }));

    if (!Array.isArray(portfolioCoins) || portfolioCoins.length === 0) {
        // console.log("null: ", portfolioCoins);
        // console.log("null: ", portfolioCoins.array);
        stats.push(new StatisticModel({
            title: "Portfolio Value",
            value: "$" + 0.00,
            percentageChange: 0
        }));
    }
    else {
        portfolioCoins = portfolioCoins.map(coinData => new SavedCoinModel(
            coinData.id,
            coinData.symbol,
            coinData.rank,
            coinData.image,
            coinData.currentPrice,
            coinData.priceChangePercentage24H,
            coinData.currentHoldings
        ));

        // console.log("not null?: ", portfolioCoins);
        // console.log("not null?: ", portfolioCoins.array);

        var totalValue = 0.00;
        var previousValue = 0.00;
    
        portfolioCoins.forEach(coin => {
            totalValue += coin.currentHoldingsValue;
            previousValue += coin.currentHoldingsValue / (1 + (coin.priceChangePercentage24H / 100));
        });

        var totalPercentageChange = (totalValue - previousValue) / previousValue;

        // console.log("total Value: ", totalValue);
        // console.log("total percentage change: ", totalPercentageChange);


        stats.push(new StatisticModel({
            title: "Portfolio Value",
            value: asCurrencyWith2Decimals(totalValue),
            percentageChange: totalPercentageChange * 100 //show as percentage
        }));
    }

    return stats;
}