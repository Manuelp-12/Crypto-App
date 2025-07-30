import React from 'react';
import { Dimensions, Image, Platform, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from "../ColorThemes/ColorThemes";

function SearchBarView({style, searchQuery, setSearchQuery}) {
    const { mainTheme } = useTheme();
    
    const magnifyingGlass = require("../../assets/images/magnifying-glass.png");

    const deleteButton = require("../../assets/images/x.png");

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

    const handlePress = () => {
        setSearchQuery("");
        //Keyboard.dismiss();
    }

    return (
        <View style={[style, dynamicShadow, {backgroundColor: mainTheme.strong,}]}>
            <View style={[styles.container, {backgroundColor: mainTheme.strong}]}>
                <Image source={magnifyingGlass} style={[styles.search, {tintColor: searchQuery == "" ? mainTheme.secondaryText : mainTheme.accent}]}></Image>
                <TextInput
                    style={[styles.input, {color: mainTheme.accent}]}
                    placeholder='Search by name or symbol...'
                    placeholderTextColor={mainTheme.accent}
                    value={searchQuery}
                    autoCorrect={false}
                    onChangeText={setSearchQuery} />

                {searchQuery != "" ? (
                    <View style={{paddingLeft: 5}}>
                        <TouchableOpacity onPress={handlePress}>
                            <Image source={deleteButton} style={[styles.delete, { tintColor: mainTheme.accent }]} />
                        </TouchableOpacity>
                    </View>
                ) : (null)}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 5,
        borderRadius: 999,
        alignItems: "center",
        flexGrow: 1,
    },
    search: {
        width: 25,
        height: 25,
        aspectRatio: 1,
    },
    input: {
        paddingLeft: 10,
        borderWidth: 1,
        flex: 1,
        borderColor: "transparent",
        minWidth: 50,
        maxWidth: Dimensions.get('window').width * 0.85,
        ...Platform.select({
            web: {
                outlineStyle: 'none',  // removes default focus outline in web browsers
                borderColor: 'transparent',
                borderWidth: 1,
            },
        }),
    },
    delete: {
        width: 25,
        height: 25,
    }
});

export default SearchBarView;