import React from 'react';
import { Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import color from "../../../app-example/constants/Colors";
import { useTheme } from "../../ColorThemes/ColorThemes";


const CustomButton = ({ onPress, style, imageSource }) => {
    const { isDark, mainTheme } = useTheme();
    const oppositeTheme = isDark ? color.light_colors : color.dark_colors;

    function hexToRgba(hex, opacity = 0.2) {
        hex = hex.replace(/^#/, '');

        if (hex.length === 3) {
            hex = hex.split('').map(char => char + char).join('');
        }

        if (hex.length !== 6) {
            throw new Error('Invalid HEX color.');
        }

        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;

        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }

    const dynamicShadow = Platform.select({
            ios: {
                shadowColor: mainTheme.accent,
                shadowOffset: { width: 2, height: 0 },
                shadowOpacity: 0.3,
                shadowRadius: 6,
                borderRadius: 999,
            },
                android: {
                elevation: 5,
            },
            web: {
                boxShadow: `0px 2px 10px ${hexToRgba(mainTheme.accent, 0.2)}`,
                borderRadius: 999,
            },
        });

    return (
        <View style={dynamicShadow}>
            <TouchableOpacity
                onPress={onPress}
                style={[
                    styles.buttonContainer,
                    {backgroundColor: mainTheme.button_color},
                ]}>
                <Image source={imageSource} style={[styles.image, {tintColor:oppositeTheme.background_color}]} resizeMode='contain'></Image>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    buttonContainer: {
        width: 50,
        height: 50,
        aspectRatio: 1,
        borderRadius: 999, //makes circle button - (width or height) / 2
        alignItems: 'center', //horizontal centering
        justifyContent: 'center', //vertical centering
        overflow: "hidden",
        borderWidth: 1,          //new line
        borderColor: 'transparent', //new line
    },
    image: {
        width: 25,
        height: 25,
        alignItems: "center",
        justifyContent: "center",
    },
});


export default CustomButton;