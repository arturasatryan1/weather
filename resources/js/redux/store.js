import {configureStore} from "@reduxjs/toolkit";
import forecastSlice from "./slices/forecastSlice.js";

const store = configureStore({
    reducer: {
        forecast: forecastSlice
    },
});

export default store;
