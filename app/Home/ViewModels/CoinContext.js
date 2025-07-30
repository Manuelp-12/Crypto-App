import React, { createContext, useContext, useState } from 'react';

// Create a context for portfolio coins
const CoinContext = createContext();

// Create a custom hook to use the Portfolio Context
export const useCoins = () => {
    return useContext(CoinContext);
};

// Create a provider component
export const CoinProvider = ({ children }) => {
    // Define the global state
    const [allCoins, setAllCoins] = useState([]);

    // Return the context provider with the global state and setter function
    return (
        <CoinContext.Provider value={{ allCoins, setAllCoins }}>
            {children}
        </CoinContext.Provider>
    );
}