import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen name="index" options={{title: "Home"}}/>
    <Stack.Screen name="pickMovie" options={{title: "Pick a Movie"}}/>
    <Stack.Screen name="movieInspect" options={{title: "Details"}}/>
    <Stack.Screen name="movieTimesVisualization" options={{title: "Movie Time Visualization"}}/>
  </Stack>
}
