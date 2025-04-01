/*
Creator: Varun Narayanswamy
Date: 03/26/2025
Overview: Displays movie details such as image, rating, picture and more. Collects data from TMDB api and MovieGlu
*/
import React, { useEffect, useState } from "react";
import { ImageBackground, ScrollView, TouchableOpacity } from "react-native";
import {View, Text, inspectedMovieStylesheet, Dimensions} from "react-native";
import MovieTimeBubble from "./components/movieTimeBubble";
import { useNavigation } from "@react-navigation/native";
import { useMovieStore } from "../store/index";

export default function movieInspect() {

  //navigation content
  const navigation = useNavigation();

  const initial_url="https://image.tmdb.org/t/p/original/";
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [rating, setRating] = useState("");

  //Zustand
  const movieObject = useMovieStore(state => state.moviesData);
  const pickedMovieId = useMovieStore(state => state.pickedMovie);
  const movieItem = movieObject[pickedMovieId];


  //card color
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
  ];



  //Collecting data from TMDB
  const theMOVIEDB_api_search = async(title) => {
    if (title == "" || title == null) {
      return;
    }
    try {
      const converted = encodeURIComponent(title.toLowerCase()).replace(/'/g, "%27");;
      const url = `https://api.themoviedb.org/3/search/movie?query=${converted}&include_adult=false&language=en-US&page=1&year=2025`;
      const headers =  {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_READ_TOKEN}`
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: headers
      });

      if (response == null) {
        console.log("Failed to collect additional movie data");
        return
      }


    const data = await response.json();

    if (data.success == false) {
      return
    }
    if (data && data.results && data.results[0]) {
      const url = initial_url+data.results[0].poster_path
      setImage(url);
      setDescription(data.results[0].overview);
      setRating(data.results[0].vote_average);
    }
    } catch(err) {
      console.log("catch errors in usage", err);
    }
  }

  //begin search for API on mount once movieItem is found
  useEffect(()=> {
    theMOVIEDB_api_search(movieItem.title);
  }), [movieItem]


  //back button
  const navigateBack = () => {
      navigation.goBack();
  }

    return (
        <ScrollView style={[inspectedMovieStyles.container]} contentContainerStyle={inspectedMovieStyles.scrollViewInternalContent}>
            <View>
              {image && 
                (<ImageBackground source={{uri: image}} resizeMode="contain" style={[inspectedMovieStyles.headerSection, {backgroundColor: color_options[pickedMovieId],}]} imageStyle={{opacity: 1 }} onError={(error)=>(console.log("EEROR FOUND ", error))}>
                    <View style={inspectedMovieStyles.topOptions}>
                        <Text style={inspectedMovieStyles.titleText}>{movieItem.title}</Text>
                        <TouchableOpacity style={inspectedMovieStyles.buttonContainer} onPress={navigateBack}>
                        <Text style={inspectedMovieStyles.closeButton} onPress={navigateBack}>X</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>)
              }
            </View>
            <View style={inspectedMovieStyles.movieTextContent}>
            {
              description && (
                <>
                <Text style={inspectedMovieStyles.subHeader}>{"Description:"}</Text>
                <Text style={inspectedMovieStyles.baseText}>{description}</Text>
                </>
              )
            }
            {
              rating && (
                <>
                <Text style={inspectedMovieStyles.subHeader}>Rating</Text>
                <Text style={inspectedMovieStyles.baseText}>{rating}</Text>
                </>
              )
            }
            <Text style={inspectedMovieStyles.subHeader}>{"Format: "}</Text>
            <Text style={inspectedMovieStyles.baseText}>{movieItem.format}</Text>
            <Text style={inspectedMovieStyles.subHeader}>{"ShowTimes"}</Text>
            <View style={inspectedMovieStyles.timeListings}>
                {movieItem.showtimes && movieItem.showtimes.map((showtime, index) => {
                    return (
                    <MovieTimeBubble key={index} time={showtime.start_time}></MovieTimeBubble>
                    )})
                }
            </View>
            <Text style={inspectedMovieStyles.subHeader}>{"Age Rating: " + movieItem.ageRating}</Text>
            </View>
        </ScrollView>
    )
}

const inspectedMovieStyles = inspectedMovieStylesheet.create({
    container: {
      backgroundColor: "#FFFFFF",
      width: "100%",
      overflow: "hidden",
    },

    scrollViewInternalContent: {
        width: "100%",
        gap: 10
    },
    
    headerSection: {
      width: "100%",
      height: Dimensions.get('screen').height * .4,
   },

   buttonContainer: {
    backgroundColor: "black",
    width: 30,
    height: 30,
    borderRadius: 20
   },

   closeButton: {
    margin: "auto",
    textAlign: "center",
    color: "#FFFFFF"
   },

   topOptions: {
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center",
    margin: "2.5%",
    width: "95%"
   },

    timeListings: {
      flexWrap: "wrap",
      gap: 10,
      width: "100%",
      flexDirection: "row"
    },
    subHeader: {
        fontFamily: 'dm-sans',
        fontSize: 20,
        fontWeight: 'bold'
    },
    baseText: {
      fontFamily: 'dm-sans',
      fontSize: 16
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

    movieTextContent: {
      padding: 10,
      marginBottom: 20,
      gap: 10
    }
  });