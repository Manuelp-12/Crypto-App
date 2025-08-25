# Crypto Portfolio App

App/Website created using React Native and Expo. Displays global market data as well as individual data for the top 250 coins in the market. Individual coin data includes a graph of the prices from the last 7 days, a description of the coin, the current price, market capitalization, and much more. The user also has the ability to add coins to their portfolio which saves to the React Native asynchronous storage when the user reloads or exits the app/website. Additionally includes different color themes for light/dark modes.

# 🌐 Live website 

Visit here: [https://crypto-portfolio-app.expo.app](https://crypto-portfolio-app.expo.app)

# Homepage

Displays global market data - market cap, 24h volume, and bitcoin dominance, as well as the top 250 coins with general data - coin's current price and percentage change in the last 24 hours. Users can also search for coins and reload the data.

<img width="1442" height="1538" alt="image" src="https://github.com/user-attachments/assets/9afa3f66-bc87-4508-a221-8d775a24fbb5" />

# Coin Details

Shows a chart that animates on load, a description of the coin, general statistics about the coin such as current price and market cap. Also includes additional details such as the high and low within the past 24 hours as well as a link to the coin's website and Reddit.

<span>
  <p>
    <img alt="image" width="400" src="https://github.com/user-attachments/assets/7555394a-692b-40bb-b099-5d754e398af3" /> <!-- 1438 × 1528 -->
    &nbsp;&nbsp;&nbsp;&nbsp;
    <img width="400" height="425" alt="image" src="https://github.com/user-attachments/assets/297ef5d7-cde3-4099-b68c-f589ea7bde5b" /> <!-- 1436 × 1532 -->
  </p>
</span>

UPDATE: Now incldues predicted price for the next 24 hours using Pandas, a python data analysis library. The predicted future price shows as a gray line at the end of the chart.

<img width="2940" height="996" alt="image" src="https://github.com/user-attachments/assets/96517c28-3d6d-4b92-b7ec-d8ddc304ac4d" />


# Portfolio View

Users can view coins that they previously added to thier portfolio, as well as their amount holding and price. At the top of the screen, a new statistic "Portfolio Value" shows where the user can see their total amount holdings and the weighted percentage change of their coins within the last 24 hours. A plus also appears at the top left of the screen where the user can add more coins to their portfolio.

<img width="1438" height="1532" alt="image" src="https://github.com/user-attachments/assets/0f48bf74-0bf8-44aa-af81-30c992ea0551" />

<br>
<br>

Users can select which coins they want to add to their portfolio by scrolling through a list of coins or searching by the coin's name or symbol. Once they click a coin they are asked to input an amount holding, and the current value updates to show the price of that many holdings. Finally they can click a save button which saves to their portfolio.

<br>

<img width="1438" height="1534" alt="image" src="https://github.com/user-attachments/assets/7a58264f-0dee-4fc1-bdcc-fbd22dbd0717" />
