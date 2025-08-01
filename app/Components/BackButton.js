//import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from "../ColorThemes/ColorThemes";

function BackButton({closeView, style}) {
    const chevron = require("../../assets/images/chevron-right.png");
    const { mainTheme } = useTheme();

    return (
        <View style={[style, {paddingBottom: 5, paddingRight: 5}]}>
            <TouchableOpacity onPress={closeView}>
                <View style={styles.container}>
                    <Image source={chevron} style={[styles.image, {tintColor: mainTheme.accent}]}/>
                    <Text style={[styles.text, {color: mainTheme.accent}]}>Back</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    image: {
        transform: [{rotate: '180deg'}],
        width: 19,
        height: 19,
        aspectRatio: 1,
    },
    text: {
        fontSize: 19,
        paddingLeft: 3,
    },
});

export default BackButton;