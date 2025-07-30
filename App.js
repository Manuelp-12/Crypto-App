import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from './app/ColorThemes/ColorThemes';
import { PortfolioProvider } from './app/Home/ViewModels/PortfolioContext';
import Home from "./app/Home/Views/HomeView";

function App(props) {
  const { mainTheme } = useTheme();

  return (
    <SafeAreaView style={[
      styles.container,
      {backgroundColor: mainTheme.background_color},
    ]}>
    <PortfolioProvider>
      <Home />
    </PortfolioProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default App;