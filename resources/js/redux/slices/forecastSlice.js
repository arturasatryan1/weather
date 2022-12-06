import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {REQUEST_HANDLER, SERVER_ENDPOINT, OPEN_WEATHER_API, OPEN_WEATHER_APP_ID} from "../../utils";
import {Message} from '../../utils/message';

const initialState = {
    forecastDataFromAPI: null,
    forecastDataFromDB: null,
    errorMessage: null,
};

export const fetchForecastFromAPI = createAsyncThunk(
    "fetchForecastFromAPI",
    async ({city}) => {
        return await REQUEST_HANDLER(
            `${OPEN_WEATHER_API}?q=${city}&units=metric&appid=${OPEN_WEATHER_APP_ID}`,
            "GET"
        );
    }
);

export const fetchForecastFromDB = createAsyncThunk(
    "fetchForecastFromDB",
    async ({city}) => {
        return await REQUEST_HANDLER(
            `${SERVER_ENDPOINT}/get-forecast`,
            "POST",
            {city}
        );
    }
);

export const saveForecast = createAsyncThunk(
    "saveForecast",
    async ({data}) => {
        return await REQUEST_HANDLER(
            `${SERVER_ENDPOINT}/save-forecast`,
            "POST",
            data
        );
    }
);

export const forecastSlice = createSlice({
    name: "forecast",
    initialState,
    reducer: {},
    extraReducers: (builder) => {
        builder.addCase(fetchForecastFromAPI.fulfilled, (state, action) => {
            state.errorMessage = null;
            state.forecastDataFromAPI = {
                city_name: action.payload.city.name,
                list: action.payload.list
            };
        }),
        builder.addCase(fetchForecastFromDB.fulfilled, (state, action) => {
            if (!Object.keys(action.payload).length) {
                state.errorMessage = "No Data Found";
            } else {
                state.errorMessage = null;
                state.forecastDataFromDB = {
                    city_name: action.payload.city_name,
                    info: action.payload
                };
            }
        }),
        builder.addCase(saveForecast.fulfilled, (state, action) => {
            Message('success', action.payload.message);
        })
    },
});

export default forecastSlice.reducer;
