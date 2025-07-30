import AsyncStorage from '@react-native-async-storage/async-storage';
import SavedCoinModel from '../Models/SavedCoinModel';

export const saveCoin = async (selectedCoin, setPortfolioCoins) => {
    try {
        const savedCoinsData = await AsyncStorage.getItem('savedCoins');

        let savedCoins = savedCoinsData ? JSON.parse(savedCoinsData) : [];

        // convert to SavedCoinModel
        if (!(selectedCoin instanceof SavedCoinModel)) {
            selectedCoin = new SavedCoinModel(
                selectedCoin.id,
                selectedCoin.name,
                selectedCoin.symbol,
                selectedCoin.rank,
                selectedCoin.image,
                selectedCoin.currentPrice,
                selectedCoin.priceChangePercentage24H,
                selectedCoin.currentHoldings
            );
        }

        //map previously saved coins to SavedCoinModel - lets .imageURL and get currentHoldingsValue be called
        savedCoins = savedCoins.map(coinData => new SavedCoinModel(
            coinData.id,
            coinData.name,
            coinData.symbol,
            coinData.rank,
            coinData.image,
            coinData.currentPrice,
            coinData.priceChangePercentage24H,
            coinData.currentHoldings
        ));

        const coinIndex = savedCoins.findIndex(coin => coin.id === selectedCoin.id);

        if (coinIndex === -1) {
            savedCoins.push(selectedCoin);
        } else {
            if (selectedCoin.currentHoldings > 0) {
                savedCoins[coinIndex].updateHoldings(selectedCoin.currentHoldings);
            } else {
                savedCoins.splice(coinIndex, 1);
            }
        }

        setPortfolioCoins(savedCoins);
        await AsyncStorage.setItem('savedCoins', JSON.stringify(savedCoins));

        //console.log("Coin data saved: ", selectedCoin);
    } catch (e) {
        console.error("Error saving coin data: ", e);
    }
};

export const getSavedCoins = async () => {
    try {
        const savedCoinsData = await AsyncStorage.getItem('savedCoins');

        const savedCoins = savedCoinsData ? JSON.parse(savedCoinsData) : [];

        const modeledCoins = savedCoins.map(coin => new SavedCoinModel(
            coin.id,
            coin.name,
            coin.symbol,
            coin.rank,
            coin.image,
            coin.currentPrice,
            coin.priceChangePercentage24H,
            coin.currentHoldings
        ));

        if (modeledCoins == null) {
            console.log("No coin data found.");
            return modeledCoins;
        }

        //console.log("Coin data retrieved successfully.", modeledCoins);
        return modeledCoins;
    }
    catch (e) {
        console.error("Error retrieving coin data: ", e);
        return [];
    }
}