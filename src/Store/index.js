import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./Slices/WeatherSlice"; 

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});
