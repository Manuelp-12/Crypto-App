import * as Font from 'expo-font';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useTheme } from "../ColorThemes/ColorThemes";
import CircleButtonAnimationView from './CircleButton/CircleButtonAnimationView';
import CircleButton from "./CircleButton/CircleButtonView";

function NavBar({portfolioMode, setPortfolioMode, hasInteracted, setHasInteracted, showPortfolioView, setShowPortfolioView, setShowSettingsView}) {

    const { mainTheme } = useTheme();

    const info = require("../../assets/images/info2.png");
    const plus = require("../../assets/images/plus.png");
    const chevron_right = require("../../assets/images/chevron-right.png");

    var navText = portfolioMode ? "Portfolio" : "Live prices";

    //handle chevron click + animation
    const rotateValue = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    rotate: `${interpolate(rotateValue.value, [0, 1], [0, 180])}deg`,
                },
            ],
        };
    });

    const rotateButton = () => {
        if (!hasInteracted) {
            setHasInteracted(true); //animates only after first press
        }
        setPortfolioMode(!portfolioMode);
        rotateValue.value = withTiming(portfolioMode ? 0 : 1, { duration: 350 });
    };

    const portfolioButtonClick = () => {
        if (portfolioMode) {
            setShowPortfolioView(!showPortfolioView);
        }
        else {
            setShowSettingsView(true); //open settings view
            setHasInteracted(true); //animates only after first press
        }
    }

    //handle fonts
    const [fontLoaded, setFontLoaded] = useState(false);

    useEffect(() => {
        async function loadFont() {
            await Font.loadAsync({
                'Sora': require("../../assets/fonts/Sora-Bold.ttf"),
            });
            setFontLoaded(true);
        }

        loadFont();
    }, []);

    //MOVE ALL HOOKS BEFORE THIS LINE (early return)
    if (!fontLoaded) {
        return null; // or show a loading screen
    }

    return (
        <View style={[
                    styles.navBar,
                    {backgroundColor: mainTheme.background_color},
                ]}>

                <View style={styles.buttonContainer}>
                    <CircleButtonAnimationView animate={portfolioMode}></CircleButtonAnimationView>
                    <CircleButton imageSource={portfolioMode ? plus : info} onPress={portfolioButtonClick}></CircleButton>
                </View>

                <View style={{flex: 1}}/>

                <Text style={[
                    styles.homeText,
                    {color: mainTheme.primary},
                ]}>
                    {navText}
                </Text>

                <View style={{flex: 1}}/>

                <Animated.View style={[styles.button, animatedStyle]}>
                    <CircleButton imageSource={chevron_right} onPress={rotateButton}></CircleButton>
                </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    navBar: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 15,
    },
    buttonContainer: {
        width: 50,
        height: 50,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    homeText: {
        fontFamily: 'Sora',
        fontSize:  30,
    }
});

export default NavBar;