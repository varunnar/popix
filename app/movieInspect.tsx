import React, { useEffect, useState } from "react";
import { ImageBackground, ScrollView, TouchableOpacity } from "react-native";
import {View, Text, StyleSheet, Dimensions} from "react-native";
import MovieTimeBubble from "./components/movieTimeBubble";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { Router } from "expo-router";
import { useMovieStore } from "../store/index";
//details/[id].tsx => /details/1 use something like this, the 1 is the localSearchParams

export default function movieInspect() {

    const navigation = useNavigation();

    const initial_url="https://image.tmdb.org/t/p/original/";
    const [movie, setMovie] = useState({});
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [rating, setRating] = useState("");

    const route = useRoute()

    const movieObject = useMovieStore(state => state.moviesData);
    const pickedMovieId = useMovieStore(state => state.pickedMovie);
    const movieItem = movieObject[pickedMovieId];




    const theMOVIEDB_api_search = async(title) => {
      //console.log("RUNNING")
      if (title == "" || title == null) {
        return;
      }
      try {
        const converted = encodeURIComponent(title.toLowerCase()).replace(/'/g, "%27");;
        const url = `https://api.themoviedb.org/3/search/movie?query=${converted}&include_adult=false&language=en-US&page=1&year=2025`;

        //console.log("url", url);

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
        //console.log("data", data.results[0]);
        //setMovie(data[0]);
        setImage(url);
        setDescription(data.results[0].overview);
        setRating(data.results[0].vote_average);
      }
      } catch(err) {
        console.log("catch errors in usage", err);
      }
    }

    useEffect(()=> {
      theMOVIEDB_api_search(movieItem.title);
    }), [movieItem]

    // const params = useLocalSearchParams();
    //console.log("movie time", movieItem);

    const navigateBack = () => {
        navigation.goBack();
    }

    return (
        <ScrollView style={[styles.container]} contentContainerStyle={styles.content}>
            <View>
              {image && 
                (<ImageBackground source={{uri: image}} resizeMode="contain" style={styles.headerSection} imageStyle={{opacity: 1 }} onError={(error)=>(console.log("EEROR FOUND ", error))}>
                    <View style={styles.topOptions}>
                        <Text style={styles.titleText}>{movieItem.title}</Text>
                        <TouchableOpacity style={styles.buttonContainer} onPress={navigateBack}>
                        <Text style={styles.closeButton} onPress={navigateBack}>X</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>)
              }
            </View>
            <View style={{padding: 10, gap: 10}}>
            {
              description && (
                <>
                <Text style={styles.subHeader}>{"Description:"}</Text>
                <Text style={styles.baseText}>{description}</Text>
                </>
              )
            }
            {
              rating && (
                <>
                <Text style={styles.subHeader}>Rating</Text>
                <Text style={styles.baseText}>{rating}</Text>
                </>
              )
            }
            <Text style={styles.subHeader}>{"Format: "}</Text>
            <Text style={styles.baseText}>{movieItem.format}</Text>
            <Text style={styles.subHeader}>{"ShowTimes"}</Text>
            <View style={styles.timeListings}>
                {movieItem.showtimes && movieItem.showtimes.map((showtime, index) => {
                    return (
                    <MovieTimeBubble key={index} time={showtime.start_time}></MovieTimeBubble>
                    )})
                }
            </View>
            <Text style={styles.subHeader}>{"Rating: " + movieItem.ageRating}</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#FFFFFF",
      width: "100%",
      overflow: "hidden",
    },

    content: {
        // alignItems: "flex-start",
        //justifyContent: "center",
        width: "100%",
        gap: 10
    },
    
    headerSection: {
      width: "100%",
      height: Dimensions.get('screen').height * .4,
      backgroundColor: "rgba(176, 3, 3, 0.46)",
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

    expandedView: {
      shadowOffset: {width: 0, height: 0},
      width: "100%",
      height: "100%",
      position: "fixed",
      zIndex: 1000
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
  });