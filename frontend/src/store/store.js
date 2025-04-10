// holds all the applications' state

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index.js";
import requestReducer from "./request-slice/index.js";

const store = configureStore({
    reducer: {
        auth: authReducer,
        request: requestReducer,
    },
});


export default store;