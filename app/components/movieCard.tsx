import React, { useState } from "react";
import { ImageBackground, Pressable } from "react-native";
import {View, Text, StyleSheet, Dimensions} from "react-native";


export default function MovieCard({cardClicked, movieContent, opacityColor}) {

  const [imageOpacity, setImageOpacity] = useState(0.6);

  const clearBackgroundColor = () => {
    setImageOpacity(1);
  }

  const resetBackgroundColor = () => {
    setImageOpacity(0.6)
  }

  return (
    <View style={[movieCardStyles.container]}>
        <View>
          <Pressable onPress={() => cardClicked(movieContent.index)} onPressIn={() => clearBackgroundColor()} onPressOut={() => resetBackgroundColor()}>
            {/* <FastImage source={{uri: movieContent.image}} style={{ width: 100, height: 100 }} */}
            <ImageBackground source={{uri: movieContent.image}} resizeMode="cover" style={[movieCardStyles.headerSection, {backgroundColor: opacityColor}]} imageStyle={{opacity: imageOpacity}} onError={(error) => console.log("Image loading error:", error)}>
              <View style={movieCardStyles.movieCardTextContainer}>
              <Text style={movieCardStyles.titleText}>{movieContent.title}</Text>
              <Text style={movieCardStyles.titleText}>{movieContent.ageRating}</Text>
              </View>
            </ImageBackground>
        </Pressable>
        </View>
    </View>
  )
};

const movieCardStyles = StyleSheet.create({
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
      maxWidth: "70%"
    },

    movieCardTextContainer: {
      maxWidth: "100%",
      height: "100%",
      padding: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 20
    }
  });