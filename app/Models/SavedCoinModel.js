class SavedCoinModel {
    constructor(id, name, symbol, rank, image, currentPrice, priceChangePercentage24H, currentHoldings) {
        this.id = id;
        this.name = name;
        this.symbol = symbol;
        this.rank = rank;
        this.image = image;
        this.currentPrice = currentPrice;
        this.priceChangePercentage24H = priceChangePercentage24H;
        this.currentHoldings = currentHoldings;
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
}

export default SavedCoinModel;