import { useTheme } from '@/app/ColorThemes/ColorThemes';
import SearchBarView from '@/app/Components/SearchBarView';
import { asCurrencyWith2Decimals, asCurrencyWith6Decimals } from '@/app/Formatters/formatters';
import SavedCoinModel from '@/app/Models/SavedCoinModel';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, Keyboard, Modal, Platform, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import XButton from '../../Components/XButton';
import { saveCoin } from "../../Services/PortfolioDataService";
import { allCoins } from '../ViewModels/HomeViewModel';
// import { useCoins } from '../ViewModels/CoinContext';
import { usePortfolio } from '../ViewModels/PortfolioContext';
import CoinLogoView from '../Views/CoinLogoView';


function PortfolioView({ onClose }) {
    const { mainTheme } = useTheme();

    const [searchQuery, setSearchQuery] = useState("");

    const [selectedCoin, setSelectedCoin] = useState(null);

    const { portfolioCoins, setPortfolioCoins } = usePortfolio();

    //const { allCoins } = useCoins();

    const [quantityText, setQuantityText] = useState("");

    const [selection, setSelection] = useState({ start: 0, end: 0 });

    useEffect(() => {
        // Set selection to the end of the text after the component mounts or text changes
        setSelection({ start: quantityText.length, end: quantityText.length });
    }, [quantityText]); // Re-run effect if 'text' changes

    //search logic and debouncing
    const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 500); // 500ms debounce delay

        return () => {
            clearTimeout(handler); // Cancel previous timeout if user types again
        };
    }, [searchQuery]);

    //based on id, symbol, or name
    const filteredCoins = allCoins.filter((coin) => 
        coin.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        coin.id.toLowerCase().includes(debouncedQuery.toLowerCase())
    );

    function addRemoveElements(arr1, arr2) {
        console.log("all coins", allCoins);
        console.log("portfolio coins", portfolioCoins);

        const idsToRemove = new Set(arr1.map(item => item.id));

        const newArray = arr2.filter(item => !idsToRemove.has(item.id));
        console.log("new array", newArray);
        return arr1.concat(newArray);
    }

    function getCurrentValue() {
        const quantity = parseFloat(quantityText);

        if (isNaN(quantity)) return 0;

        return (quantity) * (selectedCoin?.currentPrice ?? 0);
    }

    function updateSelectedCoin(coin) {
        const savedCoin = portfolioCoins.find(c => c?.id === coin.id);

        const coinData = savedCoin ?? coin;

        if (!coinData) {
            console.warn("No coin data found for:", coin);
            return;
        }

        const coinWithMethods = new SavedCoinModel(
            coin.id,
            coin.name,
            coin.symbol,
            coin.rank,
            coin.image,
            coin.currentPrice,
            coin.priceChangePercentage24H,
            coin.currentHoldings
        );

        setSelectedCoin(coinWithMethods);

        if (coinData.currentHoldings == 0) {
            setQuantityText("");
        }
        else {
            setQuantityText(coinData.currentHoldings.toString());
        }
    }

    const check = require("../../../assets/images/checkmark.png");

    const [showCheckmark, setShowCheckmark] = useState(false);

    function saveButtonPressed() {
        //save to portfolio
        selectedCoin.updateHoldings(parseFloat(quantityText));
        saveCoin(selectedCoin, setPortfolioCoins);

        //show checkmark + remove selected coin
        setShowCheckmark(true);
        removeSelectedCoin();

        //hide keyboard
        Keyboard.dismiss();

        //hide checkmark
        setTimeout(function() {
            setShowCheckmark(false);
        }, 2000);
    }

    function removeSelectedCoin() {
        setSelectedCoin(null);
        setSearchQuery("");
    }

    useEffect(() => {
        if (searchQuery === "") {
            removeSelectedCoin();
        }
    }, [searchQuery]);

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={true}
                onRequestClose={onClose}
            >
                <SafeAreaView
                style={[
                    styles.modalContainer,
                    {backgroundColor: mainTheme.modalbg},]}
                >
                    <View style={{flexDirection: "row", marginTop: 10, margin: 5}}>
                        <XButton closeView={onClose} />
                        <View style={{flex: 1}}/>
                        <View style={{flexDirection: "row"}}>
                            <Image style={[styles.check, {paddingRight: 10, tintColor: mainTheme.accent, opacity: showCheckmark ? 1 : 0}]} source={check}></Image>
                            <Text style={{fontSize: 30, color: mainTheme.accent, fontWeight:"condensed", opacity: 0}}>
                                {"Save".toUpperCase()}
                            </Text>
                            <TouchableOpacity onPress={saveButtonPressed}>
                                {selectedCoin != null && (!isNaN(parseFloat(quantityText))) && (
                                    <View>
                                        <Text style={{fontSize: 30, color: mainTheme.accent, fontWeight:"condensed",}}>
                                            {"Save".toUpperCase()}
                                        </Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    <Text style={[styles.header, {color: mainTheme.accent}]}>Edit Portfolio</Text>


                    <View style={styles.searchContainer}>
                        <SearchBarView searchQuery={searchQuery} setSearchQuery={setSearchQuery} style={styles.searchBar}/>
                    </View>


                    <View style={styles.listContainer}>
                        <FlatList
                            data={searchQuery != "" ? filteredCoins : addRemoveElements(portfolioCoins, allCoins)}
                            horizontal={true}
                            showsHorizontalScrollIndicator={Platform.OS === 'web'}
                            renderItem={({item}) => (
                                <Pressable onPress={() => updateSelectedCoin(item)}>
                                    <View style={[styles.logoView, {borderColor: item.id == selectedCoin?.id ? mainTheme.green_color : "transparent", opacity: 1}]}>
                                        <CoinLogoView data={item}/>
                                    </View>
                                </Pressable>  
                            )}
                initialNumToRender={5} />
                    </View>

                    {selectedCoin != null && (
                        <View style={styles.portfolioContainer}>
                            <View style={{flexDirection: "row", paddingTop: 5, paddingBottom: 15,}}>
                                <Text style={[styles.portfolioText,{color: mainTheme.accent}]}>Current price of {selectedCoin.symbol.toUpperCase()}:</Text>
                                <View style={{flex: 1}}></View>
                                <Text style={[styles.portfolioText,{color: mainTheme.accent}]}>{asCurrencyWith6Decimals(selectedCoin?.currentPrice) ?? ""}</Text>
                            </View>

                            <View style={{borderBottomColor: "black", borderBottomWidth: StyleSheet.hairlineWidth,}} />

                            <View style={{flexDirection: "row", paddingTop: 15, paddingBottom: 15,}}>
                                <Text style={[styles.portfolioText,{color: mainTheme.accent}]}>Amount holding:</Text>
                                <View style={{flex: 1}}></View>
                                <TextInput 
                                    style={[styles.input, {color: mainTheme.accent}, {textAlign: 'right'}]}
                                    placeholder="Ex: 1.4"
                                    placeholderTextColor={mainTheme.secondaryText}
                                    value={quantityText}
                                    onChangeText={setQuantityText}
                                    keyboardType='decimal-pad'
                                    textAlign='right'
                                    selection={selection}
                                /> 
                            </View>

                            <View style={{borderBottomColor: "black", borderBottomWidth: StyleSheet.hairlineWidth,}} />

                            <View style={{flexDirection: "row", paddingTop: 15, paddingBottom: 15,}}>
                                <Text style={[styles.portfolioText,{color: mainTheme.accent}]}>Current Value:</Text>
                                <View style={{flex: 1}}></View>
                                <Text style={[styles.portfolioText,{color: mainTheme.accent}]}>{asCurrencyWith2Decimals(getCurrentValue())}</Text>
                            </View>

                        </View>
                    )}
                    
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
        height: '100%',
        padding: 20,
        borderRadius: 10,
        marginTop: Dimensions.get('window').height / 10,
        position: 'absolute',
        top: 0, // Keep the initial position at the top of the screen
    },
    header: {
        padding: 10,
        fontWeight: "bold",
        fontSize: 40,
    },
    check: {
        width: 30,
        height: 30,
        aspectRatio: 1,
    },
    searchContainer: {
        paddingBottom: 20,
    },
    searchBar: {
        padding: 10,
        margin: 10,
    },
    listContainer: {
        width: "100%",
        paddingLeft: 5,
    },
    logoView: {
        borderRadius: 10,
        borderWidth: 2,
        margin: 5,
        padding: 5,
    },
    portfolioContainer: {
        flexDirection: "column",
        padding: 20,
    },
    input: {
        fontSize: 20,
    },
    portfolioText: {
        fontWeight: "bold",
        fontSize: 20,
    },
});

export default PortfolioView;