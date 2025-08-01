import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../ColorThemes/ColorThemes';

function XButton({closeView, style}) {

    const { mainTheme } = useTheme();

    const x = require('../../assets/images/x-square.png');

    return (
        <View style={style}>
            <TouchableOpacity onPress={closeView}>
                <Image source={x} style={[styles.image, {tintColor:mainTheme.accent}]}></Image>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
   image: {
        width: 40,
        height: 40,
        aspectRatio: 1,
        padding: 5,
   } 
});

export default XButton;