import React from 'react';
import { Dimensions, StyleSheet, Text, View } from "react-native";
import LocalFileManager from "../../../app/Utilities/LocalFileManager";
import { useTheme } from "../../ColorThemes/ColorThemes";
import { asCurrencyWith2Decimals, asCurrencyWith6Decimals, asNumberString, asPercentString } from "../../Formatters/formatters";

function CoinRowView({ data, showHoldingsColumn }) {
    const { mainTheme } = useTheme();
    
    let coin = data;
    return (
        <View>

            <View style={styles.container}>
                    <Text style={{color: mainTheme.accent, paddingRight: 10}}>{coin.rank}</Text>

                    <LocalFileManager uri={coin.imageURL} style={styles.circle} placeholder={<View style={[styles.circle, styles.placeholder]} />}/>
                    
                    <Text style={{paddingLeft: 6, color: mainTheme.accent, fontWeight: "bold", fontSize: 18,}}>{coin?.symbol?.toUpperCase() || ""}</Text>
                    <View style={{flex: 1}}/>

                    {showHoldingsColumn && (
                        <View style={styles.holdingsContainer}>
                            <Text style={{color: mainTheme.accent, fontWeight: "bold"}}>{asCurrencyWith2Decimals(coin.currentHoldingsValue) || "0"}</Text>
                            <Text style={{color: mainTheme.accent}}>{asNumberString((coin?.currentHoldings ?? 0))}</Text>
                        </View>
                    )}

                    <View style={styles.coinData}>
                        <Text style={{fontWeight: "bold", color: mainTheme.accent}}>{asCurrencyWith6Decimals(coin.currentPrice)}</Text>
                        <Text style={{
                            color: (coin.priceChangePercentage24H ?? 0) >= 0 ? mainTheme.green_color : mainTheme.red_color
                        , fontWeight: "bold",}}>
                            {asPercentString(coin.priceChangePercentage24H) ?? ""} </Text>
                    </View>
            </View>

            <View style={{borderBottomColor: "black", borderBottomWidth: StyleSheet.hairlineWidth,}} />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        minHeight: 30,
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10,
    },
    circle: {
        width: 30,
        height: 30,
        aspectRatio: 1,
        borderRadius: 15,
    },
    placeholder: {
        backgroundColor: "#000000",
    },
    holdingsContainer: {
        flexDirection: "column",
        alignItems: "flex-end"
    },
    coinData: {
        flexDirection: "column",
        alignItems: "flex-end",
        width: Dimensions.get('window').width / 3.5,
    },
});

export default CoinRowView;