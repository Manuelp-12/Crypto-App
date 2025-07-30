import { useTheme } from '@/app/ColorThemes/ColorThemes';
import LocalFileManager from '@/app/Utilities/LocalFileManager';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


function CoinLogoView({data}) {
    const { mainTheme } = useTheme();
    
    let coin = data;
    return (
        <View style={styles.container}>
            <LocalFileManager uri={coin.imageURL} style={styles.circle} placeholder={<View style={[styles.circle, styles.placeholder]} />}/>

            <Text numberOfLines={1} style={[styles.logoText, {color: mainTheme.accent}]}>{coin.symbol.toUpperCase()}</Text>
            <Text numberOfLines={2} style={[styles.nameText, {color: mainTheme.secondaryText}]}>{coin.name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingLeft: 10,
        paddingRight: 10,
        // margin: 10,
        flexDirection: "column",
        //minHeight: 40,
    },
    circle: {
        width: 60,
        height: 60,
        aspectRatio: 1,
        borderRadius: 999,
    },
    placeholder: {
        backgroundColor: "#000000",
    },
    logoText: {
        fontWeight: "bold",
        fontSize: 20,
        justifyContent: "center",
    },
    nameText: {
        fontSize: 15,
        justifyContent: "center",
    },
});

export default CoinLogoView;