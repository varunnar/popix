import React, { useState } from "react";
import { ImageBackground, TouchableOpacity } from "react-native";
import {View, Text, StyleSheet, Dimensions} from "react-native";
import FastImage from 'react-native-fast-image';


export default function MovieCard({cardClicked, movieContent, opacityColor}) {

    return (
          <View style={[styles.container]}>
              <View>
                <TouchableOpacity onPress={() => cardClicked(movieContent.index)}>
                  {/* <FastImage source={{uri: movieContent.image}} style={{ width: 100, height: 100 }} */}
                  <ImageBackground source={{uri: movieContent.image}} resizeMode="cover" style={[styles.headerSection, {backgroundColor: opacityColor}]} imageStyle={{opacity: 0.6}} onError={(error) => console.log("Image loading error:", error)}>
                    <View style={{width: "100%", height: "100%", padding: 10, flexDirection: "row", justifyContent: "space-between"}}>
                    <Text style={styles.titleText}>{movieContent.title}</Text>
                    <Text style={styles.titleText}>{movieContent.ageRating}</Text>
                    </View>
                  </ImageBackground>
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
      width: "100%",
      height: Dimensions.get('screen').width * 1.3,
      // backgroundColor: "rgba(176, 3, 3, 0.9)",
      //padding: 10
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
      alignSelf: 'flex-start'
    },
  });