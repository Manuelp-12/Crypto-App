//import { useEffect } from "react";
// import { useCoins } from "../Home/ViewModels/CoinContext";
import { allCoins } from "../Home/ViewModels/HomeViewModel";
import CoinModel from "../Models/CoinModel";
import { download, handleCompletion } from "../Utilities/NetworkManager";

export async function populateCoins() {
    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=24h";

    const data = await download(url);    

    data.forEach((item) => {
        allCoins.push(handleCompletion(item, CoinModel));
    });
}

// export const fetchCoins = async (setAllCoins) => {
//     const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=24h";

//     try {
//         const data = await download(url);
//         const updatedCoins = data.map((item) => handleCompletion(item, CoinModel));
//         setAllCoins(updatedCoins);
//     }
//     catch (e) {
//         console.error("Error fetching coins:", e);
//     }
// }

//export default populateCoins;