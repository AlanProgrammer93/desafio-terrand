import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';

import userReducer from "./userReducer";
import recipeReducer from "./recipeReducer";
import ownRecipeReducer from "./ownRecipeReducer";

const rootReducer = combineReducers({
    user: userReducer,
    recipes: recipeReducer,
    ownRecipes: ownRecipeReducer
});

const store = configureStore({
    reducer: rootReducer,
})

export default store