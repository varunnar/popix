import {create} from "zustand";

interface locationStore {
    lat: Number;
    long: Number;
    setLocation: (newLocation: {lat: Number, long: number}) => void
}

export const useLocationStore = create<locationStore>((set) => ({
    lat: 0,
    long: 0,
    
    setLocation: (newLocation) => set({lat: newLocation.latitude, long: newLocation.longitude})
}));


interface cinemasStore {
    cinemasData: object;
    pickedCinema: string;
    setCinemasData: (newData: object) => void;
    setCinemaString: (cinemaId: string) => void;
}

export const useCinemaStore = create<cinemasStore>((set) => ({
    cinemasData: {},
    pickedCinema: "",
    setCinemasData: (newData) => set({cinemasData: newData}),
    setCinemaString: (cinemaId) => set({pickedCinema: cinemaId})
}));

interface movieStore {
    moviesData: Array<object>;
    pickedMovie: number;
    timeData: object;
    setMoviesData: (newMovieData: Array<object>) => void;
    setTimeMovieData: (newTimeData: object) => void;
    setPickedMovieData: (pickedMovieId: number) => void;

    
}

export const useMovieStore = create<movieStore>((set) => ({
    moviesData: [],
    pickedMovie: NaN,
    timeData: {},
    setMoviesData: (newMovieData) => set({moviesData: newMovieData}),
    setPickedMovieData: (pickedMovieId) => set({pickedMovie: pickedMovieId}),
    setTimeMovieData: (newTimeData) => set({timeData: newTimeData})
}));

