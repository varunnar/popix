/*
Creator: Varun Narayanswamy
Date: 03/26/2025
Overview: Zustand store used to save local variables and share between files
*/
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
    pickedCinema: number;
    setCinemasData: (newData: object) => void;
    setCinemaNumber: (cinemaId: number) => void;
}

export const useCinemaStore = create<cinemasStore>((set) => ({
    cinemasData: {},
    pickedCinema: NaN,
    setCinemasData: (newData) => set({cinemasData: newData}),
    setCinemaNumber: (cinemaId) => set({pickedCinema: cinemaId})
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

