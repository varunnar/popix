import { Image, StyleSheet, Platform } from 'react-native';

import Swiper from 'react-native-deck-swiper';

// import { HelloWave } from '@/components/HelloWave';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {

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
  ]
  

  return (
    <div className="container">
      
    </div>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
