import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { appId, hostName } from "../../config/config"; // Ensure config is correctly imported

// Get city data
export const getCityData = createAsyncThunk("city", async (obj) => {
  try {
    const request = await axios.get(
      `${hostName}/data/2.5/weather?q=${obj.city}&units=${obj.unit}&APPID=${appId}`
    );
    return {
      data: request.data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error.response.data.message,
    };
  }
});

// Get 5-day forecast
export const get5DaysForecast = createAsyncThunk("5days", async (obj) => {
  const request = await axios.get(
    `${hostName}/data/2.5/forecast?lat=${obj.lat}&lon=${obj.lon}&units=${obj.unit}&APPID=${appId}`
  );
  return request.data;
});

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    citySearchLoading: false,
    citySearchData: null,
    forecastLoading: false,
    forecastData: null,
    forecastError: null,
  },
  extraReducers: (builder) => {
    builder
      // City search
      .addCase(getCityData.pending, (state) => {
        state.citySearchLoading = true;
        state.citySearchData = null;
      })
      .addCase(getCityData.fulfilled, (state, action) => {
        state.citySearchLoading = false;
        state.citySearchData = action.payload;
      })
      .addCase(getCityData.rejected, (state, action) => {
        state.citySearchLoading = false;
        state.citySearchData = null;
        state.citySearchError = action.error.message;
      })
      // Forecast
      .addCase(get5DaysForecast.pending, (state) => {
        state.forecastLoading = true;
        state.forecastData = null;
        state.forecastError = null;
      })
      .addCase(get5DaysForecast.fulfilled, (state, action) => {
        state.forecastLoading = false;
        state.forecastData = action.payload;
        state.forecastError = null;
      })
      .addCase(get5DaysForecast.rejected, (state, action) => {
        state.forecastLoading = false;
        state.forecastData = null;
        state.forecastError = action.error.message;
      });
  },
});

export default weatherSlice.reducer;
