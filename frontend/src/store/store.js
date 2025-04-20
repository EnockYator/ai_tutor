// holds all the applications' state

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index.js";
import courseReducer from "./course-slice/index.js"
import quizReducer from "./quiz-slice/index.js"
import catReducer from "./cat-slice/index.js"

const store = configureStore({
    reducer: {
        auth: authReducer,
        course: courseReducer,
        cat: catReducer,
        quiz: quizReducer

    },
});


export default store;