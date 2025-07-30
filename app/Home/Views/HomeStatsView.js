import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Easing, StyleSheet, View } from 'react-native';
//import { statistics } from "../../../app/Home/ViewModels/HomeViewModel";
import StatisticView from '../../Components/StatisticView';

function HomeStatsView({showPortfolio, stats}) {
    const translateX = useRef(new Animated.Value(0)).current;

    //console.log(stats);

    useEffect(() => {
        Animated.timing(translateX, {
            toValue: showPortfolio ? Dimensions.get('window').width / 3 * -1 : 0, // adjust this value as needed
            duration: 300,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }).start();
    }, [showPortfolio]);

    return (
        <Animated.View style={{transform: [{ translateX }]}}>
            <View style={[styles.container,]}>
            {stats.map((stat, index) => (
                <StatisticView key={index} data={stat} width={Dimensions.get('window').width / 3}/>
            ))}
        </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingBottom: 10,
        paddingTop: 5,
    },
});

export default HomeStatsView;