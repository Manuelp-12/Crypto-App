import { useTheme } from '@/app/ColorThemes/ColorThemes';
import XButton from '@/app/Components/XButton';
import React from 'react';
import { Image, Linking, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Modal } from 'react-native-web';

function SettingsView({ onClose }) {
    const { mainTheme, isDark } = useTheme();

    const pfp = require('../../../assets/images/githubpfp.png');
    const logo = require('../../../assets/images/logo-transparent.png');
    const coinGecko = require('../../../assets/images/coingecko.png');

    return (
        <View style={styles.container}>
            <Modal
            animationType="slide"
            transparent={true}
            visible={true}
            onRequestClose={onClose}>

                <SafeAreaView
                    style={[
                        styles.modalContainer,
                        {backgroundColor: mainTheme.modalbg},]}
                >
                    <XButton closeView={onClose} style={{marginTop: 10, margin: 5}}/>

                    <Text style={[styles.header, {color: mainTheme.accent}]}>Settings</Text>

                    <ScrollView>

                        <View style={styles.settingsBox}>
                            <Text style={{color: mainTheme.secondaryText, padding: 10,}}>{"developer".toUpperCase()}</Text>

                            <View style={{backgroundColor: mainTheme.button_color, padding: 10,}}>                                
                                <Image source={pfp} style={styles.profileimg}/>
                                <Text style={{color: mainTheme.accent, paddingBottom: 10,}}>
                                    This app was developed by Manuel Paul. It was built using React Native and uses its tools to function on mobile 
                                    as well as desktop devices. The project uses real time data and asynchronous memory to create a fully 
                                     functioning cryptocurrency portfolio.
                                </Text>

                                <View style={{borderBottomColor: mainTheme.secondaryText, borderBottomWidth: StyleSheet.hairlineWidth,}} />

                                <View style={{paddingTop: 10,}}>
                                    <Text style={{color: isDark ? "#C11C84" : "#24A0ED", fontWeight: "bold", fontSize: 20}} onPress={() => Linking.openURL("https://github.com/Manuelp-12")}>Visit GitHub</Text>
                                </View>

                            </View>
                        </View>

                       <View style={styles.settingsBox}>
                            <Text style={{color: mainTheme.secondaryText, padding: 10,}}>{"coingecko".toUpperCase()}</Text>

                            <View style={{backgroundColor: mainTheme.button_color, padding: 10,}}>                                
                                <Image source={coinGecko} style={styles.image}/>
                                <Text style={{color: mainTheme.accent, paddingBottom: 10,}}>
                                    This is the cryptocurrency data that is used in this app and comes from a free API (with key) from CoinGecko! Prices may be slightly delayed.
                                </Text>

                                <View style={{borderBottomColor: mainTheme.secondaryText, borderBottomWidth: StyleSheet.hairlineWidth,}} />

                                <View style={{paddingTop: 10,}}>
                                    <Text style={{color: isDark ? "#C11C84" : "#24A0ED", fontWeight: "bold", fontSize: 20}} onPress={() => Linking.openURL("https://www.coingecko.com")}>Visit CoinGecko</Text>
                                </View>

                            </View>
                        </View>

                        <View style={styles.settingsBox}>
                            <Text style={{color: mainTheme.secondaryText, padding: 10,}}>{"swiftful thinking".toUpperCase()}</Text>

                            <View style={{backgroundColor: mainTheme.button_color, padding: 10,}}>
                                <Image source={logo} style={styles.image}/>
                                
                                <Text style={{color: mainTheme.accent, paddingBottom: 10,}}>
                                    This app is built based on the Swiftful Thinking course on YouTube, 
                                    which teaches modern iOS development using Swift. The app follows MVVM architecture, 
                                    separating the UI from business logic for better maintainability. 
                                    It leverages Combine for reactive data binding and Core Data for persistent data storage, 
                                    ensuring smooth, real-time updates and efficient data management. This project not only showcases 
                                    best practices in Swift development but also serves as a hands-on example of how to create scalable, 
                                    well-architected apps.
                                </Text>

                                <View style={{borderBottomColor: mainTheme.secondaryText, borderBottomWidth: StyleSheet.hairlineWidth,}} />

                                <View style={{paddingTop: 10,}}>
                                    <Text style={{color: isDark ? "#C11C84" : "#24A0ED", fontWeight: "bold", fontSize: 20}} onPress={() => Linking.openURL("https://www.youtube.com/@SwiftfulThinking")}>Visit YouTube</Text>
                                </View>

                            </View>
                        </View>  

                    </ScrollView>
                    
                </SafeAreaView>

            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    modalContainer: {
        width: '100%',
        flex: 1,
        padding: 20,
        borderRadius: 10,
    },
    header: {
        padding: 10,
        fontWeight: "bold",
        fontSize: 40,
    },
    settingsBox: {
        width: '100%',
        marginBottom: 20,
    },
    profileimg: {
        marginBottom: 10,
        maxHeight: 100,
        maxWidth: 100,
    },
    image: {
        marginBottom: 10,
        maxHeight: 75,
        maxWidth: 300,
    },
    circle: {
        width: 60,
        height: 60,
        aspectRatio: 1,
        borderRadius: 15,
    },
    placeholder: {
        backgroundColor: "#000000",
    },
    
});

export default SettingsView;