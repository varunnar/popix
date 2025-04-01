/*
Creator: Varun Narayanswamy
Date: 03/26/2025
Overview: Displays Visualization of movie times in Gantt graph format. Uses scrolling to display full functionality and click function to navigate to pages
*/
import React, { useEffect, useRef, useState } from "react";
import { View, Dimensions, ScrollView, Text } from "react-native";
import { useRoute, useNavigation} from "@react-navigation/native";
import Svg, { Line, G, Text as SvgText, Rect, Image } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMovieStore } from "../store/index";
import * as d3 from "d3";

export default function MovieTimesVisualization() {


    //ZUSTAND movie ID
    const pickMovieId = useMovieStore(state => state.setPickedMovieData);

    //used to get knowledge of safe area size
    const insets = useSafeAreaInsets();
    const height_with_insets = Dimensions.get('screen').height - insets.bottom - insets.top;

    //used to navgiate
    const navigation = useNavigation();

    //route params
    const route = useRoute();
    const { movieTimeData } = route.params;

    //use states
    const [elementData, setElementData] = useState([]);
    const [xTicks, setXTicks] = useState([]);
    const [yTicks, setYTicks] = useState([])

    //widths and heights used in visualization
    const numberOfElements = movieTimeData.movieTimes.length;
    const width = 1200; 
    const height = numberOfElements * 80;
    const marginTop = 30;
    const marginBottom = 20;
    const marginLeft = 10;
    const marginRight = 10;
    const axis_height = height_with_insets - marginBottom;
    
    //color values
    const color_options = [
        "rgba(176, 3, 3, 0.6)",
        "rgba(255, 221, 89, 0.6)",  // Warm yellow
        "rgba(0, 128, 255, 0.6)",   // Vibrant blue
        "rgba(34, 177, 76, 0.6)",   // Strong green
        "rgba(255, 127, 39, 0.6)",  // Orange
        "rgba(163, 73, 164, 0.6)",  // Purple
        "rgba(255, 201, 14, 0.6)",  // Golden yellow
        "rgba(153, 217, 234, 0.6)", // Soft cyan
        "rgba(185, 122, 87, 0.6)",  // Warm brown
        "rgba(200, 191, 231, 0.6)", // Soft lavender
        "rgba(112, 146, 190, 0.6)", // Muted blue
        "rgba(181, 230, 29, 0.6)",  // Bright green
        "rgba(255, 174, 201, 0.6)", // Soft pink
        "rgba(195, 195, 195, 0.6)", // Neutral gray
        "rgba(94, 60, 153, 0.6)",   // Deep purple
        "rgba(255, 242, 0, 0.6)"    // Bright yellow
      ]
    
      const border_options = [
        "rgba(176, 3, 3, 1)",
        "rgba(255, 221, 89, 1)",  // Warm yellow
        "rgba(0, 128, 255, 1)",   // Vibrant blue
        "rgba(34, 177, 76, 1)",   // Strong green
        "rgba(255, 127, 39, 1)",  // Orange
        "rgba(163, 73, 164, 1)",  // Purple
        "rgba(255, 201, 14, 1)",  // Golden yellow
        "rgba(153, 217, 234, 1)", // Soft cyan
        "rgba(185, 122, 87, 1)",  // Warm brown
        "rgba(200, 191, 231, 1)", // Soft lavender
        "rgba(112, 146, 190, 1)", // Muted blue
        "rgba(181, 230, 29, 1)",  // Bright green
        "rgba(255, 174, 201, 1)", // Soft pink
        "rgba(195, 195, 195, 1)", // Neutral gray
        "rgba(94, 60, 153, 1)",   // Deep purple
        "rgba(255, 242, 0, 1)"    // Bright yellow
      ]

    const goToMovie = (index) => {
      pickMovieId(index);
      navigation.navigate('movieInspect');
    };

    useEffect(() => {
        const timeParses = d3.timeParse("%Y-%m-%d");

        const boxHeight= 70;
        const gap = height/numberOfElements * .1;
    
        //Set scales
        const xScale = d3.scaleTime()
            .domain([timeParses(movieTimeData.earliest), timeParses(movieTimeData.latest)])
            .range([marginLeft, width+marginRight])


        //set ticks for grid
        const x_Ticks = xScale.ticks().map((d) => ({
            value: d3.timeFormat("%b %d")(d), // Format date
            x: xScale(d)
        }));

        const y_Ticks = d3.range(marginTop, height, boxHeight+gap);

        setXTicks(x_Ticks);
        setYTicks(y_Ticks)
            
        //setup data for Gantt graph
        const formattedData = movieTimeData.movieTimes.map((movie, i) => {
            const title = movie.title;
            const start_box = xScale(timeParses(movie.earliest_date));
            const end_box = xScale(timeParses(movie.latest_date));
            const end = end_box-start_box;
            const y = (boxHeight + gap) * i + gap/2+marginTop;
            const height = boxHeight;
            const link = movie.image
            const index = i;
        
            return {
              index,
              title,
              start_box,
              end_box,
              end,
              y,
              height,
              link
            }
        });
        
        setElementData(formattedData);
        
    }, [movieTimeData]);

    const navigateBack = () => {
        navigation.goBack()
    }

    return(
        <View style={{ flex: 1, backgroundColor: "#000000" }}>
            <ScrollView
                style={{ flex: 1, backgroundColor: "#000000", width: "100%" }}
                horizontal={true}
                nestedScrollEnabled={true}
                directionalLockEnabled={false}
            >
            <ScrollView contentContainerStyle={{height: height+20}}>
              <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
                    {/* X-Axis Grid Lines */}
                    {xTicks.map((tick, index) => (
                        <Line
                            key={`x-grid-${index}`}
                            x1={tick.x} x2={tick.x} 
                            y1={0} y2={height} 
                            stroke="lightgray" strokeWidth={0.2} 
                        />
                    ))}

                    {/* Y-Axis Grid Lines */}
                    {yTicks.map((tick, index) => (
                        <Line
                            key={`y-grid-${index}`}
                            x1={50} x2={width}  // Start from margin
                            y1={tick} y2={tick} 
                            stroke="lightgray" strokeWidth={0.2} 
                        />
                    ))}
                    {/* Bars */}
                    {elementData.map((d, index) => (
                        <G key={index}>

                            <Rect
                                key={d.title}
                                x={d.start_box}
                                y={d.y}
                                width={d.end}
                                height={d.height}
                                rx={d.height / 10}
                                ry={d.height / 10}
                                fill={color_options[d.index]}
                                strokeWidth={3}
                                stroke={border_options[d.index]}
                                onPress={() => goToMovie(d.index)}
                            />
                            <SvgText
                                x={d.start_box + 5}
                                y={d.y + d.height / 2}
                                dy="0.50em"
                                dx="1em"
                                fontSize="14"
                                fill="white"
                            >
                                {d.title.length > d.end / 9 ? d.title.slice(0, d.end / 9) + "..." : d.title}
                            </SvgText>
                        </G>
                    ))}
                </Svg>
            </ScrollView>
            <View style={{position: "absolute", left: 0, top: 0, backgroundColor: "#FFFFFF"}}>
            <Svg width={width} height={30} viewBox={`0, 0, ${width}, ${30}`}>
                    {xTicks.map((tick, i) => (
                        <G key={i}>
                            <SvgText x={tick.x} y={20} fontSize="12" textAnchor="left">
                                {tick.value}
                            </SvgText>
                        </G>
                    ))}
            </Svg>
            </View>
            </ScrollView>
        </View>
    )
}