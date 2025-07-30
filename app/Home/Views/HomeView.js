import { getSavedCoins } from '@/app/Services/PortfolioDataService';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, RefreshControl, StyleSheet, View } from "react-native";
import Animated, { SlideInLeft, SlideInRight, SlideOutLeft, SlideOutRight } from 'react-native-reanimated';
import HomeHeader from "../../Components/HomeHeader";
import NavBar from "../../Components/NavBar";
import SearchBarView from "../../Components/SearchBarView";
import DetailView from "../../Detail/Views/DetailView";
import { allCoins } from "../../Home/ViewModels/HomeViewModel";
import { populateCoins } from "../../Services/CoinDataService";
import { populateStatistics } from "../../Services/MarketDataService"; //comment to reduce API calls
// import { useCoins } from '../ViewModels/CoinContext'; //use for dynamic coin array
import { usePortfolio } from '../ViewModels/PortfolioContext';
import CoinRowView from "./CoinRowView";
import HomeStatsView from "./HomeStatsView";
import PortfolioView from "./PortfolioView";
import SettingsView from "./SettingsView";

function Home(props) {

    //switch between live coins and portfolio mode
    const [portfolioMode, setPortfolioMode] = useState(false);

    //user's first click response
    const [hasInteracted, setHasInteracted] = useState(false);

    //portfolio view
    const [showPortfolioView, setShowPortfolioView] = useState(false);

    //settings view
    const [showSettingsView, setShowSettingsView] = useState(false);

    //portfolio coins array
    const { portfolioCoins, setPortfolioCoins } = usePortfolio();

    //const { allCoins, setAllCoins } = useCoins();

    //handle JSON call and response
    const [coins, setCoins] = useState([]); //testing

    useEffect(() => {
        async function fetchCoins() {
            await populateCoins();
            setCoins([...allCoins]); // trigger UI update testing
        }
        fetchCoins();
    }, []);

    // useEffect(() => {
    //     const loadCoins = async () => {
    //         await fetchCoins(setAllCoins);
    //     };

    //     loadCoins();
    // }, []);

    //loads saved coins
    useEffect(() => {
            const loadSavedCoins = async () => {
                const savedCoins = await getSavedCoins();
                setPortfolioCoins(savedCoins);
        };
        loadSavedCoins();
    }, []);

    //handle JSON call and response
    const [stats, setStats] = useState([]);

    //comment to reduce API calls
    useEffect(() => {
        if (!portfolioCoins) return;

        async function fetchStats() {
            const calculatedStats = await populateStatistics(portfolioCoins); //passing in portfolio coins, update stats
            setStats(calculatedStats); // trigger UI update
        };
        fetchStats();
    }, [portfolioCoins]);

    //get search data and filter coins array
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = useCallback((query) => {
        setSearchQuery(query);
    }, [setSearchQuery]);

    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 500); // 500ms debounce delay

        return () => {
            clearTimeout(handler); // Cancel previous timeout if user types again
        };
    }, [searchQuery]);

    //based on id, symbol, or name
    const filteredCoins = allCoins.filter((coin) => 
        coin.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        coin.id.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );

    //load coins efficiently
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const coinsPerPage = 15;

    const dataToDisplay = portfolioMode
        ? portfolioCoins ?? [] 
        : (searchQuery !== "" ? filteredCoins ?? [] : allCoins ?? []);

    useEffect(() => {
        const initialCoins = dataToDisplay.slice(0, coinsPerPage);
        if (JSON.stringify(initialCoins) !== JSON.stringify(allCoins)) {
            setCoins(initialCoins);
        }
    }, [dataToDisplay]);

    const loadMoreCoins = () => {
        if (loading) return;  // Prevent loading if already loading
        setLoading(true);

        // Fetch next set of coins
        const nextPage = currentPage + 1;
        const nextCoins = dataToDisplay.slice(currentPage * coinsPerPage, nextPage * coinsPerPage);

        if (nextCoins.length > 0) {
            setCoins(prevCoins => [...prevCoins, ...nextCoins]);
            setCurrentPage(nextPage);
        }

        setLoading(false);
    };

    //reload logic
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = useCallback(async () => {
        setRefreshing(true);

        await populateCoins();
        //await fetchCoins(setAllCoins);
        setCoins([...allCoins]);

        const updatedStats = await populateStatistics(portfolioCoins); // comment to reduce API calls
        setStats(updatedStats); //comment to reduce API calls

        setRefreshing(false);
    }, [portfolioCoins]);

    const [selectedCoin, setSelectedCoin] = useState(null);
    const [showDetailView, setShowDetailView] = useState(false);
    
    function segue(coin) {
        setSelectedCoin(coin);
        setShowDetailView(true);
    }

    return (

        <View style={{flex: 1}}>

            <View style={styles.container}>

            <NavBar portfolioMode={portfolioMode} 
                setPortfolioMode={setPortfolioMode} 
                hasInteracted={hasInteracted} 
                setHasInteracted={setHasInteracted} 
                showPortfolioView={showPortfolioView} 
                setShowPortfolioView={setShowPortfolioView}
                setShowSettingsView={setShowSettingsView}
            />

            <HomeStatsView showPortfolio={portfolioMode} stats={stats}/>

            <SearchBarView style={styles.search} searchQuery={searchQuery} setSearchQuery={handleSearchChange} />

            <HomeHeader 
                portfolioMode={portfolioMode} 
                coins={coins} 
                setCoins={setCoins} 
                portfolioCoins={portfolioCoins}
                stats={stats} 
                setStats={setStats} 
            />

            <Animated.View
                style={{flex: 1}}
                key={portfolioMode ? 'portfolio' : 'live'}
                entering={ hasInteracted ? portfolioMode ? SlideInRight.duration(300) : SlideInLeft.duration(300) : null}
                exiting={portfolioMode ? SlideOutRight.duration(300) : SlideOutLeft.duration(300)}
            >
                <FlatList
                        style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10, }}
                        data={portfolioMode ? portfolioCoins || [] /* null coalesce*/ : searchQuery != "" ? filteredCoins : allCoins}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <Pressable onPress={() => segue(item)}>
                               <CoinRowView data={item} showHoldingsColumn={portfolioMode} /> 
                            </Pressable>
                        )}
                        initialNumToRender={15}
                        onEndReached={loadMoreCoins}
                        onEndReachedThreshold={0.5} //loads more when 50% of list is visible
                        ListFooterComponent={
                            loading ? (
                                <View style={{padding: 10}}>
                                    <ActivityIndicator size="large"/>
                                </View>
                            ) : null
                        }
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh}/>
                        }
                    />
                
            </Animated.View>

            {showSettingsView && (
                <View>
                    <SettingsView onClose={() => setShowSettingsView(false)}/>
                </View>
            )}

            {portfolioMode && showPortfolioView && (
                <View>
                    <PortfolioView onClose={() => setShowPortfolioView(false)}/>
                </View>
            )}

            {selectedCoin && (
                <DetailView data={selectedCoin} onClose={() => setShowDetailView(false)} showDetailView={showDetailView} portfolioMode={portfolioMode}/>
            )}

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
    container: {
        flexDirection: "column",
        flex: 1,
    },
    search: {
        padding: 10,
        margin: 10,
    },
});

export default Home;