import React, { useState } from "react";
import { ImageBackground, TouchableOpacity } from "react-native";
import {View, Text, StyleSheet, Dimensions} from "react-native";

export default function CinemaCard({cinemaClicked, cinemaContent}) {
    return (
          <View style={[styles.container]}>
              <View>
                <TouchableOpacity onPress={() => cinemaClicked(cinemaContent)}>
                  <View style={{width: "100%", backgroundColor: "rgba(176, 3, 3, 0.46)", padding: 0}}>
                <ImageBackground source={require("../assets/movieTheaterLogo2.png")} resizeMode="contain" style={styles.headerSection} imageStyle={{opacity: 1, width: "100%", margin: "auto"}}>
                  <Text style={styles.titleText}>{cinemaContent.cinema_name}</Text>
                 </ImageBackground>
                 </View>
              </TouchableOpacity>
              </View>
          </View>
    )
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#FFFFFF",
      marginLeft: Dimensions.get('screen').width * 0.05,
      marginRight: Dimensions.get('screen').width * 0.05,
      width: Dimensions.get('screen').width * 0.9,
      overflow: "hidden",
      justifyContent: "flex-start",
      gap: 20,
      alignItems: "stretch",
      borderRadius: 20,
      shadowColor: "#000000",
      shadowOffset: {width: 5, height: 5},
      shadowOpacity: 0.4,
    },
    
    headerSection: {
      width: "80%",
      height: Dimensions.get('screen').width * 1.3,
      margin: "auto"
    },
    
    titleText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: "#FFFFFF",
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderRadius: 20,
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 3,
      paddingBottom: 3,
      alignSelf: 'flex-start',
      marginTop: 30
    },
  });