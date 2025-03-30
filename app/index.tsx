import { StyleSheet, Animated, TouchableHighlight, TextInput, View, TouchableOpacity, Text, NativeSyntheticEvent, NativeScrollEvent, Dimensions } from "react-native";
import {useState, useEffect, useRef } from 'react';
import CinemaCard from "./components/cinemaCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSharedValue } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { useCinemaStore, useLocationStore } from "./store/index";

import * as Location from 'expo-location';

export default function Index() {

  //ZUSTAND FUNCS
  const setlocationStore = useLocationStore((state => state.setLocation));
  const getlong = useLocationStore((state => state.long));
  const getlat = useLocationStore((state => state.lat))

  const setCinemaStores = useCinemaStore((state => state.setCinemasData));
  const storedCinema = useCinemaStore((state => state.cinemasData));
  const setCinemaPicked = useCinemaStore((state => state.setCinemaString));


  //Card movement animation
  const cardWidth = Dimensions.get('screen').width * 0.9;
  const jumpThreshold = 0.5;
  const [currentCard, setCurrentCard] = useState(0)
  const scrollRef = useRef<Animated.FlatList>(null);

  const [location, setLocation] = useState<Location.LocationObject | null>(null)

  const navigation = useNavigation();

  const newData = [
    {
      "title": "The Cosmic Chase",
      "screen": 1,
      "format": "IMAX 3D",
      "showtimes": ["12:00 PM", "3:30 PM", "7:00 PM", "10:15 PM"],
      "duration": "2h 20m",
      "genre": ["Sci-Fi", "Action"],
      "rating": "PG-13"
    },
    {
      "title": "Love & Lattes",
      "screen": 2,
      "format": "Standard",
      "showtimes": ["11:15 AM", "2:45 PM", "6:30 PM", "9:00 PM"],
      "duration": "1h 50m",
      "genre": ["Romance"],
      "rating": "PG"
    },
    {
      "title": "Nightfall Terror",
      "screen": 3,
      "format": "Standard",
      "showtimes": ["1:00 PM", "4:30 PM", "8:00 PM", "11:15 PM"],
      "duration": "2h 10m",
      "genre": ["Horror"],
      "rating": "R"
    },
    {
      "title": "The Grand Heist",
      "screen": 4,
      "format": "IMAX",
      "showtimes": ["12:45 PM", "4:15 PM", "7:45 PM", "11:00 PM"],
      "duration": "2h 30m",
      "genre": ["Action", "Thriller"],
      "rating": "PG-13"
    }
  ];

  // const [search_value, set_search_value] = useState("");
  const [hasFetched, setHasFetched] = useState(false);

  const [base_cinema_data, set_base_cinema_data] = useState(null);


  //Movie theater times

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
        }
    ],
    "status": {
        "count": 2,
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


  const cinemaClicked = (cinema) => {
    setCinemaPicked(cinema)
    navigation.navigate('pickMovie')
  }


  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      //setErrorMsg('Permission to access location was denied');
      console.log("FAIL")
      return;
    }

    let loc = await Location.getCurrentPositionAsync({});
    setlocationStore(loc.coords);
  }

  //scrollview data

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
        //   mode: 'no-cors',
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

  const snapScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX/cardWidth);

    if (Math.abs(offsetX - index*cardWidth) < jumpThreshold*cardWidth ) {
      if (index != currentCard) {
        setCurrentCard(index);
        scrollRef.current?.scrollToIndex({index, animated: true});
      }
    }
  };

  useEffect(()=> {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    //fetchAPIData()
    fetchCinemaOptions()
  }, [getlong, getlat])
  
  // const [scroll_view_width, set_scroll_view_width] = useState(0);

//  const current_position = useSharedValue(0);

  const setSearch = (searchVal: string) => {
    set_search_value(searchVal);
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "#000000"}}>
      <View>
      { base_cinema_data && 
      (<Animated.FlatList
        ref={scrollRef}
        style={mainStyles.scrollBarContainer}
        data={base_cinema_data.cinemas}
        horizontal={true}
        contentContainerStyle={mainStyles.itemStyle}
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

const mainStyles = StyleSheet.create({
  searchBar: {
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 20,
    backgroundColor: "#CCCCCC",
    width: "95%",
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    paddingTop: 3,
    paddingBottom: 3,
    color: "#000000"
  },

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