import React, { createContext, useContext, useState } from 'react';

// Create a context for portfolio coins
const PortfolioContext = createContext();

// Create a custom hook to use the Portfolio Context
export const usePortfolio = () => {
    return useContext(PortfolioContext);
};

// Create a provider component
export const PortfolioProvider = ({ children }) => {
    // Define the global state
    const [portfolioCoins, setPortfolioCoins] = useState([]);

    // Return the context provider with the global state and setter function
    return (
        <PortfolioContext.Provider value={{ portfolioCoins, setPortfolioCoins }}>
            {children}
        </PortfolioContext.Provider>
    );
}