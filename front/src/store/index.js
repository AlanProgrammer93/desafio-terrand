import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';

import userReducer from "./userReducer";
import recipeReducer from "./recipeReducer";

const rootReducer = combineReducers({
    user: userReducer,
    recipes: recipeReducer,
});

const store = configureStore({
    reducer: rootReducer,
})

export default store