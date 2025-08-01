import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useTheme } from "../ColorThemes/ColorThemes";
import { asPercentString } from "../Formatters/formatters";

function StatisticView({data, width, style}) {
    const { mainTheme } = useTheme();
    
    let stat = data;

    const triangle = require("../../assets/images/triangle.png");

    console.log("data:", data);

    const isPositive = typeof stat.percentageChange === 'number' && stat.percentageChange >= 0;

    return (
        <View style={[styles.container, {width: width}, style]}>
            <Text numberOfLines={1} adjustsFontSizeToFit={true} style={{color: mainTheme.secondaryText}}>{stat.title}</Text>
            <Text numberOfLines={1} adjustsFontSizeToFit={true} style={[styles.value, {color: mainTheme.accent, fontWeight: "bold"}]}>{stat.value}</Text>

            {stat.percentageChange != null ? (
                <View style={styles.percent}>
                    <Image
                    key={`triangle-${isPositive ? 'green' : 'red'}`}
                    source={triangle} 
                    style={[
                        styles.image,
                        {
                            tintColor: isPositive ? mainTheme.green_color : mainTheme.red_color,
                            transform: [{ rotate: isPositive ? '0deg' : '180deg' }]
                        }
                    ]} />
                    <Text style={{color: (stat.percentageChange ?? 0) >= 0 ? mainTheme.green_color : mainTheme.red_color}}>
                        {stat.percentageChange != null ? asPercentString(stat.percentageChange) : ""}</Text>
                </View>
            ) : (null)}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "flex-start",
        //alignItems: "center", //Makes web much better, but overall slightly worse
        flexDirection: "column",
        //width: Dimensions.get('window').width / 3, //for detailview stats
        paddingLeft: 10, //lines up in DetailView
        paddingRight: 10, //lines up in DetailView
    },
    value: {
        fontSize: 20, //change to 18 to see 6 digit nums for portfolio value
    },
    image: {
        width: 19,
        height: 19,
        aspectRatio: 1,
    },
    percent: {
        flexDirection: "row",
        alignItems: 'center',
    },
});

export default StatisticView;