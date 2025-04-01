/*
Creator: Varun Narayanswamy
Date: 03/26/2025
Overview: Displays movie theater locations based on user's location. Allows to click to reach more movie theaters
*/
import { StyleSheet, Animated, TouchableHighlight, View, NativeSyntheticEvent, NativeScrollEvent, Dimensions } from "react-native";
import {useState, useEffect, useRef } from 'react';
import CinemaCard from "./components/cinemaCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useCinemaStore, useLocationStore } from "../store/index";

import * as Location from 'expo-location';

export default function Index() {

  //ZUSTAND FUNCS
  const setlocationStore = useLocationStore((state => state.setLocation));
  const getlong = useLocationStore((state => state.long));
  const getlat = useLocationStore((state => state.lat))

  const setCinemaStores = useCinemaStore((state => state.setCinemasData));
  const storedCinema = useCinemaStore((state => state.cinemasData));
  const setCinemaPicked = useCinemaStore((state => state.setCinemaNumber));


  //Card movement animation
  const cardWidth = Dimensions.get('screen').width * 0.9;
  const jumpThreshold = 0.5;
  const [currentCard, setCurrentCard] = useState(0)
  const scrollRef = useRef<Animated.FlatList>(null);

  const navigation = useNavigation();

  //Used to avoid unnecessary API calls
  const [hasFetched, setHasFetched] = useState(false);

  //cinema data displayed
  const [base_cinema_data, set_base_cinema_data] = useState(null);


  //Movie theater times sample
  const movie_theater_sample = {
    "cinemas": [
        {
            "cinema_id": 10560,
            "cinema_name": "Cinemark Century Boulder",
            "address": "1700 29th Street",
            "address2": "",
            "city": "Boulder",
            "state": "CO",
            "county": "Boulder",
            "postcode": 80301,
            "lat": 40.017399,
            "lng": -105.255699,
            "distance": 0.80320692915301,
            "logo_url": "https://assets.movieglu.com/chain_logos/us/UK-801-sq.jpg"
        },
        {
            "cinema_id": 8058,
            "cinema_name": "AMC Flatiron Crossing 14",
            "address": "61 West Flatiron Crossing Drive",
            "address2": "",
            "city": "Broomfield",
            "state": "CO",
            "county": "Broomfield",
            "postcode": 80021,
            "lat": 39.929699,
            "lng": -105.130898,
            "distance": 9.4557382872468,
            "logo_url": "https://assets.movieglu.com/chain_logos/us/UK-124-sq.jpg"
        },
        {
          "cinema_id": 47632,
          "cinema_name": "Dairy Arts Center",
          "address": "2590 Flatiron Crossing 14",
          "address2": "",
          "city": "Boulder",
          "state": "CO",
          "county": "Boulder",
          "postcode": 80021,
          "lat": 39.929699,
          "lng": -105.130898,
          "distance": 9.4557382872468,
          "logo_url": "https://assets.movieglu.com/chain_logos/us/UK-124-sq.jpg"
      },
      {
        "cinema_id": 86021,
        "cinema_name": "AMC Westminister Promenade 24",
        "address": "10655 Westminster Blvd",
        "address2": "",
        "city": "Westminister",
        "state": "CO",
        "county": "Westminister",
        "postcode": 80020,
        "lat": 39.929699,
        "lng": -105.130898,
        "distance": 9.4557382872468,
        "logo_url": "https://assets.movieglu.com/chain_logos/us/UK-124-sq.jpg"
    }
    ],
    "status": {
        "count": 4,
        "state": "OK",
        "method": "cinemasNearby",
        "message": null,
        "request_method": "GET",
        "version": "UNEM_0v200",
        "territory": "US",
        "device_datetime_sent": "2025-03-24T04:12:40.514Z",
        "device_datetime_used": "2025-03-24 04:12:40"
    }
}


  //inspect cinema and navigate toward it
  const cinemaClicked = (cinema) => {
    if (cinema.cinema_id) {
    setCinemaPicked(cinema.cinema_id);
    navigation.navigate('pickMovie')
    } else {
      console.log("ERROR - UNABLE TO NAVIGATE DUE TO LACK CINEMA_ID")
    }
  }


  //get users current location
  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      //setErrorMsg('Permission to access location was denied');
      console.log("FAIL")
      return;
    }

    let loc = await Location.getCurrentPositionAsync({});
    if (loc.coords) {
      setlocationStore(loc.coords);
    } else {
      console.log('ERROR - unable to find location coordinates with location object, ', loc);
    }
  }

  //API call to collect cinema data
  const fetchCinemaOptions = async() => {
    try {
      if (!getlong || !getlat || hasFetched) {
        return;
      } else if (Object.keys(storedCinema).length != 0) {
        set_base_cinema_data(storedCinema);
      } 
  
      else {
        const header_vals = {
          "client": "UNEM_0",
          "x-api-key": process.env.EXPO_PUBLIC_MOVIE_GLU_TOKEN,
          "authorization": "Basic VU5FTV8wOmhYVURCa0Z3cENNbQ==",
          "territory": "US",
          "api-version": "v201",
          "geolocation": `${getlat}; ${getlong}`, // Replace with actual coordinates
          "device-datetime": new Date().toISOString() // Generates the current time in ISO 8601 format
        };
        setCinemaStores(movie_theater_sample);
        set_base_cinema_data(movie_theater_sample);

        // const response = await fetch('https://api-gate2.movieglu.com/cinemasNearby/n=10', {
        //   method: 'GET',
        //   headers: header_vals
        // });
        // console.log("response found", response);
        // const data = await response.json();
        // setHasFetched(true);
        // set_base_cinema_data(data);
        // console.log("data found", data);
        // setCinemaStores(data);
      }
    } catch (err) {
      console.log("Error found querying cinemas nearbly", err);
    }
  }

  //scrolling animation
  const snapScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX/cardWidth);

    if (Math.abs(offsetX - index*cardWidth) < jumpThreshold*cardWidth ) {
      if (index != currentCard && index<base_cinema_data.cinemas.length) {
        setCurrentCard(index);
        scrollRef.current?.scrollToIndex({index, animated: true});
      }
    }
  };

  //on mount collect user's current location
  useEffect(()=> {
    getCurrentLocation();
  }, []);

  //once location is collected cinema data
  useEffect(() => {
    //fetchAPIData()
    fetchCinemaOptions()
  }, [getlong, getlat])

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "#000000"}}>
      <View>
      { base_cinema_data && base_cinema_data.cinemas &&
      (<Animated.FlatList
        ref={scrollRef}
        style={cinemasStyles.scrollBarContainer}
        data={base_cinema_data.cinemas}
        horizontal={true}
        contentContainerStyle={cinemasStyles.itemStyle}
        onScroll={snapScroll}
        renderItem={({item, index, separators}) => (
          <TouchableHighlight key={index}
            onShowUnderlay={separators.highlight}
            onHideUnderlay={separators.unhighlight}>
              <CinemaCard cinemaClicked={cinemaClicked} cinemaContent={item}></CinemaCard>
          </TouchableHighlight>
      )}>

        </Animated.FlatList>)
      }
      </View>
    </SafeAreaView>
  );
}

const cinemasStyles = StyleSheet.create({
  scrollBarContainer: {
    marginTop: "auto",
    marginBottom: "auto",
    flexGrow: 1,
    height: "100%"
  },

  itemStyle: {
    alignItems: "flex-start",
    marginTop: 30
  }
})