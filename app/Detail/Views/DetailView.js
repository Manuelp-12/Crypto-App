import { useTheme } from '@/app/ColorThemes/ColorThemes';
import StatisticView from '@/app/Components/StatisticView';
import { asCurrencyWith2Decimals, asCurrencyWith6Decimals, formattedWithAbbreviations } from '@/app/Formatters/formatters';
import { allCoins } from '@/app/Home/ViewModels/HomeViewModel';
// import { useCoins } from '@/app/Home/ViewModels/CoinContext';
import LocalFileManager from '@/app/Utilities/LocalFileManager';
import React, { useEffect, useState } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from "../../Components/BackButton";
import StatisticalModel from "../../Models/StatisticModel";
import { getCoinDetails } from "../../Services/CoinDetailDataService";
import ChartView from "../Views/ChartView";

function DetailView({ data, onClose, showDetailView, portfolioMode }) {
    if (!data) {
        console.error('no value for detailview.');
        return null;
    }
    
    const { mainTheme, isDark } = useTheme();

    let coin;

    //const { allCoins } = useCoins();

    if (portfolioMode) {
        coin = allCoins.find(coin => coin.id === data.id);
    }
    else {
        coin = data;
    }

    //coin details API call
    const [coinDetails, setCoinDetails] = useState(null);

    useEffect(() => {
        async function fetchDetails() {
            const details = await getCoinDetails(coin);
            setCoinDetails(details);
        }
        fetchDetails();
    }, [coin]);

    //console.log("Coin details: ", coinDetails);

    const overviewStatistics = [];
    const additionalStatistics = [];
    var coinDescription = coinDetails?.description.en ?? "";
    var websiteURL = coinDetails?.links.homepage[0] ?? "";
    var redditURL = coinDetails?.links.subredditURL ?? "";

    const [showFullDescription, setShowFullDescription] = useState(false);

    pushOverviewStatistics(overviewStatistics, coin);
    pushAdditionalStatistics(additionalStatistics, coin, coinDetails);

    const pairs1 = [];
    for (let i = 0; i < overviewStatistics.length; i += 2) {
        pairs1.push(overviewStatistics.slice(i, i + 2));
    }

    const pairs2 = [];
    for (let i = 0; i < additionalStatistics.length; i += 2) {
        pairs2.push(additionalStatistics.slice(i, i + 2));
    }

    return (
        <Modal
            isVisible={showDetailView}
            animationIn="slideInRight"
            animationOut="slideOutRight"
            animationInTiming={400}
            animationOutTiming={400}
            style={styles.modal}  // Apply the custom modal style
            backdropOpacity={0.5} // semi-transparent backdrop
        >
            {coinDetails && (
                <View style={[styles.container, {backgroundColor: mainTheme.background_color}]}>
                    <SafeAreaView style={styles.header}>
                        <BackButton closeView={onClose} />
                        <View style={{flex: 1}} />
                        <Text style={{paddingLeft: 6, color: mainTheme.accent, fontWeight: "bold", fontSize: 18,}}>{coin?.name || ""}</Text>
                        <View style={{flex: 1}} />
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <Text style={{paddingRight: 6, color: mainTheme.accent, fontWeight: "bold", fontSize: 18,}}>{coin?.symbol?.toUpperCase() || ""}</Text>
                            <LocalFileManager uri={coin.imageURL} style={styles.circle} placeholder={<View style={[styles.circle, styles.placeholder]} />}/>  
                        </View>
                    </SafeAreaView>
                    <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={[styles.title, {color: mainTheme.accent, marginLeft: 10}]}>{coin.name}</Text>
                    <ChartView coin={coin}/>
                    <Text style={[styles.subheading, {color: mainTheme.accent, marginLeft: 10}]}>Overview</Text>

                    {/* <View style={{borderBottomColor: mainTheme.secondaryText, borderBottomWidth: StyleSheet.hairlineWidth,}} /> */}

                    {coinDescription.length > 0 && (
                        <View style={{flexDirection: "column", marginLeft: 10, paddingTop: 10,}}>
                            <Text numberOfLines={showFullDescription ? null : 3} style={{color: mainTheme.secondaryText, fontSize: 17}}>{coinDescription}</Text>
                            <Pressable onPress={() => setShowFullDescription(!showFullDescription)}>
                            <Text style={{color: isDark ? "#C11C84" : "#24A0ED", fontWeight: "bold", paddingTop: 5, paddingBottom: 5,}}>{showFullDescription ? "Read less" : "Read more..."}</Text>
                            </Pressable>
                        </View>
                    )}

                    <View style={{ flexDirection: "column" }}>
                        {pairs1.map((pair, index) => (
                            <View key={index} style={{ flexDirection: "row", marginBottom: 10, marginTop: 10}}>
                                {pair.map((item, idx) => (
                                    <StatisticView key={idx} data={item} width={200}/>
                                ))}
                            </View>
                        ))}
                    </View>
                    <Text style={[styles.subheading, {color: mainTheme.accent, marginLeft: 10}]}>Additional Details</Text>

                    {/* <View style={{borderBottomColor: mainTheme.secondaryText, borderBottomWidth: StyleSheet.hairlineWidth,}} /> */}

                    <View style={{ flexDirection: "column" }}>
                        {pairs2.map((pair, index) => (
                            <View key={index} style={{ flexDirection: "row", marginBottom: 12, marginTop: 12 }}>
                                {pair.map((item, idx) => (
                                    <StatisticView key={idx} data={item} width={200}/>
                                ))}
                            </View>
                        ))}
                    </View>

                    <View style={{marginLeft: 10, paddingTop: 20, paddingBottom: 15,}}>
                        {websiteURL.length > 0 && (
                            <View style={{paddingBottom: 10,}}>
                                <Text style={{color: isDark ? "#C11C84" : "#24A0ED", fontWeight: "bold", fontSize: 20}} onPress={() => Linking.openURL(websiteURL)}>Website</Text>
                            </View>
                        )}

                        {redditURL.length > 0 && (
                            <View style={{paddingTop: 10,}}>
                                <Text style={{color: isDark ? "#C11C84" : "#24A0ED", fontWeight: "bold", fontSize: 20}} onPress={() => Linking.openURL(redditURL)}>Reddit</Text>
                            </View>
                         )}
                    </View>

                    </ScrollView>
                </View>
            )}
        </Modal>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        marginTop: 60,
        alignItems: "center",
    },
    circle: {
        width: 30,
        height: 30,
        aspectRatio: 1,
        borderRadius: 15,
    },
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'flex-start', // Align content to the top
    },
    modal: {
        margin: 0, // Remove default margin
        justifyContent: 'flex-start', // Align the modal content to the top
    },
    title: {
        paddingTop: 20,
        paddingBottom: 20,
        fontSize: 40,
        fontWeight: "bold",
    },
    subheading: {
        paddingTop: 20,
        paddingBottom: 10,
        fontSize: 30,
        fontWeight: "bold",
    }
});

