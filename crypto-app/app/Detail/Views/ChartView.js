import { useTheme } from '@/app/ColorThemes/ColorThemes';
import { formatDate, formattedWithAbbreviations } from '@/app/Formatters/formatters';
import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import Svg, { Path } from "react-native-svg";
import { predictPrices } from "../../Services/CoinPredictService"
import { _internal_preventAutoHideAsync } from 'expo-router/build/utils/splash';


const AnimatedPath = Animated.createAnimatedComponent(Path);


function ChartView({coin}) {


   if (!coin) return null;


   const { mainTheme } = useTheme();


   const data = coin.sparklineIn7D?.price ?? [];
   const [predictions, setPredictions] = useState([]);


   useEffect(() => {
       const fetchPredictions = async () => {
           const result = await predictPrices(data);
           setPredictions(result);
       };
       fetchPredictions();
   }, [coin]);


   //console.log("predictions: ", predictions);


   const maxY = Math.max(...data) ?? 1;
   const minY = Math.min(...data) ?? 0;


   const endingDate = formatDate(coin.lastUpdated ?? "");


   let startingDate = new Date(coin.lastUpdated ?? "");
   startingDate.setDate(startingDate.getDate() - 7);
   startingDate = formatDate(startingDate);


   let predictionDate = new Date(coin.lastUpdated ?? "");
   predictionDate.setDate(predictionDate.getDate() + 1);
   predictionDate = formatDate(predictionDate);


   //const chartSideLength = 300;
   var { width: screenWidth, height: screenHeight } = useWindowDimensions();
   const chartHeight = screenHeight * 0.3;


   //test
   //screenWidth = 300;


   const padding = 15;


   const priceChange = data[data.length - 1] - data[0];


   const lineColor = priceChange > 0 ? mainTheme.green_color : mainTheme.red_color;


   const points = data.map((value, index) => {
       const x = ((screenWidth * 7/8) / (data.length - 1)) * index;
       const normalizedY = (value - minY) / (maxY - minY);
       const y = (1 - normalizedY) * (chartHeight - 2 * padding) + padding;
       return { x, y };
   });


   // Build the path string starting at the first point (acc is previous point)
   const pathD = points.reduce((acc, point, index) => {
       return index === 0
           ? `M ${point.x} ${point.y}`
           : `${acc} L ${point.x} ${point.y}`;
   }, '');


   const predictionPoints = predictions.map((value, index) => {
       const x = ((screenWidth * 1/8) / (predictions.length - 1)) * index;
       const normalizedY = (value - minY) / (maxY - minY);
       const y = (1 - normalizedY) * (chartHeight - 2 * padding) + padding;
       return { x, y };
   });


   //console.log("last point:", points[points.length - 1].x)


   for (let i = 0; i < predictionPoints.length; i++) {
       predictionPoints[i].x += points[points.length - 1].x + (predictionPoints.length / 24);
   }


   const predictionPathD = predictionPoints.reduce((acc, point, index) => {
       if (index === 0) {
           return `M ${points[points.length - 1].x} ${points[points.length - 1].y} L ${point.x} ${point.y}`;
       }
       return `${acc} L ${point.x} ${point.y}`
   }, '');


   //console.log(data);


   const calculatePathLength = (array) => {
       let length = 0;
       for (let i = 1; i < array.length; i++) {
           const prev = array[i - 1];
           const current = array[i];
           const dx = current.x - prev.x;
           const dy = current.y - prev.y;
           length += Math.sqrt(dx * dx + dy * dy); // Distance formula
       }
       return length;
   };


   const pathLength = calculatePathLength(points);


   const predictionPathLength = calculatePathLength(predictionPoints);


   const progress = useSharedValue(1);
   const predictProgress = useSharedValue(1);


   useEffect(() => {
    // Animate the main path
    progress.value = withTiming(0, { duration: 3000 }, (isFinished) => {
        if (isFinished) {
            // Animate the prediction path after the first finishes
            predictProgress.value = withTiming(0, { duration: 3000 / 7 });
        }
    });
}, []);


   const animatedProps = useAnimatedProps(() => ({
       strokeDashoffset: pathLength * progress.value,
   }));

   const predictAnimatedProps = useAnimatedProps(() => ({
       strokeDashoffset: predictionPathLength * predictProgress.value,
   }));


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


   return (
       <View>
           <View>
               <Svg
                   width={screenWidth}
                   height={chartHeight}
               >
                   <AnimatedPath //main line
                       d={pathD}
                       stroke={lineColor}
                       strokeWidth="2"
                       fill="none"
                       strokeDasharray={pathLength}
                       animatedProps={animatedProps}
                   />


                   <AnimatedPath
                       d={predictionPathD}
                       stroke={"gray"}
                       strokeWidth="2"
                       fill="none"
                       strokeDasharray={predictionPathLength}
                       animatedProps={predictAnimatedProps}
                   />


               </Svg>


               <View style={StyleSheet.absoluteFill}>
                   <View style={{borderBottomColor: "black", borderBottomWidth: StyleSheet.hairlineWidth,}} />
                   <View style={{ flex: 1 }} />
                   <View style={{borderBottomColor: "black", borderBottomWidth: StyleSheet.hairlineWidth,}} />
                   <View style={{ flex: 1 }} />
                   <View style={{borderBottomColor: "black", borderBottomWidth: StyleSheet.hairlineWidth,}} />
               </View>


               <View style={StyleSheet.absoluteFill}>
                   <Text>
                       <Text style={{
                           color: mainTheme.secondaryText,
                           fontWeight: "bold",
                           fontSize: Platform.OS === 'web' ? 14 : 12,
                           backgroundColor: mainTheme.background_color
                       }}>{formattedWithAbbreviations(maxY)}</Text>
                   </Text>
                  
                   <View style={{ flex: 1 }} />


                   <Text>
                       <Text style={{
                           color: mainTheme.secondaryText,
                           fontWeight: "bold",
                           fontSize: Platform.OS === 'web' ? 14 : 12,
                           backgroundColor: mainTheme.background_color
                       }}>{formattedWithAbbreviations((maxY + minY) / 2)}</Text>
                   </Text>
                  
                   <View style={{ flex: 1 }} />


                   <Text>
                       <Text style={{
                           color: mainTheme.secondaryText,
                           fontWeight: "bold",
                           fontSize: Platform.OS === 'web' ? 14 : 12,
                           backgroundColor: mainTheme.background_color
                       }}>{formattedWithAbbreviations(minY)}</Text>
                   </Text>
               </View>
           </View>
          
           <View>
               <View style={{flexDirection: "row", width: "100%"}}>
                   {/* Starting date at the beginning */}
                    <Text style={{ color: mainTheme.secondaryText }}>{startingDate}</Text>

                    <View style={{ flex: 15 }} />

                    <Text style={{ color: mainTheme.secondaryText }}>{endingDate}</Text>

                    <View style={{ flex: 1 }} />

                    <Text style={{ color: mainTheme.secondaryText }}>{predictionDate}</Text>
               </View>
           </View>
       </View>
   );
}


const styles = StyleSheet.create({
   chartContainer: {
       flex: 1
   },
  
});


export default ChartView;