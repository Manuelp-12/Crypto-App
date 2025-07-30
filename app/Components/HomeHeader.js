import { useCallback, useState } from 'react';
import { Dimensions, Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useTheme } from "../ColorThemes/ColorThemes";
import { allCoins } from '../Home/ViewModels/HomeViewModel';
// import { useCoins } from '../Home/ViewModels/CoinContext'; //use for dynamic coin array
import { populateCoins } from '../Services/CoinDataService';
import { populateStatistics } from "../Services/MarketDataService"; //comment to reduce API calls

function HomeHeader({portfolioMode, coins, setCoins, portfolioCoins, stats, setStats}) {
    const { mainTheme } = useTheme();
    
    const rotation = useSharedValue(0);
    
    const reloadStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    rotate: `${interpolate(rotation.value, [0, 1], [0, 360])}deg`,
                },
            ],
        };
    });

    //reload logic
    const [refreshing, setRefreshing] = useState(false);

    //const { allCoins, setAllCoins } = useCoins();

    const handleRefresh = useCallback(async () => {
        setRefreshing(true);

        if (Platform.OS === 'web') {
            rotation.value = withTiming(refreshing ? 0 : 1, { duration: 350 });
        }

        await populateCoins();
        //fetchCoins(setAllCoins);
        setCoins([...allCoins]);

        const updatedStats = await populateStatistics(portfolioCoins); // comment to reduce API calls
        setStats(updatedStats); //comment to reduce API calls

        
        rotation.value = withTiming(0, { duration: 0 });
        rotation.value = withTiming(1, { duration: 350 });
        setRefreshing(false);
    }, [portfolioCoins]);

    const reload = require("../../assets/images/reload.png");

    return (
        <View style={styles.header}>
        
            <Text style={{color: mainTheme.secondaryText}}>Coin</Text>

            <View style={{flex: 1}}/>

            {portfolioMode ? (
                <Animated.View
                entering={FadeIn.duration(300)}
                exiting={FadeOut.duration(300)}>
                    <View style={{width: Dimensions.get('window').width / 3.5}}>
                    <Text style={{color: mainTheme.secondaryText, textAlign: "left"}}>Holdings</Text>
                </View>  
                </Animated.View>
            ) : null}

            <View style={{alignItems: "flex-end", width: Platform.OS === 'web' ? 70 : undefined, flexDirection: "row"}}>
                <Text style={{color: mainTheme.secondaryText,}}>Price</Text>
                {Platform.OS === 'web' ? (
                    <Animated.View style={[reloadStyle, {paddingLeft: 5, flexDirection: 'row',}]}>
                        <Pressable onPress={handleRefresh}>
                            <Image source={ reload } style={styles.image} resizeMode="contain" tintColor={mainTheme.accent} /> 
                        </Pressable>
                    </Animated.View>
                ) : null}
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 20,
    },
    image: {
        width: 17, 
        height: 17, 
        aspectRatio: 1,
    },
});

export default HomeHeader;