function pushOverviewStatistics(overviewStatistics, coin) {
    //current price
    overviewStatistics.push(new StatisticalModel({
        title: "Current Price",
        value: asCurrencyWith6Decimals(coin.currentPrice),
        percentageChange: coin.priceChangePercentage24HInCurrency
    }));

    //market cap
    overviewStatistics.push(new StatisticalModel({
        title: "Market Capitalization",
        value: "$" + formattedWithAbbreviations(coin.marketCap),
        percentageChange: coin.priceChangePercentage24H
    }));

    //rank
    overviewStatistics.push(new StatisticalModel({
        title: "Rank",
        value: coin.rank,
    }));

    //volume
    overviewStatistics.push(new StatisticalModel({
        title: "Volume",
        value: "$" + formattedWithAbbreviations(coin.totalVolume),
    }));
}

function pushAdditionalStatistics(additionalStatistics, coin, coinDetails) {
    //24H high
    additionalStatistics.push(new StatisticalModel({
        title: "24h High",
        value: asCurrencyWith6Decimals(coin.high24H),
    }));

    //24H low
    additionalStatistics.push(new StatisticalModel({
        title: "24h Low",
        value: asCurrencyWith6Decimals(coin.low24H),
    }));

    //price change 24h
    additionalStatistics.push(new StatisticalModel({
        title: "24h Price Change",
        value: asCurrencyWith2Decimals(coin.priceChange24H),
        percentageChange: coin.priceChangePercentage24H
    }));

    //market cap change 24h
    additionalStatistics.push(new StatisticalModel({
        title: "24h Market Cap Change",
        value: "$" + formattedWithAbbreviations(coin.marketCapChange24H),
        percentageChange: coin.marketCapChangePercentage24H
    }));

    if (coinDetails !== null) {
        //block time
        const blockTime = coinDetails.blockTimeInMinutes ?? 0
        const blockTimeString = blockTime == 0 ? "N/A" : blockTime
        additionalStatistics.push(new StatisticalModel({
            title: "Block Time",
            value: blockTimeString,
        }));

        //hashing algorithm
        additionalStatistics.push(new StatisticalModel({
            title: "Hashing Algorithm",
            value: coinDetails.hashingAlgorithm ?? "N/A",
        }));
    }
}

export default DetailView;