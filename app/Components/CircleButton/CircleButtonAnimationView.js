import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useTheme } from "../../ColorThemes/ColorThemes";

const CircleButtonAnimationView = ({animate}) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const opacityAnim = useRef(new Animated.Value(1)).current;

    const { mainTheme } = useTheme();

    useEffect(() => {
        if (animate == true) {
            scaleAnim.setValue(1);
            opacityAnim.setValue(1);

            Animated.parallel([
                Animated.timing(scaleAnim, {
                    toValue: 3, //expand to 3x
                    duration: 1000, //1s    
                    useNativeDriver: true,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 0, //fades to transparent
                    duration: 1000, //1s
                    useNativeDriver: true,
                })
            ]).start();
        }
        else {
            scaleAnim.setValue(1);
            opacityAnim.setValue(1);
        }
    }, [animate, scaleAnim, opacityAnim]);

    if (!animate) {
        return null;
    }

    return <Animated.View style={[
            styles.circle,
            {
                borderColor: mainTheme.accent,
                transform: [{scale: scaleAnim}],
                opacity: opacityAnim,
            }
        ]} 
    />
}

const styles = StyleSheet.create({
    circle: {
        width: 50,
        height: 50,
        aspectRatio: 1,
        borderRadius: 25,
        borderWidth: 2,
        backgroundColor: "transparent",
        position: "absolute",
    }
})

export default CircleButtonAnimationView;