// holds all the applications' state

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index.js";
import courseReducer from "./course-slice/index.js"

const store = configureStore({
    reducer: {
        auth: authReducer,
        course: courseReducer,
    },
});


export default store;