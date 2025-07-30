import CoinDetailModel from "../Models/CoinDetailModel";
import { download, handleCompletion } from "../Utilities/NetworkManager";

export async function getCoinDetails(coinData) {
    let coin = coinData;

    const url = `https://api.coingecko.com/api/v3/coins/${coin.id}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false%27`;

    const data = await download(url);

    const coinDetails = handleCompletion(data, CoinDetailModel);
    //console.log(coinDetails);
    return coinDetails;
}